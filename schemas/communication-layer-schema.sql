-- Communication Layer Database Schema
-- Cloudflare D1 Database

-- Tabla principal de mensajes
CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY,
  source TEXT NOT NULL, -- 'email', 'telegram', 'form', 'webhook'
  sender TEXT NOT NULL,
  subject TEXT,
  body TEXT NOT NULL,
  category TEXT NOT NULL,
  confidence REAL DEFAULT 0,
  folder TEXT NOT NULL,
  auto_responded BOOLEAN DEFAULT 0,
  timestamp INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de clasificaciones detalladas
CREATE TABLE IF NOT EXISTS message_classifications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  message_id TEXT NOT NULL,
  classification_data TEXT NOT NULL, -- JSON con clasificación completa
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (message_id) REFERENCES messages(id)
);

-- Tabla de respuestas automáticas enviadas
CREATE TABLE IF NOT EXISTS auto_responses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  message_id TEXT NOT NULL,
  response_text TEXT NOT NULL,
  sent_at INTEGER NOT NULL,
  status TEXT DEFAULT 'sent', -- 'sent', 'failed', 'pending'
  error TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (message_id) REFERENCES messages(id)
);

-- Tabla de hilos de conversación
CREATE TABLE IF NOT EXISTS conversation_threads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  thread_id TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  sender TEXT NOT NULL,
  subject TEXT,
  first_message_id TEXT NOT NULL,
  last_message_id TEXT NOT NULL,
  message_count INTEGER DEFAULT 1,
  status TEXT DEFAULT 'open', -- 'open', 'closed', 'archived'
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de notificaciones enviadas
CREATE TABLE IF NOT EXISTS notifications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  message_id TEXT NOT NULL,
  notification_type TEXT NOT NULL, -- 'telegram', 'email', 'webhook'
  recipient TEXT NOT NULL,
  status TEXT DEFAULT 'sent',
  error TEXT,
  sent_at INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (message_id) REFERENCES messages(id)
);

-- Tabla de plantillas de respuesta
CREATE TABLE IF NOT EXISTS response_templates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category TEXT UNIQUE NOT NULL,
  template_text TEXT NOT NULL,
  variables TEXT, -- JSON con variables disponibles
  active BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Índices para mejorar performance
CREATE INDEX IF NOT EXISTS idx_messages_category ON messages(category);
CREATE INDEX IF NOT EXISTS idx_messages_timestamp ON messages(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender);
CREATE INDEX IF NOT EXISTS idx_messages_folder ON messages(folder);
CREATE INDEX IF NOT EXISTS idx_classifications_message ON message_classifications(message_id);
CREATE INDEX IF NOT EXISTS idx_responses_message ON auto_responses(message_id);
CREATE INDEX IF NOT EXISTS idx_threads_category ON conversation_threads(category);
CREATE INDEX IF NOT EXISTS idx_threads_status ON conversation_threads(status);
CREATE INDEX IF NOT EXISTS idx_notifications_message ON notifications(message_id);

-- Insertar plantillas por defecto
INSERT OR IGNORE INTO response_templates (category, template_text, variables) VALUES
  ('colaboración', 
   'Hola,\n\nGracias por tu interés en colaborar con TRYONYOU. Hemos recibido tu mensaje y lo revisaremos con atención.\n\nNuestro equipo de partnerships se pondrá en contacto contigo en los próximos días.\n\nSaludos,\nEquipo TRYONYOU',
   '["sender_name", "company_name"]'),
  ('prensa',
   'Hola,\n\nGracias por tu interés en TRYONYOU. Hemos recibido tu consulta de prensa.\n\nNuestro equipo de comunicación revisará tu solicitud y se pondrá en contacto contigo a la brevedad.\n\nSaludos,\nEquipo TRYONYOU',
   '["sender_name", "media_name"]'),
  ('licencia',
   'Hola,\n\nGracias por tu consulta sobre licencias y términos de uso de TRYONYOU.\n\nHemos recibido tu mensaje y nuestro equipo legal revisará tu solicitud. Te responderemos con la información solicitada en breve.\n\nSaludos,\nEquipo TRYONYOU',
   '["sender_name"]'),
  ('soporte',
   'Hola,\n\nGracias por contactar al soporte de TRYONYOU.\n\nHemos recibido tu consulta y nuestro equipo técnico la está revisando. Te responderemos lo antes posible con una solución.\n\nSaludos,\nEquipo TRYONYOU',
   '["sender_name", "issue_type"]');

-- Vista para estadísticas por categoría
CREATE VIEW IF NOT EXISTS category_stats AS
SELECT 
  category,
  COUNT(*) as total_messages,
  SUM(CASE WHEN auto_responded = 1 THEN 1 ELSE 0 END) as auto_responded,
  AVG(confidence) as avg_confidence,
  DATE(created_at) as date
FROM messages
GROUP BY category, DATE(created_at)
ORDER BY date DESC, total_messages DESC;

-- Vista para mensajes urgentes pendientes
CREATE VIEW IF NOT EXISTS urgent_messages AS
SELECT 
  m.*,
  mc.classification_data
FROM messages m
LEFT JOIN message_classifications mc ON m.id = mc.message_id
WHERE m.category = 'urgente'
AND m.id NOT IN (
  SELECT message_id FROM notifications WHERE status = 'sent'
)
ORDER BY m.timestamp DESC;

-- Vista para tasa de respuesta automática
CREATE VIEW IF NOT EXISTS auto_response_rate AS
SELECT 
  DATE(created_at) as date,
  category,
  COUNT(*) as total,
  SUM(CASE WHEN auto_responded = 1 THEN 1 ELSE 0 END) as auto_responded,
  ROUND(CAST(SUM(CASE WHEN auto_responded = 1 THEN 1 ELSE 0 END) AS FLOAT) / COUNT(*) * 100, 2) as response_rate
FROM messages
GROUP BY DATE(created_at), category
ORDER BY date DESC;

-- Vista para mensajes por carpeta
CREATE VIEW IF NOT EXISTS messages_by_folder AS
SELECT 
  folder,
  COUNT(*) as message_count,
  MAX(timestamp) as last_message_timestamp
FROM messages
GROUP BY folder
ORDER BY message_count DESC;

