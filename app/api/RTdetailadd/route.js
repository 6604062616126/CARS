import { NextResponse } from "next/server";
import { mysqlPool } from "@/utils/db";

export async function POST(request) {
    try {
        const {
            rentalStatus,
            rentalPrice,
            startDate,
            endDate,
            Location,
            Days,
            CarID,
            staffID
        } = await request.json();

        // Validate required fields
        if (!rentalStatus || !rentalPrice || !startDate || !endDate || !Location || !Days || !CarID || !staffID) {
            return NextResponse.json(
                { error: "กรุณากรอกข้อมูลให้ครบถ้วน" },
                { status: 400 }
            );
        }

        // Calculate days if needed
        const start = new Date(startDate);
        const end = new Date(endDate);
        const calculatedDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

        const connection = await mysqlPool.getConnection();

        try {
            const [result] = await connection.query(
                `INSERT INTO Rental 
        (rentalStatus, rentalPrice, startDate, endDate, Location, Days, CarID, staffID) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [rentalStatus, rentalPrice, startDate, endDate, Location, calculatedDays || Days, CarID, staffID]
            );

            return NextResponse.json({
                message: "เพิ่มข้อมูลการเช่าสำเร็จ",
                rentalID: result.insertId
            }, { status: 201 });

        } finally {
            connection.release();
        }

    } catch (error) {
        console.error("เกิดข้อผิดพลาดในการเพิ่มข้อมูลการเช่า:", error);
        return NextResponse.json(
            { error: "เกิดข้อผิดพลาดในการเพิ่มข้อมูลการเช่า" },
            { status: 500 }
        );
    }
}