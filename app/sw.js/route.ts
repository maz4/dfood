import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-static";

export async function GET() {
  try {
    const swPath = path.join(process.cwd(), "public", "sw.js");
    const swContent = fs.readFileSync(swPath, "utf-8");

    return new NextResponse(swContent, {
      headers: {
        "Content-Type": "application/javascript",
        "Service-Worker-Allowed": "/",
        "Cache-Control": "public, max-age=0, must-revalidate",
      },
    });
  } catch (error) {
    return new NextResponse("Service Worker not found", { status: 404 });
  }
}
