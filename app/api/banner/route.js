import { NextResponse } from "next/server";

export async function GET() {
  const bannerData = {
    image: "/images/banner.PNG",
    title: "누가 공작의 춤을 보았나?",
    description: "크리스마스에 얽힌 이야기를 만나보세요.",
    details: "이 영화는 크리스마스와 관련된 깊은 이야기를 다루고 있습니다.",
  };

  return NextResponse.json(bannerData);
}
