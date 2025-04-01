import { NextResponse } from "next/server";
import { mysqlPool } from "@/utils/db";

export async function POST(req) {
    try {
        const formData = await req.formData();

        // ดึงข้อมูลจาก FormData
        const LPlate = formData.get("LPlate");
        const model = formData.get("model");
        const brand = formData.get("brand");
        const carType = formData.get("carType");
        const status = formData.get("status");
        const rentalPrice = formData.get("rentalPrice");
        const carImg = formData.get("carImg");

        // ตรวจสอบข้อมูลที่จำเป็น
        if (!LPlate || !model || !brand || !carType || !rentalPrice || !status) {
            return NextResponse.json(
                { message: "⚠️ กรุณากรอกข้อมูลให้ครบถ้วน" },
                { status: 400 }
            );
        }

        // ตรวจสอบและจัดการไฟล์ภาพ
        let carImgName = null;
        if (carImg instanceof File && carImg.size > 0) {
            // สร้างชื่อไฟล์ใหม่
            const timestamp = Date.now();
            const fileExtension = carImg.name.split('.').pop();
            carImgName = `car_${timestamp}.${fileExtension}`;

            // ในที่นี้ควรมีระบบอัปโหลดไฟล์จริง (เช่น ไปยัง S3 หรือ storage อื่น)
            // เราจะเก็บแค่ชื่อไฟล์ในฐานข้อมูล
        }

        // สร้างคำสั่ง SQL
        const query = `
            INSERT INTO Car (
                LPlate, 
                model, 
                brand, 
                carType, 
                rentalPrice, 
                status,
                carImg
            ) VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        // Execute query
        await mysqlPool.promise().query(query, [
            LPlate,
            model,
            brand,
            carType,
            Number(rentalPrice),
            status,
            carImgName
        ]);

        return NextResponse.json(
            {
                success: true,
                message: "เพิ่มข้อมูลรถเรียบร้อยแล้ว",
                data: { LPlate, model, brand }
            },
            { status: 200 }
        );

    } catch (err) {
        console.error("Database Error:", err);

        let errorMessage = "การเพิ่มข้อมูลล้มเหลว";
        if (err.code === 'ER_DUP_ENTRY') {
            errorMessage = "⚠️ มีรถทะเบียนนี้อยู่ในระบบแล้ว";
        }

        return NextResponse.json(
            {
                success: false,
                message: errorMessage,
                error: err.message
            },
            { status: 500 }
        );
    }
}