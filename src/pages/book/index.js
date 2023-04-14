import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const BooksPage = () => {
    const router = useRouter();
    const [books, setBooks] = useState([]);
    const [unauthorized, setUnauthorized] = useState(false);

    useEffect(() => {
        const fetchBooks = async () => {
            const token = localStorage.getItem("token");
            const response = await fetch("api/book", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.status=== 401) {
                setUnauthorized(true);
            } else {
                const data = await response.json();
                setBooks(data);
                setUnauthorized(false)
            }
        };
        fetchBooks();
    }, []);

    const handleDelete = async (id) => {
        const token = localStorage.getItem("token");
        const response = await fetch("/api/book", {
            method: "DELETE",
            body: JSON.stringify({ id }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.status=== 401) {
            setUnauthorized(true);
        } else {
            const data = await response.json();
            const updateBooks = books.filter((book) => book.id !== id);
            setBooks(updateBooks);
            setUnauthorized(false);
        }
    };

    if (unauthorized) {
        return (
            <div>
                <h1>Unauthorized</h1>
                <p>You are not authorized to view this page</p>
                <button onClick={()=>router.push("/login")}>Login</button>
            </div>
        )
    }

    return (
        <div>
            <h1>Books</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Page</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.id}>
                            <td>{book.id}</td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.page}</td>
                            <td>
                                <button onClick={() => router.push(`/book/edit/${book.id}`)}>Edit</button>
                                <button onClick={() => handleDelete(book.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <button onClick={() => router.push("/book/create")}>Create</button>
            </div>
        </div>
    )
}

export default BooksPage;