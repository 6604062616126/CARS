// generateSecret.js
const crypto = require('crypto');

// สร้างคีย์แบบสุ่มที่มีความยาว 32 ไบต์และเข้ารหัสเป็น base64
const secret = crypto.randomBytes(32).toString('base64');
console.log("Generated JWT Secret Key:", secret);
