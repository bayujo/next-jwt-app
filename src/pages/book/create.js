import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const CreateBookPage = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        page: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const response = await fetch("/api/book/", {
            method: "POST",
            body: JSON.stringify({ ...formData, page: parseInt(formData.page) }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });

        const data = await response.json();
        router.push("/book")
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    }

    return (
        <div>
            <h1>Create Book</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange}/>                    
                </div>
                <div>
                    <label>Author</label>
                    <input type="text" name="author" value={formData.author} onChange={handleChange}/>                    
                </div>
                <div>
                    <label>Page</label>
                    <input type="number" name="page" value={formData.page} onChange={handleChange}/>                    
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default CreateBookPage;