"use client";

import { useState, useEffect } from "react";

export default function CSRComponent() {
  const [csrShows, setCsrShows] = useState([]);
  const [csrPage, setCsrPage] = useState(1);
  const [csrLoading, setCsrLoading] = useState(false);
  const [selectedShow, setSelectedShow] = useState(null); // 선택된 쇼
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

  const ITEMS_PER_PAGE = 3;

  const loadCsrMore = async (isInitialLoad = false) => {
    setCsrLoading(true);
    try {
      // 초기 로드 시 3초 지연 추가
      if (isInitialLoad) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      const res = await fetch(`/api/delayedTrending?page=${csrPage}&limit=${ITEMS_PER_PAGE}`);
      const data = await res.json();

      const newData = data.filter((newItem) => !csrShows.some((item) => item.id === newItem.id));
      setCsrShows((prev) => [...prev, ...newData]);
      setCsrPage((prev) => prev + 1);
    } catch (error) {
      console.error("CSR 데이터 로드 실패:", error);
    } finally {
      setCsrLoading(false);
    }
  };

  useEffect(() => {
    loadCsrMore(true); // 초기 로드 시 3초 지연 포함
  }, []);

  const openModal = (show) => {
    setSelectedShow(show);
    setIsModalOpen(true);
  };

  const closeModal = (e) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
      setSelectedShow(null);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-blue-500">CSR 방식</h2>
      <div className="grid grid-cols-3 gap-4">
        {csrShows.map((show) => (
          <div
            key={`csr-${show.id}`}
            className="relative text-white cursor-pointer"
            onClick={() => openModal(show)}
          >
            <img
              src={show.image}
              alt={show.title}
              className="rounded-lg w-full h-48 object-cover"
            />
            <div className="absolute top-2 left-2 bg-black px-2 py-1 rounded text-lg font-bold">
              {show.id}
            </div>
            <p className="mt-2">{show.title}</p>
            <span className="text-red-500">{show.badge}</span>
          </div>
        ))}
      </div>
      {csrLoading && <p className="text-center text-gray-500">로딩 중...</p>}
      {!csrLoading && csrShows.length < 25 && (
        <div className="text-center mt-4">
          <button
            onClick={loadCsrMore}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            CSR 더보기
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
