import { useState, useEffect } from "react";
import axios from "axios";

const ITEMS_PER_PAGE = 10;

const useViewConfession = () => {
  const [confessions, setConfessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);

  const pageCount = Math.ceil(confessions.length / ITEMS_PER_PAGE);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/confessions") // Örneğin: "http://localhost:8080/api/confessions"
      .then((res) => {
        // API'den gelen veriyi, frontend için uygun hale getiriyoruz
        const data = res.data.map((item) => ({
          id: item.id,
          author: item.nickname, // nickname -> author (bizim kartta author)
          text: item.confession_text, // confession_text -> text
          createdAt: item.createdAt,
          // diğer alanlar burada gerekmez
        }));
        setConfessions(data);
        setLoading(false);
      })
      .catch(() => {
        setError("İtiraflar alınamadı.");
        setLoading(false);
      });
  }, []);

  const currentItems = confessions.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  const goPrevious = () => {
    setPage((prev) => Math.max(prev - 1, 0));
  };

  const goNext = () => {
    setPage((prev) => Math.min(prev + 1, pageCount - 1));
  };

  return {
    confessions,
    currentItems,
    loading,
    error,
    page,
    pageCount,
    goPrevious,
    goNext,
  };
};

export default useViewConfession;
