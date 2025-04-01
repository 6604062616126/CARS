import { mysqlPool } from "@/utils/db";
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const query = "SELECT * FROM Car WHERE status = 'พร้อมให้เช่า'";
    const [rows] = await mysqlPool.promise().query(query);

    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error("Error fetching cars:", error); 

    return NextResponse.json({ message: "Failed to fetch data" }, { status: 500 });
  }
}
