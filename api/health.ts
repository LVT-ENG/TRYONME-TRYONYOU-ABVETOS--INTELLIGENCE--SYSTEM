import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Health check endpoint for Vercel backend
 * Returns a JSON response confirming the backend is running correctly
 */
export default function handler(req: VercelRequest, res: VercelResponse) {
  res.status(200).json({
    ok: true,
    ts: new Date().toISOString(),
    status: 'healthy',
    service: 'TRYONME-TRYONYOU-ABVETOS-INTELLIGENCE-SYSTEM'
  });
}