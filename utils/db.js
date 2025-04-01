const mysql = require('mysql2')
const mysqlPool = mysql.createPool({
    host: 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',
    user: 'UBLQPcxV79ANfbd.root',
    password: 'HOqNSM2ykoyyLuSF',
    database: 'Clubcar',  // ชื่อฐานข้อมูลที่ต้องการเชื่อมต่อ
    port: 4000,
    ssl: { rejectUnauthorized: true }
  });
  
  // ใช้ pool ในการทำงานกับฐานข้อมูล
  mysqlPool.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to the database: ", err);
    } else {
      console.log("Connected to MySQL using pool!");
      // ทำงานกับฐานข้อมูลที่นี่
      connection.release();  // ปล่อย connection เมื่อเสร็จสิ้น
    }
  });
  
  module.exports = { mysqlPool };