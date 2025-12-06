"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import {
  Loader2,
  Edit2,
  RotateCcw,
  Save,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Info,
} from "lucide-react";
import { useSession } from "next-auth/react";

interface PricingModel {
  provider: string;
  model: string;
  pricing: {
    input_token?: {
      costPerUnit: number;
      unitSize: number;
      currency: string;
    };
    output_token?: {
      costPerUnit: number;
      unitSize: number;
      currency: string;
    };
  };
}

interface BurnTableRule {
  inputTokens: number;
  outputTokens: number;
  perUnit: number;
}

interface BurnTable {
  id: string;
  customerId: string | null;
  name: string;
  rules: Record<string, BurnTableRule>;
  isActive: boolean;
  version: number;
}

interface EditingModel {
  provider: string;
  model: string;
  inputCost: string;
  outputCost: string;
  perUnit: number;
}

export function ModelPricingSettings() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [defaultPricing, setDefaultPricing] = useState<PricingModel[]>([]);
  const [activeBurnTable, setActiveBurnTable] = useState<BurnTable | null>(
    null,
  );
  const [isUsingDefault, setIsUsingDefault] = useState(true);

  const [editingModel, setEditingModel] = useState<EditingModel | null>(null);
  const [customRules, setCustomRules] = useState<Record<string, BurnTableRule>>(
    {},
  );
  const [hasChanges, setHasChanges] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);

  const apiKey = (session?.user as { apiKey?: string })?.apiKey;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  const fetchData = useCallback(async () => {
    if (!apiKey) return;

    setLoading(true);
    setError(null);

    try {
      // Fetch default pricing from provider costs
      const pricingRes = await fetch(`${apiUrl}/v1/rating/pricing`, {
        headers: { Authorization: `Bearer ${apiKey}` },
      });
      if (pricingRes.ok) {
        const pricingData = await pricingRes.json();
        setDefaultPricing(pricingData.data || []);
      }

      // Fetch active burn table for customer
      const burnTableRes = await fetch(`${apiUrl}/v1/burn-tables/active`, {
        headers: { Authorization: `Bearer ${apiKey}` },
      });
      if (burnTableRes.ok) {
        const burnTableData = await burnTableRes.json();
        setActiveBurnTable(burnTableData.data);
        setIsUsingDefault(burnTableData.isDefault);
        if (!burnTableData.isDefault && burnTableData.data?.rules) {
          setCustomRules(burnTableData.data.rules);
        }
      }
    } catch (err) {
      setError("Failed to load pricing data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [apiKey, apiUrl]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getModelCost = (modelKey: string, type: "input" | "output"): number => {
    // Check custom rules first
    if (customRules[modelKey]) {
      return type === "input"
        ? customRules[modelKey].inputTokens
        : customRules[modelKey].outputTokens;
    }

    // Use active burn table rules if available
    if (activeBurnTable?.rules?.[modelKey]) {
      return type === "input"
        ? (activeBurnTable.rules[modelKey] as BurnTableRule).inputTokens
        : (activeBurnTable.rules[modelKey] as BurnTableRule).outputTokens;
    }

    // Fall back to default provider pricing
    const model = defaultPricing.find(
      (p) => `${p.provider}/${p.model}` === modelKey || p.model === modelKey,
    );
    if (model?.pricing) {
      const cost =
        type === "input"
          ? model.pricing.input_token?.costPerUnit
          : model.pricing.output_token?.costPerUnit;
      return cost ?? 0;
    }

    return 0;
  };

  const getPerUnit = (modelKey: string): number => {
    if (customRules[modelKey]) {
      return customRules[modelKey].perUnit;
    }
    if (activeBurnTable?.rules?.[modelKey]) {
      return (activeBurnTable.rules[modelKey] as BurnTableRule).perUnit;
    }
    // Default unit size from provider costs
    const model = defaultPricing.find(
      (p) => `${p.provider}/${p.model}` === modelKey || p.model === modelKey,
    );
    return model?.pricing?.input_token?.unitSize || 1000000;
  };

  const isModelCustomized = (modelKey: string): boolean => {
    return (
      !!customRules[modelKey] ||
      (!isUsingDefault && !!activeBurnTable?.rules?.[modelKey])
    );
  };

  const handleEditModel = (provider: string, model: string) => {
    const modelKey = model;
    setEditingModel({
      provider,
      model,
      inputCost: getModelCost(modelKey, "input").toString(),
      outputCost: getModelCost(modelKey, "output").toString(),
      perUnit: getPerUnit(modelKey),
    });
  };

  const handleSaveModelEdit = () => {
    if (!editingModel) return;

    const modelKey = editingModel.model;
    const inputCost = parseFloat(editingModel.inputCost) || 0;
    const outputCost = parseFloat(editingModel.outputCost) || 0;

    setCustomRules((prev) => ({
      ...prev,
      [modelKey]: {
        inputTokens: inputCost,
        outputTokens: outputCost,
        perUnit: editingModel.perUnit,
      },
    }));

    setHasChanges(true);
    setEditingModel(null);
  };

  const handleSaveChanges = async () => {
    if (!apiKey || Object.keys(customRules).length === 0) return;

    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const burnTablePayload = {
        name: "Custom Pricing",
        rules: customRules,
      };

      if (activeBurnTable && !isUsingDefault) {
        // Update existing custom burn table
        const res = await fetch(
          `${apiUrl}/v1/burn-tables/${activeBurnTable.id}`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(burnTablePayload),
          },
        );

        if (!res.ok) throw new Error("Failed to update pricing");
      } else {
        // Create new custom burn table
        const res = await fetch(`${apiUrl}/v1/burn-tables`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(burnTablePayload),
        });

        if (!res.ok) throw new Error("Failed to create pricing");
      }

      setSuccess("Pricing saved successfully!");
      setHasChanges(false);
      setIsUsingDefault(false);
      await fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save pricing");
    } finally {
      setSaving(false);
    }
  };

  const handleResetToDefaults = async () => {
    if (!apiKey || !activeBurnTable || isUsingDefault) {
      setShowResetDialog(false);
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const res = await fetch(
        `${apiUrl}/v1/burn-tables/${activeBurnTable.id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${apiKey}` },
        },
      );

      if (!res.ok) throw new Error("Failed to reset pricing");

      setCustomRules({});
      setHasChanges(false);
      setSuccess("Pricing reset to defaults!");
      await fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reset pricing");
    } finally {
      setSaving(false);
      setShowResetDialog(false);
    }
  };

  const formatCost = (cost: number, perUnit: number): string => {
    if (perUnit === 1000) {
      return `$${cost.toFixed(4)}/1K`;
    }
    return `$${cost.toFixed(2)}/1M`;
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Status Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Model Pricing Configuration
              </CardTitle>
              <CardDescription className="mt-1">
                Customize how credits are calculated for each AI model.
              </CardDescription>
            </div>
            <Badge
              variant={isUsingDefault && !hasChanges ? "secondary" : "default"}
              className={
                isUsingDefault && !hasChanges
                  ? "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  : "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300"
              }
            >
              {isUsingDefault && !hasChanges
                ? "Using Default Pricing"
                : "Custom Pricing"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Info banner */}
          <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
            <div className="text-sm text-blue-700 dark:text-blue-300">
              <p className="font-medium">How pricing works</p>
              <p className="mt-1 text-blue-600 dark:text-blue-400">
                Credits are calculated based on token usage. Input and output
                tokens have separate costs. You can customize these rates per
                model, or use the platform defaults.
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            {hasChanges && (
              <Button onClick={handleSaveChanges} disabled={saving}>
                {saving ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Save Changes
              </Button>
            )}
            {(!isUsingDefault || hasChanges) && (
              <Button
                variant="outline"
                onClick={() => setShowResetDialog(true)}
                disabled={saving}
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset to Defaults
              </Button>
            )}
          </div>

          {/* Feedback messages */}
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-800">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <span className="text-sm text-red-700 dark:text-red-300">
                {error}
              </span>
            </div>
          )}
          {success && (
            <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-700 dark:text-green-300">
                {success}
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pricing Table */}
      <Card>
        <CardHeader>
          <CardTitle>Available Models</CardTitle>
          <CardDescription>
            Click Edit to customize pricing for any model.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Provider</TableHead>
                <TableHead>Model</TableHead>
                <TableHead className="text-right">Input Cost</TableHead>
                <TableHead className="text-right">Output Cost</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {defaultPricing.map((pricing) => {
                const modelKey = pricing.model;
                const isCustom = isModelCustomized(modelKey);
                const perUnit = getPerUnit(modelKey);

                return (
                  <TableRow key={`${pricing.provider}-${pricing.model}`}>
                    <TableCell>
                      <Badge variant="outline" className="font-mono">
                        {pricing.provider}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {pricing.model}
                      {isCustom && (
                        <Badge
                          variant="secondary"
                          className="ml-2 text-xs bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300"
                        >
                          Custom
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {formatCost(getModelCost(modelKey, "input"), perUnit)}
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {formatCost(getModelCost(modelKey, "output"), perUnit)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          handleEditModel(pricing.provider, pricing.model)
                        }
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              {defaultPricing.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-8 text-slate-500"
                  >
                    No pricing data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={!!editingModel} onOpenChange={() => setEditingModel(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Model Pricing</DialogTitle>
            <DialogDescription>
              {editingModel && (
                <>
                  Configure custom pricing for{" "}
                  <span className="font-mono font-medium">
                    {editingModel.provider}/{editingModel.model}
                  </span>
                </>
              )}
            </DialogDescription>
          </DialogHeader>

          {editingModel && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="inputCost">
                  Input Token Cost (per{" "}
                  {editingModel.perUnit === 1000 ? "1K" : "1M"} tokens)
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                    $
                  </span>
                  <Input
                    id="inputCost"
                    type="number"
                    step="0.0001"
                    min="0"
                    className="pl-7"
                    value={editingModel.inputCost}
                    onChange={(e) =>
                      setEditingModel({
                        ...editingModel,
                        inputCost: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="outputCost">
                  Output Token Cost (per{" "}
                  {editingModel.perUnit === 1000 ? "1K" : "1M"} tokens)
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                    $
                  </span>
                  <Input
                    id="outputCost"
                    type="number"
                    step="0.0001"
                    min="0"
                    className="pl-7"
                    value={editingModel.outputCost}
                    onChange={(e) =>
                      setEditingModel({
                        ...editingModel,
                        outputCost: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Example: Processing 1,000 input tokens and 500 output tokens
                  would cost{" "}
                  <span className="font-mono font-medium text-slate-700 dark:text-slate-300">
                    $
                    {(
                      (parseFloat(editingModel.inputCost) || 0) *
                        (1000 / editingModel.perUnit) +
                      (parseFloat(editingModel.outputCost) || 0) *
                        (500 / editingModel.perUnit)
                    ).toFixed(6)}
                  </span>
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingModel(null)}>
              Cancel
            </Button>
            <Button onClick={handleSaveModelEdit}>Apply</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reset Confirmation Dialog */}
      <AlertDialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset to Default Pricing?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove all your custom pricing rules and revert to the
              platform defaults. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleResetToDefaults}>
              Reset to Defaults
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
