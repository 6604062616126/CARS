import { NextRequest, NextResponse } from "next/server";
import { mysqlPool } from "@/utils/db";
import { config } from "@/config";
import bcrypt from "bcryptjs"; 

export async function PUT(req: NextRequest) {
  try {
    console.log("📌 API password hit");
    
    // รับค่า oldPassword, newPassword และ customerID จาก request body
    const { oldPassword, newPassword, customerID } = await req.json();

    // ดึง Token จาก Header
    const token = req.headers.get("Authorization")?.split(" ")[1];

    // เช็คว่า Token มีค่าหรือไม่
    if (!token) {
      console.error("🚨 No token provided");
      return NextResponse.json({ error: "กรุณาเข้าสู่ระบบ" }, { status: 401 });
    }

    if (!oldPassword || !newPassword) {
      return NextResponse.json({ error: "กรุณากรอกข้อมูลเก่าและใหม่" }, { status: 400 });
    }

    // ตรวจสอบรหัสผ่านเดิม
    const getUserQuery = `SELECT password FROM Customer WHERE CustomerID = ?`;
    const [user]: any = await mysqlPool.promise().query(getUserQuery, [customerID]);

    if (user.length === 0) {
      return NextResponse.json({ error: "ไม่พบผู้ใช้" }, { status: 404 });
    }

    // ตรวจสอบว่า oldPassword ตรงกับรหัสผ่านที่เก็บไว้
    const isMatch = await bcrypt.compare(oldPassword, user[0].password);
    if (!isMatch) {
      return NextResponse.json({ error: "รหัสผ่านเก่าไม่ถูกต้อง" }, { status: 400 });
    }

    // เข้ารหัสรหัสผ่านใหม่
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // อัปเดตรหัสผ่านใหม่
    const updatePasswordQuery = `UPDATE Customer SET password = ? WHERE CustomerID = ?`;
    await mysqlPool.promise().query(updatePasswordQuery, [hashedNewPassword, customerID]);

    return NextResponse.json({ message: "เปลี่ยนรหัสผ่านสำเร็จ✅" });

  } catch (error) {
    console.error("🚨 Error in manageUsername:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
