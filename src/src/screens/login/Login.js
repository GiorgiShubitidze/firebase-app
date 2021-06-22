import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import classes from "./Login.module.css";
import firebase from "../../utils/firebase";
import { useHistory } from "react-router-dom";
import * as routes from "../../constants/routes";

const Login = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email === "" || password === "") return;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = {
          email: userCredential.user.email,
          uid: userCredential.user.uid,
          refreshToken: userCredential.user.refreshToken,
        };

        localStorage.setItem("user", JSON.stringify(user));
        history.push(routes.HOME);
      });
  };

  return (
    <Container className={classes.container}>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword" style={{ marginTop: "20px" }}>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          style={{ marginTop: "20px" }}
          onClick={handleSubmit}
        >
          Log in
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
