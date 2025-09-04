export default function handler(req, res) {
  res.status(200).json({
    ok: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'TRYONME-TRYONYOU-AVBETOS-INTELLIGENCE-SYSTEM',
    version: '1.0.0'
  });
}