import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const UpdateBookPage = () => {
  const [book, setBook] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [page, setPage] = useState("");
  const router = useRouter();
  const { id } = router.query; // Retrieve the book ID from the URL parameter

  useEffect(() => {
    fetchBook();
  }, [id]);

  const fetchBook = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`/api/book?id=${id}`, {
        headers: { Authorization: `Bearer ${token}` }, // Include token in request headers
      });
      setBook(response.data);
      setTitle(response.data.title ?? ""); // Set default value to empty string
      setAuthor(response.data.author ?? ""); // Set default value to empty string
      setPage(response.data.page ?? ""); // Set default value to empty string
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `/api/book/`,
        { title, author, page: parseInt(page), id }, // Include book ID in request body
        {
          headers: { Authorization: `Bearer ${token}` }, // Include token in request headers
        }
      );
      // Redirect to books page or show success message
      router.push("/book"); // Update the URL pattern to match your books page route
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {book ? (
        <form>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label>
            Author:
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </label>
          <label>
            Page:
            <input
              type="number"
              value={page}
              onChange={(e) => setPage(e.target.value)}
            />
          </label>
          <button type="button" onClick={handleUpdate}>
            Update
          </button>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UpdateBookPage;
