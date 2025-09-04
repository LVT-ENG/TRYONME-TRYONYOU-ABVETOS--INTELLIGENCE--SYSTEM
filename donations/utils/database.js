/**
 * Database utilities for donations
 */

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'donations.db');

// Initialize database
async function initializeDatabase() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DB_PATH, (err) => {
      if (err) {
        console.error('Error opening database:', err);
        reject(err);
        return;
      }
      
      console.log('📁 Connected to SQLite database');
      
      // Create donations table
      db.run(`
        CREATE TABLE IF NOT EXISTS donations (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          amount REAL NOT NULL,
          currency TEXT NOT NULL DEFAULT 'EUR',
          status TEXT NOT NULL DEFAULT 'pending',
          paymentMethod TEXT NOT NULL,
          paymentId TEXT,
          paypalTransactionId TEXT,
          stripePaymentIntentId TEXT,
          donorInfo TEXT,
          clothingItems TEXT,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `, (err) => {
        if (err) {
          console.error('Error creating donations table:', err);
          reject(err);
          return;
        }
        
        console.log('✅ Donations table ready');
        db.close();
        resolve();
      });
    });
  });
}

// Save donation
async function saveDonation(donationData) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DB_PATH);
    
    if (donationData.id) {
      // Update existing donation
      const updateSql = `
        UPDATE donations 
        SET amount = COALESCE(?, amount),
            currency = COALESCE(?, currency),
            status = COALESCE(?, status),
            paymentMethod = COALESCE(?, paymentMethod),
            paymentId = COALESCE(?, paymentId),
            paypalTransactionId = COALESCE(?, paypalTransactionId),
            stripePaymentIntentId = COALESCE(?, stripePaymentIntentId),
            donorInfo = COALESCE(?, donorInfo),
            clothingItems = COALESCE(?, clothingItems),
            updatedAt = CURRENT_TIMESTAMP
        WHERE id = ?
      `;
      
      db.run(updateSql, [
        donationData.amount,
        donationData.currency,
        donationData.status,
        donationData.paymentMethod,
        donationData.paymentId,
        donationData.paypalTransactionId,
        donationData.stripePaymentIntentId,
        donationData.donorInfo ? JSON.stringify(donationData.donorInfo) : null,
        donationData.clothingItems ? JSON.stringify(donationData.clothingItems) : null,
        donationData.id
      ], function(err) {
        db.close();
        
        if (err) {
          console.error('Error updating donation:', err);
          reject(err);
          return;
        }
        
        resolve(donationData.id);
      });
    } else {
      // Insert new donation
      const insertSql = `
        INSERT INTO donations (
          amount, currency, status, paymentMethod, paymentId,
          donorInfo, clothingItems
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      
      db.run(insertSql, [
        donationData.amount,
        donationData.currency || 'EUR',
        donationData.status || 'pending',
        donationData.paymentMethod,
        donationData.paymentId,
        donationData.donorInfo ? JSON.stringify(donationData.donorInfo) : null,
        donationData.clothingItems ? JSON.stringify(donationData.clothingItems) : null
      ], function(err) {
        db.close();
        
        if (err) {
          console.error('Error inserting donation:', err);
          reject(err);
          return;
        }
        
        resolve(this.lastID);
      });
    }
  });
}

// Get donation by ID
async function getDonationById(id) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DB_PATH);
    
    db.get('SELECT * FROM donations WHERE id = ? OR paymentId = ?', [id, id], (err, row) => {
      db.close();
      
      if (err) {
        console.error('Error getting donation:', err);
        reject(err);
        return;
      }
      
      if (row) {
        // Parse JSON fields
        if (row.donorInfo) {
          try {
            row.donorInfo = JSON.parse(row.donorInfo);
          } catch (e) {
            console.warn('Error parsing donorInfo JSON:', e);
            row.donorInfo = null;
          }
        }
        
        if (row.clothingItems) {
          try {
            row.clothingItems = JSON.parse(row.clothingItems);
          } catch (e) {
            console.warn('Error parsing clothingItems JSON:', e);
            row.clothingItems = [];
          }
        }
      }
      
      resolve(row);
    });
  });
}

// Get donations statistics
async function getDonationStats() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DB_PATH);
    
    const queries = {
      total: 'SELECT COUNT(*) as count, SUM(amount) as total FROM donations WHERE status = "completed"',
      thisMonth: `SELECT COUNT(*) as count, SUM(amount) as total FROM donations 
                  WHERE status = "completed" AND 
                  datetime(createdAt) >= datetime('now', 'start of month')`,
      thisYear: `SELECT COUNT(*) as count, SUM(amount) as total FROM donations 
                 WHERE status = "completed" AND 
                 datetime(createdAt) >= datetime('now', 'start of year')`,
      byMethod: `SELECT paymentMethod, COUNT(*) as count, SUM(amount) as total 
                 FROM donations WHERE status = "completed" 
                 GROUP BY paymentMethod`
    };
    
    const results = {};
    
    // Execute queries
    db.get(queries.total, (err, row) => {
      if (err) {
        db.close();
        reject(err);
        return;
      }
      results.total = row;
      
      db.get(queries.thisMonth, (err, row) => {
        if (err) {
          db.close();
          reject(err);
          return;
        }
        results.thisMonth = row;
        
        db.get(queries.thisYear, (err, row) => {
          if (err) {
            db.close();
            reject(err);
            return;
          }
          results.thisYear = row;
          
          db.all(queries.byMethod, (err, rows) => {
            db.close();
            
            if (err) {
              reject(err);
              return;
            }
            
            results.byMethod = rows;
            resolve(results);
          });
        });
      });
    });
  });
}

// Get recent donations
async function getRecentDonations(limit = 10) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DB_PATH);
    
    db.all(
      'SELECT * FROM donations ORDER BY createdAt DESC LIMIT ?',
      [limit],
      (err, rows) => {
        db.close();
        
        if (err) {
          console.error('Error getting recent donations:', err);
          reject(err);
          return;
        }
        
        // Parse JSON fields for each row
        rows.forEach(row => {
          if (row.donorInfo) {
            try {
              row.donorInfo = JSON.parse(row.donorInfo);
            } catch (e) {
              row.donorInfo = null;
            }
          }
          
          if (row.clothingItems) {
            try {
              row.clothingItems = JSON.parse(row.clothingItems);
            } catch (e) {
              row.clothingItems = [];
            }
          }
        });
        
        resolve(rows);
      }
    );
  });
}

// Search donations
async function searchDonations(criteria = {}) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DB_PATH);
    
    let sql = 'SELECT * FROM donations WHERE 1=1';
    const params = [];
    
    if (criteria.status) {
      sql += ' AND status = ?';
      params.push(criteria.status);
    }
    
    if (criteria.paymentMethod) {
      sql += ' AND paymentMethod = ?';
      params.push(criteria.paymentMethod);
    }
    
    if (criteria.minAmount) {
      sql += ' AND amount >= ?';
      params.push(criteria.minAmount);
    }
    
    if (criteria.maxAmount) {
      sql += ' AND amount <= ?';
      params.push(criteria.maxAmount);
    }
    
    if (criteria.dateFrom) {
      sql += ' AND datetime(createdAt) >= datetime(?)';
      params.push(criteria.dateFrom);
    }
    
    if (criteria.dateTo) {
      sql += ' AND datetime(createdAt) <= datetime(?)';
      params.push(criteria.dateTo);
    }
    
    sql += ' ORDER BY createdAt DESC';
    
    if (criteria.limit) {
      sql += ' LIMIT ?';
      params.push(criteria.limit);
    }
    
    db.all(sql, params, (err, rows) => {
      db.close();
      
      if (err) {
        console.error('Error searching donations:', err);
        reject(err);
        return;
      }
      
      // Parse JSON fields
      rows.forEach(row => {
        if (row.donorInfo) {
          try {
            row.donorInfo = JSON.parse(row.donorInfo);
          } catch (e) {
            row.donorInfo = null;
          }
        }
        
        if (row.clothingItems) {
          try {
            row.clothingItems = JSON.parse(row.clothingItems);
          } catch (e) {
            row.clothingItems = [];
          }
        }
      });
      
      resolve(rows);
    });
  });
}

module.exports = {
  initializeDatabase,
  saveDonation,
  getDonationById,
  getDonationStats,
  getRecentDonations,
  searchDonations
};