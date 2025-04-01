// /api/NTget
import { NextRequest, NextResponse } from "next/server";
import { mysqlPool } from "@/utils/db";
import { getToken } from "@/app/api/getToken/route";  // ใช้เพื่อดึงข้อมูล token

export async function GET(req: NextRequest) {
  try {
    // ดึงข้อมูลจาก token
    const { decoded, error } = getToken(req);  
    if (error) return error;

    const role = decoded?.role;  // รับข้อมูล role (admin หรือ user)
    const customerID = decoded?.CustomerID;  // รับข้อมูล CustomerID จาก token

    // กำหนดเงื่อนไขการกรองข้อมูลตามบทบาท
    let whereClause = "";
    if (role === "admin") {
      // แอดมินสามารถดูข้อมูลทั้งหมด
      whereClause = "";
    } else if (role === "user") {
      // ลูกค้าดูข้อมูลของตัวเอง
      whereClause = `WHERE n.CustomerID = ${customerID}`;
    } else {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // สร้างคำสั่ง SQL สำหรับดึงข้อมูล Notification, Payment, และ Rental
    const selectQuery = `
      SELECT 
        n.notificationID, 
        n.message, 
        n.sendDate, 
        n.recipient, 
        n.CustomerID, 
        p.paymentID, 
        p.amount, 
        p.reciept, 
        r.rentalID, 
        r.rentalStatus, 
        r.rentalPrice, 
        r.startDate, 
        r.endDate, 
        r.Location
      FROM Notifications n
      LEFT JOIN Payment p ON n.paymentID = p.paymentID
      LEFT JOIN Rental r ON r.rentalID = p.rentalID
      ${whereClause}  -- เงื่อนไขกรองตาม role หรือ CustomerID
      ORDER BY n.sendDate DESC  -- เรียงตามวันที่ส่ง Notification
    `;

    // ดึงข้อมูลจากฐานข้อมูล
    const [notifications] = await mysqlPool.promise().query(selectQuery);

    // ส่งผลลัพธ์กลับไปยัง Client
    return NextResponse.json({ success: true, data: notifications }, { status: 200 });

  } catch (error) {
    // ถ้ามีข้อผิดพลาดเกิดขึ้น
    console.error("Error fetching notifications:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
