import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Container, Card, Row, Text, Table, Button, Spacer } from "@nextui-org/react";

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
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        setUnauthorized(true);
      } else {
        const data = await response.json();
        setBooks(data);
        setUnauthorized(false);
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
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 401) {
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
        <button onClick={() => router.push("/login")}>Login</button>
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: "2rem",
          paddingRight: "2rem",
        }}
      >
        <Text
          h1
          size={60}
          css={{
            textGradient: "45deg, $blue600 -20%, $pink600 50%",
          }}
          weight="bold"
        >
          Books
        </Text>
        <Button
          color="primary"
          auto
          onClick={() => router.push("/book/create")}
        >
          Create
        </Button>
      </div>

      <Container>
        <Card css={{ $$cardColor: "$colors$primary" }}>
          <Card.Body>
            <Table
              bordered
              shadow={false}
              color="secondary"
              aria-label="Example pagination table"
              css={{
                height: "auto",
                minWidth: "100%",
              }}
              selectionMode="multiple"
            >
              <Table.Header>
                <Table.Column>ID</Table.Column>
                <Table.Column>Title</Table.Column>
                <Table.Column>Author</Table.Column>
                <Table.Column>Page</Table.Column>
                <Table.Column>Actions</Table.Column>
              </Table.Header>
              <Table.Body>
                {books.map((book) => (
                  <Table.Row key={book.id}>
                    <Table.Cell>{book.id}</Table.Cell>
                    <Table.Cell>{book.title}</Table.Cell>
                    <Table.Cell>{book.author}</Table.Cell>
                    <Table.Cell>{book.page}</Table.Cell>
                    <Table.Cell>
                      <div style={{ display: "flex" }}>
                        <Button
                          onClick={() => router.push(`/book/edit/${book.id}`)}
                          auto
                          color="secondary"
                        >
                          Edit
                        </Button>
                        <Spacer x={1} />
                        <Button
                          onClick={() => handleDelete(book.id)}
                          auto
                          color="error"
                        >
                          Delete
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
              <Table.Pagination
                shadow
                noMargin
                align="center"
                rowsPerPage={5}
                onPageChange={(page) => console.log({ page })}
              />
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default BooksPage;
