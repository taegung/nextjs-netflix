import Banner from "./components/Banner";
import Top10List from "./components/Top10List";


export default function Home() {
  return (
    <div>
      {/* 배너 (SSR) */}
      <Banner />
      <div className="px-8">
        {/* TOP 10 리스트 (CSR) */}
        <Top10List />
      </div>
    </div>
  );
}
