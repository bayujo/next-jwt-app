import prisma from "../../../lib/prisma";
import { authMiddleware } from "../../../lib/middleware";

export default authMiddleware(async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const { title, author, page } = req.body;
            const book = await prisma.book.create({
                data: {
                    title,
                    author,
                    page,
                },
            });
            res.status(201).json(book);
        } catch (error) {
            handleError(res, 500, "Failed to create book")
        }
    } else if (req.method === "GET" && req.query.id) {
        try {
            const book = await prisma.book.findUnique({
                where: {
                    id: Number(req.query.id),
                },
            });
            if (book) {
                res.status(200).json(book);
            } else{
                handleError(res, 404, "Book not found")
            }
        } catch (error) {
            handleError(res, 500, "Failed to fetch book")
        }
    } else if (req.method === "GET") {
        try {
            const books = await prisma.book.findMany();
            res.status(200).json(books);
        } catch (error) {
            handleError(res, 500, "Failed to fetch book")
        }
    } else if (req.method === "PUT") {
        try {
            const { id, title, author, page } = req.body;
            const book = await prisma.book.update({
                where: {
                    id: Number(id),
                },
                data: {
                    title,
                    author,
                    page,
                },
            });
            res.status(200).json(book);
        } catch (error) {
            handleError(res, 500, "Failed to update book")
        }
    } else if (req.method === "DELETE") {
        try {
            const { id } = req.body;
            await prisma.book.delete({
                where: {
                    id: Number(id)
                },
            });
            res.status(200).json({ message: "Book deleted succesfully" });
        } catch (error) {
            handleError(res, 500, "Failed to delete book")
        }
    } else {
        handleError(res, 400, "Invalid request method or missing parameter")
    }
})