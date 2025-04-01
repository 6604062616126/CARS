import { NextRequest, NextResponse } from "next/server";
const jwt = require("jsonwebtoken");
import { mysqlPool } from "@/utils/db";
import { config } from "@/config"; // ดึง secret key
const SECRET_KEY = config.JWT_SECRET;
import { cookies } from "next/headers";

export async function PUT(req: NextRequest) {
  try {
     const token = req.headers.get("authorization")?.split(" ")[1];
     const { userName, phoneNumber , customerID} = await req.json();
     // เช็คว่า Token มีค่าหรือไม่
     if (!token) {
       console.error("🚨 No token provided");
       return NextResponse.json({ error: "กรุณาเข้าสู่ระบบ" }, { status: 401 });
     }
     
     // ถ้าไม่ได้ส่งค่าอะไรมาเลย
     if (!userName && !phoneNumber) {
       return NextResponse.json({ error: "โปรดใส่ username หรือเบอร์โทรศัพท์" }, { status: 400 });
     }
 
    let errors: string[] = [];

    // เช็ค userName ซ้ำ ถ้ามีการส่งมา
    if (userName) {
      const checkUserQuery = `SELECT CustomerID FROM Customer WHERE userName = ? AND CustomerID != ?`;
      const [existingUser]: any = await mysqlPool.promise().query(checkUserQuery, [userName, customerID]);

      if (existingUser.length > 0) {
        errors.push("มีคนใช้ชื่อนี้แล้ว");
      } else {
        // อัปเดต userName
        const updateUserQuery = `UPDATE Customer SET userName = ? WHERE CustomerID = ?`;
        await mysqlPool.promise().query(updateUserQuery, [userName, customerID]);
      }
    }

    // เช็ค phoneNumber ซ้ำ ถ้ามีการส่งมา
    if (phoneNumber) {
      const checkphoneQuery = `SELECT CustomerID FROM Customer WHERE phoneNumber = ? AND CustomerID != ?`;
      const [existingPhone]: any = await mysqlPool.promise().query(checkphoneQuery, [phoneNumber,customerID ]);

      if (existingPhone.length > 0) {
        errors.push("มีเบอร์นี้ในระบบแล้ว");
      } else if (!/^\d+$/.test(phoneNumber)) {
        errors.push("กรุณากรอกตัวเลข");
      } else {
        // อัปเดต phoneNumber
        const updatePhoneQuery = `UPDATE Customer SET phoneNumber = ? WHERE CustomerID = ?`;
        await mysqlPool.promise().query(updatePhoneQuery, [phoneNumber, customerID]);
      }
    }

    // ถ้ามีข้อผิดพลาด ให้ส่งกลับทั้งหมด
    if (errors.length > 0) {
      return NextResponse.json({ error: errors }, { status: 400 });
    }

    return NextResponse.json({ message: "อัพเดทโปรไฟล์สำเร็จ ✅" });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
