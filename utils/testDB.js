const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',
  user: 'UBLQPcxV79ANfbd.root',
  password: 'HOqNSM2ykoyyLuSF',
  database: 'Clubcar',
  port: 4000,
  ssl: { rejectUnauthorized: true }
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: ", err);
  } else {
    console.log("Connected to MySQL!");
  }
  connection.end();
});
