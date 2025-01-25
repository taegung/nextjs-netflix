import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10); // 기본값 1
  const limit = parseInt(searchParams.get("limit") || "3", 10); // 기본값 3

  const allShows = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    title: `트렌딩 쇼 ${i + 1}`,
    image: `/images/trending1.jpg`, // 이미지 경로 고정
    badge: i % 3 === 0 ? "최신 등록" : i % 3 === 1 ? "감동" : "명작",
  }));

  const startIndex = 0; // 항상 0에서 시작
  const endIndex = page * limit; // 요청된 페이지까지의 데이터
  const paginatedShows = allShows.slice(startIndex, endIndex);

  await new Promise((resolve) => setTimeout(resolve, 2000)); // 2초 지연
  return NextResponse.json(paginatedShows);
}
