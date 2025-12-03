// Types for sandbox logs
export type LogEntry = {
  id: string;
  timestamp: string;
  source: 'APP' | 'API' | 'INGESTION' | 'RATING' | 'BILLING';
  message: string;
  details?: any;
};

export type GenerationType = 'text' | 'image';
