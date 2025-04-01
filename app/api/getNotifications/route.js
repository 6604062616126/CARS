import { mysqlPool } from "@/utils/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const query = "SELECT * FROM Notifications";
    const [rows] = await mysqlPool.promise().query(query);

    return res.status(200).json(rows);

  } catch (err) {
    console.error("🚨 ERROR:", err.message, err.stack);
    return res.status(500).json({ message: `ล้มเหลว: ${err.message}` });
  }
}
