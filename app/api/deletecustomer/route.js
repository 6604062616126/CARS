import { NextResponse } from "next/server";
import { mysqlPool } from "@/utils/db";  // เชื่อมต่อฐานข้อมูล MySQL

export async function DELETE(req) {
    try {
        // ดึงข้อมูลจาก body ของคำขอ
        const { customerID } = await req.json(); // เปลี่ยนจาก CustomerID เป็น customerID

        // ตรวจสอบว่ามี customerID หรือไม่
        if (!customerID) {
            return NextResponse.json({ message: "⚠️ กรุณาระบุ customerID" }, { status: 400 });
        }

        // เขียนคำสั่ง SQL เพื่อลบข้อมูลจากฐานข้อมูล
        const query = `DELETE FROM Customer WHERE CustomerID = ?`;

        // ทำการ query และลบข้อมูล
        const [result] = await mysqlPool.promise().query(query, [customerID]);

        // ตรวจสอบว่าไม่มีแถวที่ถูกลบ (หมายความว่าไม่พบ customerID)
        if (result.affectedRows === 0) {
            return NextResponse.json({ message: "ไม่พบผู้ใช้ที่ต้องการลบ" }, { status: 404 });
        }

        // ส่งข้อความเมื่อการลบสำเร็จ
        return NextResponse.json({ message: "ลบผู้ใช้เรียบร้อยแล้ว" }, { status: 200 });

    } catch (err) {
        // การจัดการข้อผิดพลาด
        console.error("🚨 ERROR: ", err.message, err.stack);
        return NextResponse.json({ message: `ล้มเหลว: ${err.message}` }, { status: 500 });
    }
}
