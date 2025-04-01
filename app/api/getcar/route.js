import { NextResponse } from "next/server";
import { mysqlPool } from "@/utils/db";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);

        const available = searchParams.get("available");
        const minPrice = searchParams.get("minPrice");
        const maxPrice = searchParams.get("maxPrice");
        const searchTerm = searchParams.get("search");
        const sortBy = searchParams.get("sortBy") || "rentalPrice";

        const baseImageUrl = process.env.BASE_IMAGE_URL;

        let query = "SELECT * FROM Car WHERE 1=1";
        const params = [];

        if (available) {
            query += " AND status = ?";
            params.push(available);
        }
        if (minPrice) {
            query += " AND rentalPrice >= ?";
            params.push(parseFloat(minPrice));
        }
        if (maxPrice) {
            query += " AND rentalPrice <= ?";
            params.push(parseFloat(maxPrice));
        }
        if (searchTerm) {
            query += " AND (model LIKE ? OR brand LIKE ?)";
            params.push(`%${searchTerm}%`, `%${searchTerm}%`);
        }

        const validSortColumns = ['rentalPrice', 'brand', 'model', 'carType', 'status'];
        const safeSortBy = validSortColumns.includes(sortBy) ? sortBy : 'rentalPrice';
        query += ` ORDER BY ${mysqlPool.escapeId(safeSortBy)} ASC`;

        const [cars] = await mysqlPool.promise().query(query, params);

        const carsWithImageUrls = cars.map((car) => {
            let carImgUrl = null;
            if (car.carImg) {
                carImgUrl = car.carImg.startsWith('http')
                    ? car.carImg
                    : `${baseImageUrl}/${car.carImg.replace(/^\/+/, '')}`;
            }

            return {
                ...car,
                carImgUrl,
                // เก็บค่าเดิมไว้เพื่อความเข้ากันได้
                carImg: car.carImg
            };
        });

        return NextResponse.json(carsWithImageUrls);
    } catch (err) {
        console.error("🚨 Error fetching cars:", {
            message: err.message,
            stack: err.stack,
            url: request.url
        });

        return NextResponse.json(
            {
                message: "เกิดข้อผิดพลาดในการดึงข้อมูลรถ",
                error: err.message
            },
            { status: 500 }
        );
    }
}