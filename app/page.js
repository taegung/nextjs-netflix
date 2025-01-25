import Banner from "./components/Banner";
import Top10List from "./components/Top10List";

export default async function Home() {
  const bannerData = await fetch("http://localhost:3000/api/banner").then((res) =>
    res.json()
  );

  return (
    <div>
      {/* SSR Banner */}
      <Banner bannerData={bannerData} />
      <div className="px-8">
        {/* CSR Top10List */}
        <Top10List />
      </div>
    </div>
  );
}
