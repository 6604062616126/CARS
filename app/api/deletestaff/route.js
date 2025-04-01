import { NextResponse } from "next/server";
import { mysqlPool } from "@/utils/db";

export async function DELETE(req) {
    try {
        const { staffID } = await req.json();

        if (!staffID) {
            return NextResponse.json({ message: "⚠️ กรุณาระบุ staffID" }, { status: 400 });
        }

        const query = `DELETE FROM Staff WHERE staffID = ?`;

        const [result] = await mysqlPool.promise().query(query, [staffID]);

        if (result.affectedRows === 0) {
            return NextResponse.json({ message: "ไม่พบพนักงานที่ต้องการลบ" }, { status: 404 });
        }

        return NextResponse.json({ message: "ลบพนักงานเรียบร้อยแล้ว" }, { status: 200 });

    } catch (err) {
        console.error("🚨 ERROR: ", err.message, err.stack);
        return NextResponse.json({ message: `ล้มเหลว: ${err.message}` }, { status: 500 });
    }
}
