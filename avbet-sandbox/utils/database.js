/**
 * Database utilities for AVBET sandbox
 */

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'avbet.db');

// Initialize database
async function initializeDatabase() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DB_PATH, (err) => {
      if (err) {
        console.error('Error opening AVBET database:', err);
        reject(err);
        return;
      }
      
      console.log('📁 Connected to AVBET SQLite database');
      
      // Create users table
      db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY,
          email TEXT UNIQUE NOT NULL,
          username TEXT NOT NULL,
          isVerified BOOLEAN DEFAULT FALSE,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          lastActivity DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `, (err) => {
        if (err) {
          console.error('Error creating users table:', err);
          reject(err);
          return;
        }
        
        // Create authenticators table
        db.run(`
          CREATE TABLE IF NOT EXISTS authenticators (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId TEXT NOT NULL,
            credentialID TEXT UNIQUE NOT NULL,
            credentialPublicKey TEXT NOT NULL,
            counter INTEGER DEFAULT 0,
            transports TEXT,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (userId) REFERENCES users (id)
          )
        `, (err) => {
          if (err) {
            console.error('Error creating authenticators table:', err);
            reject(err);
            return;
          }
          
          // Create payment_attempts table
          db.run(`
            CREATE TABLE IF NOT EXISTS payment_attempts (
              id TEXT PRIMARY KEY,
              userId TEXT NOT NULL,
              amount REAL NOT NULL,
              currency TEXT NOT NULL DEFAULT 'EUR',
              status TEXT NOT NULL DEFAULT 'pending',
              stripePaymentIntentId TEXT,
              stripeStatus TEXT,
              biometricType TEXT,
              description TEXT,
              metadata TEXT,
              createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
              biometricVerifiedAt DATETIME,
              processedAt DATETIME,
              error TEXT,
              FOREIGN KEY (userId) REFERENCES users (id)
            )
          `, (err) => {
            if (err) {
              console.error('Error creating payment_attempts table:', err);
              reject(err);
              return;
            }
            
            // Create challenge_attempts table
            db.run(`
              CREATE TABLE IF NOT EXISTS challenge_attempts (
                id TEXT PRIMARY KEY,
                userId TEXT NOT NULL,
                type TEXT NOT NULL,
                phrase TEXT,
                status TEXT NOT NULL DEFAULT 'pending',
                confidence INTEGER,
                audioMetadata TEXT,
                paymentId TEXT,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                expiresAt DATETIME,
                verifiedAt DATETIME,
                error TEXT,
                FOREIGN KEY (userId) REFERENCES users (id),
                FOREIGN KEY (paymentId) REFERENCES payment_attempts (id)
              )
            `, (err) => {
              if (err) {
                console.error('Error creating challenge_attempts table:', err);
                reject(err);
                return;
              }
              
              // Create biometric_logs table
              db.run(`
                CREATE TABLE IF NOT EXISTS biometric_logs (
                  id INTEGER PRIMARY KEY AUTOINCREMENT,
                  userId TEXT NOT NULL,
                  type TEXT NOT NULL,
                  success BOOLEAN NOT NULL,
                  metadata TEXT,
                  error TEXT,
                  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                  FOREIGN KEY (userId) REFERENCES users (id)
                )
              `, (err) => {
                db.close();
                
                if (err) {
                  console.error('Error creating biometric_logs table:', err);
                  reject(err);
                  return;
                }
                
                console.log('✅ AVBET tables ready');
                resolve();
              });
            });
          });
        });
      });
    });
  });
}

// User operations
async function saveUser(userData) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DB_PATH);
    
    if (userData.id && !userData.email) {
      // Update existing user
      const updateSql = `
        UPDATE users 
        SET username = COALESCE(?, username),
            isVerified = COALESCE(?, isVerified),
            lastActivity = CURRENT_TIMESTAMP
        WHERE id = ?
      `;
      
      db.run(updateSql, [
        userData.username,
        userData.isVerified,
        userData.id
      ], function(err) {
        db.close();
        
        if (err) {
          console.error('Error updating user:', err);
          reject(err);
          return;
        }
        
        resolve(userData.id);
      });
    } else {
      // Insert new user
      const insertSql = `
        INSERT INTO users (id, email, username, isVerified)
        VALUES (?, ?, ?, ?)
      `;
      
      db.run(insertSql, [
        userData.id,
        userData.email,
        userData.username,
        userData.isVerified || false
      ], function(err) {
        db.close();
        
        if (err) {
          console.error('Error inserting user:', err);
          reject(err);
          return;
        }
        
        resolve(userData.id);
      });
    }
  });
}

async function getUserByEmail(email) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DB_PATH);
    
    db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
      db.close();
      
      if (err) {
        console.error('Error getting user by email:', err);
        reject(err);
        return;
      }
      
      resolve(row);
    });
  });
}

// Authenticator operations
async function saveAuthenticator(authData) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DB_PATH);
    
    if (authData.counter !== undefined && !authData.credentialPublicKey) {
      // Update counter only
      const updateSql = `
        UPDATE authenticators 
        SET counter = ?
        WHERE userId = ? AND credentialID = ?
      `;
      
      db.run(updateSql, [
        authData.counter,
        authData.userId,
        authData.credentialID
      ], function(err) {
        db.close();
        
        if (err) {
          console.error('Error updating authenticator counter:', err);
          reject(err);
          return;
        }
        
        resolve(this.changes);
      });
    } else {
      // Insert new authenticator
      const insertSql = `
        INSERT INTO authenticators (
          userId, credentialID, credentialPublicKey, counter, transports
        ) VALUES (?, ?, ?, ?, ?)
      `;
      
      db.run(insertSql, [
        authData.userId,
        authData.credentialID,
        authData.credentialPublicKey,
        authData.counter || 0,
        authData.transports
      ], function(err) {
        db.close();
        
        if (err) {
          console.error('Error inserting authenticator:', err);
          reject(err);
          return;
        }
        
        resolve(this.lastID);
      });
    }
  });
}

async function getAuthenticatorsByUserId(userId) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DB_PATH);
    
    db.all('SELECT * FROM authenticators WHERE userId = ?', [userId], (err, rows) => {
      db.close();
      
      if (err) {
        console.error('Error getting authenticators:', err);
        reject(err);
        return;
      }
      
      resolve(rows || []);
    });
  });
}

// Payment operations
async function savePaymentAttempt(paymentData) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DB_PATH);
    
    if (paymentData.id && paymentData.userId === undefined) {
      // Update existing payment
      const updateSql = `
        UPDATE payment_attempts 
        SET amount = COALESCE(?, amount),
            currency = COALESCE(?, currency),
            status = COALESCE(?, status),
            stripePaymentIntentId = COALESCE(?, stripePaymentIntentId),
            stripeStatus = COALESCE(?, stripeStatus),
            biometricType = COALESCE(?, biometricType),
            description = COALESCE(?, description),
            metadata = COALESCE(?, metadata),
            biometricVerifiedAt = COALESCE(?, biometricVerifiedAt),
            processedAt = COALESCE(?, processedAt),
            error = COALESCE(?, error)
        WHERE id = ?
      `;
      
      db.run(updateSql, [
        paymentData.amount,
        paymentData.currency,
        paymentData.status,
        paymentData.stripePaymentIntentId,
        paymentData.stripeStatus,
        paymentData.biometricType,
        paymentData.description,
        paymentData.metadata,
        paymentData.biometricVerifiedAt,
        paymentData.processedAt,
        paymentData.error,
        paymentData.id
      ], function(err) {
        db.close();
        
        if (err) {
          console.error('Error updating payment:', err);
          reject(err);
          return;
        }
        
        resolve(paymentData.id);
      });
    } else {
      // Insert new payment
      const insertSql = `
        INSERT INTO payment_attempts (
          id, userId, amount, currency, status, stripePaymentIntentId,
          description, metadata
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;
      
      db.run(insertSql, [
        paymentData.id,
        paymentData.userId,
        paymentData.amount,
        paymentData.currency || 'EUR',
        paymentData.status || 'pending',
        paymentData.stripePaymentIntentId,
        paymentData.description,
        paymentData.metadata
      ], function(err) {
        db.close();
        
        if (err) {
          console.error('Error inserting payment:', err);
          reject(err);
          return;
        }
        
        resolve(paymentData.id);
      });
    }
  });
}

async function getPaymentById(id) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DB_PATH);
    
    db.get('SELECT * FROM payment_attempts WHERE id = ?', [id], (err, row) => {
      db.close();
      
      if (err) {
        console.error('Error getting payment:', err);
        reject(err);
        return;
      }
      
      if (row && row.metadata) {
        try {
          row.metadata = JSON.parse(row.metadata);
        } catch (e) {
          console.warn('Error parsing payment metadata JSON:', e);
          row.metadata = {};
        }
      }
      
      resolve(row);
    });
  });
}

async function getPaymentHistory(userId, limit = 10, offset = 0) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DB_PATH);
    
    db.all(
      'SELECT * FROM payment_attempts WHERE userId = ? ORDER BY createdAt DESC LIMIT ? OFFSET ?',
      [userId, limit, offset],
      (err, rows) => {
        db.close();
        
        if (err) {
          console.error('Error getting payment history:', err);
          reject(err);
          return;
        }
        
        // Parse metadata for each payment
        rows.forEach(row => {
          if (row.metadata) {
            try {
              row.metadata = JSON.parse(row.metadata);
            } catch (e) {
              row.metadata = {};
            }
          }
        });
        
        resolve(rows || []);
      }
    );
  });
}

// Challenge operations
async function saveChallengeAttempt(challengeData) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DB_PATH);
    
    if (challengeData.id && challengeData.userId === undefined) {
      // Update existing challenge
      const updateSql = `
        UPDATE challenge_attempts 
        SET status = COALESCE(?, status),
            confidence = COALESCE(?, confidence),
            audioMetadata = COALESCE(?, audioMetadata),
            verifiedAt = COALESCE(?, verifiedAt),
            error = COALESCE(?, error)
        WHERE id = ?
      `;
      
      db.run(updateSql, [
        challengeData.status,
        challengeData.confidence,
        challengeData.audioMetadata,
        challengeData.verifiedAt,
        challengeData.error,
        challengeData.id
      ], function(err) {
        db.close();
        
        if (err) {
          console.error('Error updating challenge:', err);
          reject(err);
          return;
        }
        
        resolve(challengeData.id);
      });
    } else {
      // Insert new challenge
      const insertSql = `
        INSERT INTO challenge_attempts (
          id, userId, type, phrase, status, expiresAt, paymentId
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      
      db.run(insertSql, [
        challengeData.id,
        challengeData.userId,
        challengeData.type,
        challengeData.phrase,
        challengeData.status || 'pending',
        challengeData.expiresAt,
        challengeData.paymentId
      ], function(err) {
        db.close();
        
        if (err) {
          console.error('Error inserting challenge:', err);
          reject(err);
          return;
        }
        
        resolve(challengeData.id);
      });
    }
  });
}

async function getChallengeById(id) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DB_PATH);
    
    db.get('SELECT * FROM challenge_attempts WHERE id = ?', [id], (err, row) => {
      db.close();
      
      if (err) {
        console.error('Error getting challenge:', err);
        reject(err);
        return;
      }
      
      if (row && row.audioMetadata) {
        try {
          row.audioMetadata = JSON.parse(row.audioMetadata);
        } catch (e) {
          console.warn('Error parsing challenge audioMetadata JSON:', e);
          row.audioMetadata = {};
        }
      }
      
      resolve(row);
    });
  });
}

// Biometric logging
async function logBiometricAttempt(logData) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DB_PATH);
    
    const insertSql = `
      INSERT INTO biometric_logs (userId, type, success, metadata, error)
      VALUES (?, ?, ?, ?, ?)
    `;
    
    db.run(insertSql, [
      logData.userId,
      logData.type,
      logData.success,
      logData.metadata ? JSON.stringify(logData.metadata) : null,
      logData.error
    ], function(err) {
      db.close();
      
      if (err) {
        console.error('Error logging biometric attempt:', err);
        reject(err);
        return;
      }
      
      resolve(this.lastID);
    });
  });
}

async function getBiometricLogs(userId, limit = 50) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DB_PATH);
    
    db.all(
      'SELECT * FROM biometric_logs WHERE userId = ? ORDER BY createdAt DESC LIMIT ?',
      [userId, limit],
      (err, rows) => {
        db.close();
        
        if (err) {
          console.error('Error getting biometric logs:', err);
          reject(err);
          return;
        }
        
        // Parse metadata for each log
        rows.forEach(row => {
          if (row.metadata) {
            try {
              row.metadata = JSON.parse(row.metadata);
            } catch (e) {
              row.metadata = {};
            }
          }
        });
        
        resolve(rows || []);
      }
    );
  });
}

// Analytics
async function getAVBETAnalytics() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DB_PATH);
    
    const queries = {
      users: 'SELECT COUNT(*) as total, COUNT(CASE WHEN isVerified = 1 THEN 1 END) as verified FROM users',
      payments: 'SELECT COUNT(*) as total, SUM(amount) as totalAmount, status FROM payment_attempts GROUP BY status',
      challenges: 'SELECT type, COUNT(*) as total, COUNT(CASE WHEN status = "verified" THEN 1 END) as verified FROM challenge_attempts GROUP BY type',
      recentActivity: 'SELECT COUNT(*) as count FROM biometric_logs WHERE datetime(createdAt) >= datetime("now", "-24 hours")'
    };
    
    const results = {};
    
    db.get(queries.users, (err, userStats) => {
      if (err) {
        db.close();
        reject(err);
        return;
      }
      results.users = userStats;
      
      db.all(queries.payments, (err, paymentStats) => {
        if (err) {
          db.close();
          reject(err);
          return;
        }
        results.payments = paymentStats;
        
        db.all(queries.challenges, (err, challengeStats) => {
          if (err) {
            db.close();
            reject(err);
            return;
          }
          results.challenges = challengeStats;
          
          db.get(queries.recentActivity, (err, activityStats) => {
            db.close();
            
            if (err) {
              reject(err);
              return;
            }
            
            results.recentActivity = activityStats;
            resolve(results);
          });
        });
      });
    });
  });
}

module.exports = {
  initializeDatabase,
  saveUser,
  getUserByEmail,
  saveAuthenticator,
  getAuthenticatorsByUserId,
  savePaymentAttempt,
  getPaymentById,
  getPaymentHistory,
  saveChallengeAttempt,
  getChallengeById,
  logBiometricAttempt,
  getBiometricLogs,
  getAVBETAnalytics
};