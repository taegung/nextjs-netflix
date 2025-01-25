import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10); // 기본값 1
  const limit = parseInt(searchParams.get("limit") || "3", 10); // 기본값 3

  // Array of image paths
  const imagePaths = [
    "/images/1.PNG",
    "/images/3.PNG",
    "/images/4.PNG",
    "/images/5.PNG",
    "/images/6.PNG",
    "/images/7.PNG",
    "/images/8.PNG",
    "/images/9.PNG",
    "/images/2.PNG",
    "/images/10.PNG",
    "/images/11.PNG",
    "/images/12.PNG",
    "/images/13.PNG",
    "/images/14.PNG",
    "/images/15.PNG",
  ];

  // Generate all shows with sequential images
  const allShows = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    title: `트렌딩 쇼 ${i + 1}`,
    image: imagePaths[i % imagePaths.length], // Select image in a sequential manner
    badge: i % 3 === 0 ? "최신 등록" : i % 3 === 1 ? "감동" : "명작",
  }));

  const startIndex = 0; // 항상 0에서 시작
  const endIndex = page * limit; // 요청된 페이지까지의 데이터
  const paginatedShows = allShows.slice(startIndex, endIndex);

  await new Promise((resolve) => setTimeout(resolve, 2000)); // 2초 지연
  return NextResponse.json(paginatedShows);
}
