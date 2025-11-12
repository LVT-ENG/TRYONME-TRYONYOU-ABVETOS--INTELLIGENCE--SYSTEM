-- Payment Reconciliation Database Schema
-- Cloudflare D1 Database

-- Tabla de pagos AVBET
CREATE TABLE IF NOT EXISTS payments (
  id TEXT PRIMARY KEY,
  amount REAL NOT NULL,
  currency TEXT DEFAULT 'USD',
  timestamp INTEGER NOT NULL,
  status TEXT DEFAULT 'completed',
  customer_id TEXT,
  order_id TEXT,
  reconciled BOOLEAN DEFAULT 0,
  metadata TEXT, -- JSON con información adicional
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de órdenes JIT
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  amount REAL NOT NULL,
  currency TEXT DEFAULT 'USD',
  customer_id TEXT,
  timestamp INTEGER NOT NULL,
  payment_id TEXT,
  status TEXT DEFAULT 'pending',
  metadata TEXT, -- JSON con información adicional
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de matches de reconciliación
CREATE TABLE IF NOT EXISTS reconciliation_matches (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  payment_id TEXT NOT NULL,
  order_id TEXT NOT NULL,
  confidence REAL NOT NULL, -- 0.0 a 1.0
  method TEXT NOT NULL, -- 'exact', 'ai', 'basic', 'manual'
  matched_at INTEGER NOT NULL,
  matched_by TEXT, -- 'system' o user_id
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (payment_id) REFERENCES payments(id),
  FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- Tabla de logs de reconciliación
CREATE TABLE IF NOT EXISTS reconciliation_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  run_date TEXT NOT NULL,
  matched_count INTEGER DEFAULT 0,
  unmatched_count INTEGER DEFAULT 0,
  discrepancies_count INTEGER DEFAULT 0,
  results TEXT, -- JSON con resultados completos
  duration_ms INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de discrepancias
CREATE TABLE IF NOT EXISTS discrepancies (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  payment_id TEXT,
  order_id TEXT,
  discrepancy_type TEXT NOT NULL, -- 'amount_mismatch', 'no_match', 'duplicate'
  description TEXT,
  confidence REAL,
  status TEXT DEFAULT 'pending', -- 'pending', 'resolved', 'ignored'
  resolved_by TEXT,
  resolved_at INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Índices para mejorar performance
CREATE INDEX IF NOT EXISTS idx_payments_reconciled ON payments(reconciled);
CREATE INDEX IF NOT EXISTS idx_payments_timestamp ON payments(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_payments_customer ON payments(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_payment ON orders(payment_id);
CREATE INDEX IF NOT EXISTS idx_orders_timestamp ON orders(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_orders_customer ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_matches_payment ON reconciliation_matches(payment_id);
CREATE INDEX IF NOT EXISTS idx_matches_order ON reconciliation_matches(order_id);
CREATE INDEX IF NOT EXISTS idx_discrepancies_status ON discrepancies(status);

-- Vista para estadísticas de reconciliación
CREATE VIEW IF NOT EXISTS reconciliation_stats AS
SELECT 
  DATE(created_at) as date,
  COUNT(*) as total_runs,
  AVG(matched_count) as avg_matched,
  AVG(unmatched_count) as avg_unmatched,
  AVG(discrepancies_count) as avg_discrepancies,
  AVG(duration_ms) as avg_duration_ms
FROM reconciliation_logs
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Vista para pagos sin reconciliar
CREATE VIEW IF NOT EXISTS unreconciled_payments AS
SELECT 
  p.*,
  CASE 
    WHEN EXISTS (
      SELECT 1 FROM orders o 
      WHERE ABS(o.amount - p.amount) <= p.amount * 0.01
      AND ABS(o.timestamp - p.timestamp) <= 172800000
    ) THEN 'potential_match'
    ELSE 'no_match'
  END as match_status
FROM payments p
WHERE p.reconciled = 0
ORDER BY p.timestamp DESC;

-- Vista para órdenes sin pago
CREATE VIEW IF NOT EXISTS unpaid_orders AS
SELECT 
  o.*,
  CASE 
    WHEN EXISTS (
      SELECT 1 FROM payments p 
      WHERE ABS(p.amount - o.amount) <= o.amount * 0.01
      AND ABS(p.timestamp - o.timestamp) <= 172800000
    ) THEN 'potential_match'
    ELSE 'no_match'
  END as match_status
FROM orders o
WHERE o.payment_id IS NULL
ORDER BY o.timestamp DESC;

