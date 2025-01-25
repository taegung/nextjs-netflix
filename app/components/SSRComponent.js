"use client";

import { useState, useEffect } from "react";
import { CardsSkeleton } from "./Top10ListSkeleton"; // 스켈레톤 컴포넌트 가져오기

export default function SSRComponent() {
  const [ssrShows, setSsrShows] = useState([]);
  const [ssrPage, setSsrPage] = useState(1);
  const [ssrLoading, setSsrLoading] = useState(false);
  const [selectedShow, setSelectedShow] = useState(null); // 선택된 쇼
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

  const ITEMS_PER_PAGE = 3;

  const loadSsrMore = async () => {
    setSsrLoading(true);
    try {
      setSsrShows((prev) => prev.map((item) => ({ ...item, loading: true })));

      const res = await fetch(`/api/delayedTrending?page=${ssrPage}&limit=${ITEMS_PER_PAGE}`, {
        cache: "no-store",
      });
      const data = await res.json();

      const updatedData = [...ssrShows, ...data].slice(-ITEMS_PER_PAGE * ssrPage);
      setSsrShows(updatedData);
      setSsrPage((prev) => prev + 1);
    } catch (error) {
      console.error("SSR 데이터 로드 실패:", error);
    } finally {
      setSsrLoading(false);
    }
  };

  useEffect(() => {
    loadSsrMore();
  }, []);

  const openModal = (show) => {
    if (!ssrLoading) {
      setSelectedShow(show);
      setIsModalOpen(true);
    }
  };

  const closeModal = (e) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
      setSelectedShow(null);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-green-500">SSR 방식</h2>
      <div className="grid grid-cols-3 gap-4">
        {ssrShows.map((show) => (
          <div
            key={`ssr-${show.id}`}
            className={`relative text-white cursor-pointer ${ssrLoading ? "pointer-events-none" : ""}`}
            onClick={() => openModal(show)}
          >
            {ssrLoading ? (
              <div className="rounded-lg w-full h-48 bg-gray-200 animate-pulse"></div>
            ) : (
              <img
                src={show.image}
                alt={show.title}
                className="rounded-lg w-full h-48 object-cover"
              />
            )}
            {!show.loading && (
              <>
                <div className="absolute top-2 left-2 bg-black px-2 py-1 rounded text-lg font-bold">
                  {show.id}
                </div>
                <p className="mt-2">{show.title}</p>
                <span className="text-red-500">{show.badge}</span>
              </>
            )}
          </div>
        ))}
      </div>
      {ssrLoading && <CardsSkeleton />}
      {!ssrLoading && ssrShows.length < 25 && (
        <div className="text-center mt-4">
          <button
            onClick={loadSsrMore}
            className={`px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 ${
              ssrLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={ssrLoading}
          >
            SSR 더보기
          </button>
        </div>
      )}

      {/* 모달 창 */}
      {isModalOpen && selectedShow && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={closeModal}
        >
          <div className="bg-white rounded-lg p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>
            <img
              src={selectedShow.image}
              alt={selectedShow.title}
              className="rounded-lg w-full h-48 object-cover mb-4"
            />
            <h3 className="text-xl font-bold mb-2">{selectedShow.title}</h3>
            <p className="text-gray-700">{selectedShow.badge}</p>
          </div>
        </div>
      )}
    </div>
  );
}
