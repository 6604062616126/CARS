import jwt from "jsonwebtoken";
import { mysqlPool } from "@/utils/db";
import { config } from "@/config"; 

const SECRET_KEY = config.JWT_SECRET;

export async function getUserFromToken(token: string) {
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { userId: number };
    if (!decoded.userId) return null;

    const [result] = await mysqlPool.promise().query(
      "SELECT CustomerID, userName, phoneNumber FROM Customer WHERE id = ?", 
      [decoded.userId]
    );

    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("Token error:", error);
    return null;
  }
}
