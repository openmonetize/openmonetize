// Credit System Types

import { TransactionType } from '../generated/prisma';

export interface CreditBalance {
  wallet_id: string;
  customer_id: string;
  user_id?: string;
  team_id?: string;
  balance: number;
  reserved_balance: number;
  available_balance: number;
  expires_at?: Date;
}

export interface CreditTransactionResponse {
  transaction_id: string;
  wallet_id: string;
  customer_id: string;
  transaction_type: TransactionType;
  amount: number;
  balance_before: number;
  balance_after: number;
  description?: string;
  metadata?: Record<string, unknown>;
  created_at: Date;
}

export interface ConsumeCreditsRequest {
  customer_id: string;
  user_id?: string;
  team_id?: string;
  wallet_id: string;
  amount: number;
  description?: string;
  metadata?: Record<string, unknown>;
  idempotency_key?: string;
}

export interface ConsumeCreditsResponse {
  transaction_id: string;
  wallet_id: string;
  balance_before: number;
  balance_after: number;
  amount: number;
  created_at: Date;
}

export interface PurchaseCreditsRequest {
  customer_id: string;
  amount: number;
  payment_method?: string;
  idempotency_key?: string;
}

export interface BurnTableRule {
  [key: string]: {
    input_tokens?: number;
    output_tokens?: number;
    per_unit: number;
    flat_rate?: number;
  };
}

export interface BurnTableConfig {
  id: string;
  customer_id?: string;
  name: string;
  version: number;
  rules: BurnTableRule;
  is_active: boolean;
  valid_from: Date;
  valid_until?: Date;
}
