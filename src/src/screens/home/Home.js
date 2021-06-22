import React, { useEffect, useState } from "react";
import { Container, Form, ListGroup, Button } from "react-bootstrap";
import firebase from "../../utils/firebase";
import { v4 as uuidv4 } from "uuid";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [todoValue, setTodoValue] = useState("");
  const [currentTodoId, setCurrentTodoId] = useState(null);

  useEffect(() => {
    firebase
      .database()
      .ref("/todos")
      .get()
      .then((snapshot) => {
        if (snapshot.val() === null) setTodos([]);
        else {
          setTodos(snapshot.val());
        }
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (todoValue === "") return;

    if (currentTodoId) {
      const updatedTodos = todos.map((todo) =>
        todo.id === currentTodoId ? { ...todo, name: todoValue } : todo
      );
      firebase
        .database()
        .ref("/todos")
        .set(updatedTodos)
        .then((response) => {
          setTodoValue("");
        });

      setTodos(updatedTodos);
      setCurrentTodoId(null);
    } else {
      const newTodos = [
        {
          id: uuidv4(),
          name: todoValue,
        },
        ...todos,
      ];

      firebase
        .database()
        .ref("/todos")
        .set(newTodos)
        .then((response) => {
          setTodoValue("");
        });

      setTodos(newTodos);
    }
  };

  const handleDelete = (todoId) => {
    const filteredTodos = todos.filter((todo) => todo.id !== todoId);

    firebase.database().ref("/todos").set(filteredTodos);

    setTodos(filteredTodos);
  };

  const handleEdit = (todoId) => {
    const currentTodo = todos.find((todo) => todo.id === todoId);

    if (currentTodo) {
      setTodoValue(currentTodo.name);
      setCurrentTodoId(todoId);
    }
  };

  return (
    <Container style={{ marginTop: "50px" }}>
      <Form onSubmit={handleSubmit}>
        <Form.Control
          size="lg"
          type="text"
          placeholder="Type todo and press enter"
          value={todoValue}
          onChange={(event) => setTodoValue(event.target.value)}
        />
      </Form>

      <ListGroup style={{ marginTop: "50px" }}>
        {todos.map((todo) => (
          <ListGroup.Item
            key={todo.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ marginRight: "50px" }}>{todo.name}</div>
            <div>
              <Button onClick={() => handleEdit(todo.id)}>Edit</Button>
              <Button
                variant="danger"
                style={{ marginLeft: "24px" }}
                onClick={() => handleDelete(todo.id)}
              >
                Delete
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Home;
