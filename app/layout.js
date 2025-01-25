import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="flex items-center justify-between px-8 py-4 bg-black">
          <h1 className="text-red-600 text-2xl font-bold">NETFLIX</h1>
          <nav>
            <ul className="flex gap-4">
              <li><a href="#" className="hover:underline">홈</a></li>
              <li><a href="#" className="hover:underline">시리즈</a></li>
              <li><a href="#" className="hover:underline">영화</a></li>
            </ul>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
