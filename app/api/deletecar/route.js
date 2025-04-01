import { NextResponse } from "next/server";
import { mysqlPool } from "@/utils/db";

export async function DELETE(req) {
    try {
        const { LPlate } = await req.json();

        if (!LPlate) {
            return NextResponse.json({ message: "⚠️ กรุณากรอกป้ายทะเบียนรถ" }, { status: 400 });
        }

        const query = "DELETE FROM Car WHERE LPlate = ?";
        const [result] = await mysqlPool.promise().query(query, [LPlate]);

        if (result.affectedRows === 0) {
            return NextResponse.json({ message: "ไม่พบรถที่ต้องการลบ" }, { status: 404 });
        }

        return NextResponse.json({ message: "ลบข้อมูลรถเรียบร้อยแล้ว" }, { status: 200 });
    } catch (err) {
        console.error("🚨 ERROR: ", err.message, err.stack);
        return NextResponse.json({ message: `การเชื่อมต่อเซิร์ฟเวอร์ล้มเหลว: ${err.message}` }, { status: 500 });
    }
}
