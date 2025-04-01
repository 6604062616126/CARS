// /api/NTadd
import { NextRequest, NextResponse } from "next/server";
import { mysqlPool } from "@/utils/db";
import { getToken } from "@/app/api/getToken/route";

export async function POST(req: NextRequest) {
  try {
    // ดึง CustomerID จาก Token
    const { decoded, error } = getToken(req);
    if (error) return error;

    const customerID = decoded?.CustomerID;
    if (!customerID) return NextResponse.json({ error: "Invalid token" }, { status: 403 });

    // ดึงข้อมูลจาก request body
    const { message, recipient } = await req.json();

    if (!message || !recipient) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // วันที่ปัจจุบัน
    const sendDate = new Date().toISOString().slice(0, 19).replace("T", " ");

    // สร้าง Query สำหรับเพิ่ม Notification
    const insertQuery = `
      INSERT INTO Notifications (sendDate, message, recipient, CustomerID) 
      VALUES (?, ?, ?, ?)
    `;

    // Execute Query
    await mysqlPool.query(insertQuery, [sendDate, message, recipient, customerID]);

    return NextResponse.json({ success: true, message: "Notification added successfully" }, { status: 201 });

  } catch (error) {
    console.error("Error adding notification:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
