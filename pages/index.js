import "bootstrap/dist/css/bootstrap.min.css";

import React, { useState, useEffect, useCallback } from "react";

import { Nav, Button, Form, FormControl, Navbar } from "react-bootstrap";

import GenerateVideoCard from "./GenerateVideoCard";

export default function Home() {
  const [gameName, setGameName] = useState("Minecraft");
  const [searchValue, setSearchValue] = useState("");

  function onChange(e) {
    setSearchValue(e.target.value);
  }

  function onClick(e) {
    setGameName(searchValue);
  }

  const getTopGames = async () => {
    setGameName(``);
  };

  return (
    <div>
      {/* <BrowserRouter> */}
      <>
        <Navbar expand="lg" bg="dark" variant="dark">
          <Nav className="container-fluid">
            <Navbar.Brand>{`twitch-next-app`}</Navbar.Brand>
            <Form className="ml-auto" style={{ display: "flex" }}>
              <FormControl
                type="input"
                placeholder="type game name here"
                className="mr-sm-2"
                onChange={onChange}
              />
              &nbsp;
              <Button variant="outline-success" onClick={onClick}>
                Search
              </Button>
            </Form>
            <Button variant="outline-success" onClick={getTopGames}>
              Top Games
            </Button>
          </Nav>
        </Navbar>
      </>
      {/* <Switch> */}
      {/* <Route path="/twitch-app/videos"> */}
      <GenerateVideoCard gameName={gameName} />
      {/* </Route> */}
      {/* </Switch> */}
      {/* </BrowserRouter> */}
    </div>
  );
}
