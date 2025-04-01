import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken"; 
import { config } from "@/config";

export function getToken(req: NextRequest) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  
  if (!token) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET) as JwtPayload;
    return { decoded };
  } catch (error) {
    return { error: NextResponse.json({ error: "Invalid token" }, { status: 403 }) };
  }
}

  

