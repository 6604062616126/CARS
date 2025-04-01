import { NextRequest, NextResponse } from "next/server";
import { mysqlPool } from "@/utils/db";

interface Car {
  carID: number;
  LPlate: string;
  model: string;
  brand: string;
  carType: string;
  rentalPrice: number;
  status: string;
  CarImg: string;
}

export async function POST(req: NextRequest) {
  try {
    const requestBody = await req.json();
    console.log("🟢 API Received Body:", requestBody);

    const { minPrice, maxPrice, carType, pickupLocation, returnLocation, rentalDays } = requestBody;

    const queryParams: (string | number)[] = [];
    let query = "SELECT carID, LPlate, model, brand, carType, rentalPrice, status, CarImg FROM Car WHERE status = 'available'";

    if (typeof minPrice === "number" && typeof maxPrice === "number") {
      query += " AND rentalPrice BETWEEN ? AND ?";
      queryParams.push(minPrice, maxPrice);
    }
    
    if (typeof carType === "string") {
      query += " AND carType = ?";
      queryParams.push(carType);
    }
    

    if (pickupLocation) {
      query += " AND pickupLocation = ?";
      queryParams.push(pickupLocation);
    }

    if (returnLocation) {
      query += " AND returnLocation = ?";
      queryParams.push(returnLocation);
    }

    if (rentalDays && !isNaN(rentalDays)) {
      query += " AND rentalDays >= ?";
      queryParams.push(rentalDays);
    }

    console.log("🟢 Final SQL Query:", query, queryParams);

    const [rows] = await mysqlPool.promise().query(query, queryParams) as [any[], any];

    return NextResponse.json(rows, { status: 200 });

  } catch (error) {
    console.error("❌ API Error:", error);
    return NextResponse.json({ message: "ล้มเหลวในการดึงข้อมูลรถ" }, { status: 500 });
  }
}
