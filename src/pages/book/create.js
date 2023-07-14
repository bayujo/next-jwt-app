import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Input, Spacer, Button } from "@nextui-org/react";

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
                    <Input
                        type="text"
                        required
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        labelPlaceholder="Title"
                        underlined
                    />
                </div>
                <Spacer y={2} />
                <div>
                    <Input
                        type="text"
                        required
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        labelPlaceholder="Author"
                        underlined
                    />
                </div>
                <Spacer y={2} />
                <div>
                    <Input
                        type="number"
                        required
                        name="page"
                        value={formData.page}
                        onChange={handleChange}
                        labelPlaceholder="Page"
                        underlined
                    />
                </div>
                <Spacer y={2} />
                <Button type="submit" auto>
                    Create
                </Button>
            </form>
        </div>
    )
}

export default CreateBookPage;
