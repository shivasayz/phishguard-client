import axios, { AxiosInstance } from "axios";
import { config } from "../config/env";
import type { ScanResult, HistoryItem } from "../types";

// Types
export interface ScanRequest {
  content_type: "text" | "url" | "image";
  text_content?: string;
  url?: string;
}

export interface FeedbackRequest {
  scan_id: number;
  is_correct: boolean;
  feedback_text?: string;
}

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: config.API_URL,
      timeout: config.API_TIMEOUT,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        // Handle specific error cases here
        if (error.response?.status === 429) {
          throw new Error("Too many requests. Please try again later.");
        }
        throw error;
      }
    );
  }

  async scanContent(data: ScanRequest): Promise<ScanResult> {
    const response = await this.client.post("/scan", data);
    return response.data;
  }

  async scanImage(formData: FormData): Promise<ScanResult> {
    const response = await this.client.post("/scan/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }

  async getHistory(): Promise<HistoryItem[]> {
    const response = await this.client.get("/history");
    return response.data;
  }

  async getLatestScan(): Promise<HistoryItem[]> {
    const response = await this.client.get("/history");
    return response.data;
  }

  async clearHistory(): Promise<void> {
    await this.client.post("/clear-history");
  }

  async submitFeedback(data: FeedbackRequest): Promise<void> {
    await this.client.post("/feedback", data);
  }
}

export const apiClient = new ApiClient();
