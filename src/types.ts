export interface ScanResult {
  risk_level: string;
  confidence_score: number;
  flagged_keywords: string[];
  domains_found: {
    domain: string;
    url: string;
  }[];
  domain?: string;
  url?: string;
  screenshot?: string;
}

export interface HistoryItem {
  id: number;
  content_type: string;
  email_preview: string;
  url?: string;
  risk_level: string;
  confidence_score: number;
  flagged_keywords: string[];
  domains_found: {
    domain: string;
    url: string;
  }[];
  domain?: string;
  url?: string;
  scan_date: string;
  is_feedback_correct?: boolean | null;
  feedback_text?: string | null;
}
