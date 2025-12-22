/**
 * Represents the identity data structure used by the Bao Identity system.
 * This data typically contains biometric embeddings or feature vectors
 * extracted from identity verification processes.
 */
export interface BaoIdentityData {
  /**
   * The embedding vector representing the identity.
   * This is typically a high-dimensional feature vector extracted
   * from biometric data (e.g., facial features, iris patterns).
   */
  embedding: number[];

  /**
   * Optional metadata about the identity data
   */
  metadata?: {
    /**
     * Timestamp when the identity data was captured
     */
    timestamp?: string;
    
    /**
     * Quality score of the biometric capture (0-1)
     */
    quality?: number;
    
    /**
     * Type of biometric data (e.g., 'face', 'iris', 'voice')
     */
    type?: string;
  };
}
