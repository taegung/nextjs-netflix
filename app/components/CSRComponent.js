"use client";

import { useState, useEffect } from "react";

const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

// 개별 카드 스켈레톤
function CardSkeleton() {
  return (
    <div className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}>
      <div className="flex p-4">
        <div className="h-5 w-5 rounded-md bg-gray-200" />
        <div className="ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium" />
      </div>
      <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
        <div className="h-7 w-20 rounded-md bg-gray-200" />
      </div>
    </div>
  );
}

export default function CSRComponent() {
  const [csrShows, setCsrShows] = useState([]); // 기존 데이터
  const [newItems, setNewItems] = useState([]); // 새롭게 추가될 데이터
  const [csrPage, setCsrPage] = useState(1);
  const [csrLoading, setCsrLoading] = useState(false);
  const [selectedShow, setSelectedShow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const ITEMS_PER_PAGE = 3;

  const loadCsrMore = async (isInitialLoad = false) => {
    setCsrLoading(true);

    // 스켈레톤을 표시하기 위해 빈 배열 추가
    setNewItems(Array(ITEMS_PER_PAGE).fill(null));

    try {
      if (isInitialLoad) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      const res = await fetch(`/api/delayedTrending?page=${csrPage}&limit=${ITEMS_PER_PAGE}`);
      const data = await res.json();

      const newData = data.filter((newItem) => !csrShows.some((item) => item.id === newItem.id));

      setTimeout(() => {
        setCsrShows((prev) => [...prev, ...newData]); // 기존 데이터 유지 + 새로운 데이터 추가
        setNewItems([]); // 새로운 데이터가 추가되었으므로 스켈레톤 제거
        setCsrPage((prev) => prev + 1);
      }, 500); // 스켈레톤 유지 시간 (1초)
    } catch (error) {
      console.error("CSR 데이터 로드 실패:", error);
      setNewItems([]);
    } finally {
      setCsrLoading(false);
    }
  };

  useEffect(() => {
    loadCsrMore(true);
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

      {/* 기존 데이터는 유지 + 새로 추가될 데이터에는 스켈레톤 표시 */}
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

        {/* 새롭게 추가되는 데이터에만 스켈레톤 표시 */}
        {newItems.map((_, index) => (
          <CardSkeleton key={`skeleton-${index}`} />
        ))}
      </div>

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
