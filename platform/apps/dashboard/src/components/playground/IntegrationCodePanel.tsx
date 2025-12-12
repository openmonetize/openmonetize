"use client";

import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface IntegrationCodePanelProps {
  activeTab: string;
  snippets: Record<string, string>;
}

// Simple syntax highlighting function
function highlightCode(code: string): React.ReactNode[] {
  const lines = code.split("\n");

  return lines.map((line, lineIndex) => {
    // Process each line and wrap in a fragment
    const parts: React.ReactNode[] = [];
    let remaining = line;
    let partIndex = 0;

    // Comment pattern (// ...)
    const commentMatch = remaining.match(/^(.*?)(\/\/.*)$/);
    if (commentMatch) {
      const [, before, comment] = commentMatch;
      remaining = before;
      // Process before part first, then add comment at the end
      if (before.trim()) {
        parts.push(...processCodePart(before, partIndex));
        partIndex++;
      }
      // Add leading whitespace if comment is the whole line
      if (!before.trim() && line.match(/^(\s*)/)) {
        parts.push(
          <span key={`ws-${lineIndex}`}>
            {(line.match(/^(\s*)/) || ["", ""])[1]}
          </span>,
        );
      }
      parts.push(
        <span key={`comment-${lineIndex}`} className="text-slate-500 italic">
          {comment}
        </span>,
      );
      return (
        <div
          key={lineIndex}
          className="flex items-center px-4 py-0.5 hover:bg-slate-800/30 transition-colors"
        >
          <span className="text-slate-600 select-none w-8 text-right mr-4 text-xs">
            {lineIndex + 1}
          </span>
          <span className="flex-1">{parts.length > 0 ? parts : line}</span>
        </div>
      );
    }

    parts.push(...processCodePart(remaining, partIndex));

    return (
      <div
        key={lineIndex}
        className="flex items-center px-4 py-0.5 hover:bg-slate-800/30 transition-colors"
      >
        <span className="text-slate-600 select-none w-8 text-right mr-4 text-xs">
          {lineIndex + 1}
        </span>
        <span className="flex-1">
          {parts.length > 0 ? parts : <span>&nbsp;</span>}
        </span>
      </div>
    );
  });
}

function processCodePart(text: string, startIndex: number): React.ReactNode[] {
  const parts: React.ReactNode[] = [];

  const index = startIndex;

  // Keywords
  const keywords = [
    "import",
    "from",
    "const",
    "async",
    "function",
    "await",
    "return",
    "if",
    "else",
    "new",
  ];

  // Match patterns in order

  // For simplicity, just colorize the whole line based on content detection
  let result = text;

  // Apply basic highlighting with spans
  // Keywords (purple)
  keywords.forEach((keyword) => {
    const regex = new RegExp(`\\b(${keyword})\\b`, "g");
    result = result.replace(regex, `<kw>$1</kw>`);
  });

  // Strings (green)
  result = result.replace(/(["'`])(?:(?!\1)[^\\]|\\.)*\1/g, "<str>$&</str>");

  // Split and reconstruct with React elements
  const tokens = result.split(/(<kw>.*?<\/kw>|<str>.*?<\/str>)/g);

  tokens.forEach((token, i) => {
    if (token.startsWith("<kw>")) {
      parts.push(
        <span key={`kw-${index}-${i}`} className="text-purple-400 font-medium">
          {token.replace(/<\/?kw>/g, "")}
        </span>,
      );
    } else if (token.startsWith("<str>")) {
      parts.push(
        <span key={`str-${index}-${i}`} className="text-green-400">
          {token.replace(/<\/?str>/g, "")}
        </span>,
      );
    } else if (token) {
      parts.push(<span key={`txt-${index}-${i}`}>{token}</span>);
    }
  });

  return parts;
}

export function IntegrationCodePanel({
  activeTab,
  snippets,
}: IntegrationCodePanelProps) {
  const [copied, setCopied] = useState(false);
  const code = activeTab === "llm" ? snippets.llm : snippets.image;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="h-full flex flex-col border-slate-700 shadow-2xl overflow-hidden bg-[#0d1117] text-slate-300 font-mono text-sm relative">
      {/* VS Code-style header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#161b22] border-b border-slate-700">
        <div className="flex items-center gap-3">
          {/* Window controls */}
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>

          {/* File tab */}
          <div className="flex items-center gap-2 px-3 py-1 bg-[#0d1117] rounded-t border-t border-x border-slate-700 -mb-[11px] ml-2">
            <div className="w-4 h-4 flex items-center justify-center">
              <svg
                className="w-3 h-3 text-blue-400"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M3 3h18v18H3V3zm16.525 13.707c-.131-.821-.666-1.511-2.252-2.155-.552-.259-1.165-.438-1.349-.854-.068-.248-.078-.382-.034-.529.113-.484.687-.629 1.137-.495.293.086.567.293.733.633.775-.506.775-.506 1.316-.838-.203-.321-.308-.463-.442-.61-.488-.570-1.136-.868-2.197-.838l-.54.08c-.52.124-.985.368-1.26.67-.896.981-.64 2.706.428 3.419 1.064.749 2.63.923 2.826 1.633.182.826-.627 1.091-1.417.996-.577-.072-.895-.34-1.244-.773l-1.288.739c.148.310.324.463.591.716.989.989 3.461 1.018 3.905-.642.012-.030.152-.461.105-.993zM9 10h2v7H9v-7zm4-2h2v9h-2V8z" />
              </svg>
            </div>
            <span className="text-xs text-slate-300 font-medium">
              integration.ts
            </span>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-7 px-2 text-xs text-slate-400 hover:text-white hover:bg-slate-700 transition-all gap-1.5"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-green-400" />
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              Copy
            </>
          )}
        </Button>
      </div>

      {/* Code content with line numbers */}
      <ScrollArea className="flex-1 bg-[#0d1117]">
        <pre className="py-3 text-[13px] leading-6 font-mono">
          <code>{highlightCode(code)}</code>
        </pre>
      </ScrollArea>

      {/* Bottom bar */}
      <div className="flex items-center justify-between px-4 py-1.5 bg-[#161b22] border-t border-slate-700 text-[10px] text-slate-500">
        <span>TypeScript</span>
        <span>UTF-8</span>
      </div>
    </Card>
  );
}
