// /api/login.js
import { NextRequest, NextResponse } from "next/server";
import { mysqlPool } from "@/utils/db";
import bcrypt from "bcryptjs";  // ใช้ bcryptjs แทน bcrypt
import jwt from 'jsonwebtoken'; // ✅ ใช้ import แทน require
import { config } from "@/config"; // ดึง secretkey

const secret = config.JWT_SECRET; // ตั้งค่า secret key สำหรับ JWT

export async function POST(req) {
  console.log("📌 API login hit");
  try {
    const body = await req.json();  // อ่าน JSON request body
    const { phone, password } = body;

    // ตรวจสอบข้อมูลที่กรอก
    if (!phone || !password) {
      return NextResponse.json({ message: "⚠️ กรุณากรอกข้อมูลให้ครบถ้วน" }, { status: 400 });
    }

    // คำสั่ง SQL เพื่อดึงข้อมูลผู้ใช้ตามเบอร์โทร
    const query = `SELECT * FROM Customer WHERE phoneNumber = ?`;
    const [rows] = await mysqlPool.promise().query(query, [phone]);

    // ตรวจสอบว่าพบผู้ใช้ในฐานข้อมูลหรือไม่
    if (rows.length === 0) {
      return NextResponse.json({ message: "❌ เบอร์โทรนี้ไม่มีในระบบ" }, { status: 404 });
    }

    const user = rows[0]; // ข้อมูลผู้ใช้ที่พบ

    // ตรวจสอบรหัสผ่าน
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: "❌ รหัสผ่านไม่ถูกต้อง" }, { status: 401 });
    }


    
    const ADMIN_PHONE =  "0888888888"; 
    const STAFF_PHONE =  "0877777777"; 
    const isAdmin = user.phoneNumber === ADMIN_PHONE;
    const isStaff = user.phoneNumber === STAFF_PHONE;
    console.log("CID=",user.CustomerID);
    // สร้าง JWT Token
    const token = jwt.sign(
      {
        id: user.CustomerID,
        phone: user.phoneNumber,
        role: isAdmin ? "admin" : isStaff ? "staff" : "user"
      },
      secret,
      { expiresIn: "1h" }  
    );
    // ส่งการตอบกลับเมื่อเข้าสู่ระบบสำเร็จ พร้อม JWT Token
    return NextResponse.json({
      message: isAdmin 
        ? "✅ เข้าสู่ระบบสำเร็จ (admin)" 
        : isStaff 
          ? "✅ เข้าสู่ระบบสำเร็จ (staff)" 
          : "✅ เข้าสู่ระบบสำเร็จ",
      token, id: user.CustomerID, name:user.userName ,
      role: isAdmin ? "admin" : isStaff ? "staff" : "user" // ✅ กำหนด role ให้ staff ด้วย
    }, { status: 200 });


  } catch (err) {
    console.error("🚨 Error during login:", err);
    return NextResponse.json({ message: "❌ ล้มเหลวในการเข้าสู่ระบบ" }, { status: 500 });
  }
}
