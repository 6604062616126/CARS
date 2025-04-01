import { NextResponse } from "next/server";
import { mysqlPool } from "@/utils/db";  // เชื่อมต่อฐานข้อมูล MySQL

export async function GET() {
    try {
        const query = `SELECT staffID, firstName, lastName, phoneNumber FROM Staff`;
        const [rows] = await mysqlPool.promise().query(query);

        console.log("📢 Data from DB: ", rows); // Debug

        return NextResponse.json(rows, { status: 200 });

    } catch (err) {
        console.error("🚨 ERROR: ", err.message, err.stack);
        return NextResponse.json({ message: `❌ ล้มเหลว: ${err.message}` }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const { firstName, lastName, phoneNumber } = await req.json();
        const query = `INSERT INTO Staff (firstName, lastName, phoneNumber) VALUES (?, ?, ?)`;
        const [result] = await mysqlPool.promise().query(query, [firstName, lastName, phoneNumber]);

        return NextResponse.json({ message: "✅ เพิ่มพนักงานสำเร็จ", staffID: result.insertId }, { status: 201 });

    } catch (err) {
        console.error("🚨 ERROR: ", err.message, err.stack);
        return NextResponse.json({ message: `❌ ล้มเหลว: ${err.message}` }, { status: 500 });
    }
}