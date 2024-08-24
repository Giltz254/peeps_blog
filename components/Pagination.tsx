"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const Pagination = ({ totalPages, page }: { totalPages: number; page: number }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(page);

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  const handleClick = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      router.push(`?page=${page}`);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pageNumbers.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pageNumbers.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-center space-x-2 my-6">
      <button
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center justify-center p-2 rounded-md ${
          currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-black hover:bg-gray-200"
        }`}
      >
        <MdKeyboardArrowLeft size={24} />
        <span className={`text-sm font-medium ${currentPage === 1 ? "text-muted-foreground/30" : "text-black"}`}>Previous</span>
      </button>
      {renderPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === "number" && handleClick(page)}
          className={`flex items-center justify-center px-4 py-2 rounded-md ${
            currentPage === page
              ? "bg-white border border-border text-primary"
              : "text-black hover:bg-muted transition-colors duration-300"
          }`}
          disabled={typeof page !== "number"}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex items-center justify-center p-2 rounded-md ${
          currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-black hover:bg-gray-200"
        }`}
      >
        <span className={`text-sm font-medium ${currentPage === totalPages ? "text-muted-foreground/30" : "text-black"}`}>Next</span>
        <MdKeyboardArrowRight size={24} />
      </button>
    </div>
  );
};

export default Pagination;
