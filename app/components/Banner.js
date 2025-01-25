export default function Banner() {
    return (
      <div
        className="relative h-[500px] bg-cover bg-center"
        style={{
          backgroundImage: `url(/images/banner.jpg)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/90"></div>
        <div className="relative z-10 p-8 text-white">
          <h1 className="text-4xl font-bold mb-4">누가 공작의 춤을 보았나?</h1>
          <p className="mb-6">크리스마스에 얽힌 이야기를 만나보세요.</p>
          <div className="flex gap-4">
            <button className="bg-white text-black px-4 py-2 rounded">재생</button>
            <button className="bg-gray-800 px-4 py-2 rounded">상세 정보</button>
          </div>
        </div>
      </div>
    );
  }
  