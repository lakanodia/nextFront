import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const fileUrl = searchParams.get("url");
  if (!fileUrl) {
    return new NextResponse("Missing file url", { status: 400 });
  }

  try {
    const fileRes = await fetch(fileUrl);
    if (!fileRes.ok) {
      return new NextResponse("File not found", { status: 404 });
    }
    const fileName = fileUrl.split("/").pop() || "file";
    const blob = await fileRes.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type":
          fileRes.headers.get("content-type") || "application/octet-stream",
        "Content-Disposition": `attachment; filename="${fileName}"`,
      },
    });
  } catch (e) {
    return new NextResponse("Error downloading file", { status: 500 });
  }
}
