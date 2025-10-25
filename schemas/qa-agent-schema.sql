-- Smart QA Agent Database Schema
-- Cloudflare D1 Database

-- Tabla principal de resultados de QA
CREATE TABLE IF NOT EXISTS qa_results (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  deploy_id TEXT NOT NULL,
  target_url TEXT NOT NULL,
  status TEXT NOT NULL, -- 'success', 'failed', 'error'
  results TEXT NOT NULL, -- JSON con resultados completos
  timestamp INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Índices para mejorar performance
CREATE INDEX IF NOT EXISTS idx_deploy_id ON qa_results(deploy_id);
CREATE INDEX IF NOT EXISTS idx_timestamp ON qa_results(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_status ON qa_results(status);

-- Tabla de configuración de tests
CREATE TABLE IF NOT EXISTS qa_test_config (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  test_name TEXT NOT NULL UNIQUE,
  enabled BOOLEAN DEFAULT 1,
  config TEXT, -- JSON con configuración específica del test
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insertar configuración por defecto
INSERT OR IGNORE INTO qa_test_config (test_name, enabled, config) VALUES
  ('http_routes', 1, '{"routes": ["/", "/about", "/api/health"]}'),
  ('assets', 1, '{"max_assets_to_check": 10}'),
  ('broken_links', 1, '{"max_links_to_check": 5}'),
  ('performance', 1, '{"max_response_time": 3000}'),
  ('metadata', 1, '{"required_fields": ["title", "description"]}');

-- Tabla de historial de notificaciones
CREATE TABLE IF NOT EXISTS qa_notifications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  deploy_id TEXT NOT NULL,
  notification_type TEXT NOT NULL, -- 'telegram', 'email', 'webhook'
  status TEXT NOT NULL, -- 'sent', 'failed'
  error TEXT,
  sent_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Vista para estadísticas rápidas
CREATE VIEW IF NOT EXISTS qa_stats AS
SELECT 
  DATE(created_at) as date,
  COUNT(*) as total_runs,
  SUM(CASE WHEN status = 'success' THEN 1 ELSE 0 END) as successful,
  SUM(CASE WHEN status = 'failed' THEN 1 ELSE 0 END) as failed,
  SUM(CASE WHEN status = 'error' THEN 1 ELSE 0 END) as errors
FROM qa_results
GROUP BY DATE(created_at)
ORDER BY date DESC;

