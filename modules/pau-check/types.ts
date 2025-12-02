export interface PauCheckInput {
  avatarImage: Buffer | string;
  baoIdentityData: BaoIdentityData;
  styleData?: Record<string, any>;
  meta?: Record<string, any>;
}

export interface PauCheckResult {
  decision: "approved" | "rejected";
  notes: string;
  signature: string;
  diagnostics: any;
}

export interface BaoIdentityData {
  embedding: number[];
  userId: string;
}
