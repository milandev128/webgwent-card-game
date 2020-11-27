import React, { useState, useEffect, useContext } from "react";
import "./css/App.css";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import SocketContext from "./SocketContext";
import { LoggedInContext } from "./LoggedInContext";
import io from "socket.io-client";

let socket = io.connect("http://localhost:8000", {
  query: `token=${localStorage.getItem("_token")}`,
});

function App() {
  const [user, setUser] = useState({});
  const [room, setRoom] = useState();
  const { login } = useContext(LoggedInContext);
  console.log("APP.JS | ROOM: ", room)

  const reconnect = () => {
    socket = io.connect("http://localhost:8000", {
      query: `token=${localStorage.getItem("_token")}`,
    });
  };

  useEffect(() => {
    login();

    socket.on("connected", (resp) => {
      let u = resp;
      setUser(u);
    });

    socket.on("update", (resp) => {
      let u = resp;
      setUser(u);
    });
  }, [login]);

  return (
    <SocketContext.Provider
      value={{ socket, user, room, setUser, setRoom, reconnect }}
    >
      <div className="App">
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </div>
    </SocketContext.Provider>
  );
}

export default App;
