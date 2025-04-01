import { NextResponse } from "next/server";

export async function POST() {
  try {
    console.log("📌 API logout hit");

    // ลบ Token ออกจาก Header หรือ Cookie
    const response = NextResponse.json({ message: "✅ ออกจากระบบสำเร็จ" }, { status: 200 });

    // ลบ Token ออกจาก Cookie (ถ้ามีการเก็บไว้)
    response.headers.set("Set-Cookie", "token=; HttpOnly; Path=/; Max-Age=0");

    console.log("🚀 Token ถูกลบออกแล้ว!");

    return response;
  } catch (error) {
    console.error("🚨 Error during logout:", error);
    return NextResponse.json({ message: "❌ ล้มเหลวในการออกจากระบบ" }, { status: 500 });
  }
}
