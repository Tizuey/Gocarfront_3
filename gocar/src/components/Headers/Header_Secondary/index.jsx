import React, { useEffect, useState } from "react";

import Logo from "../../../assets/logo_gocar.png";

import "./style.css";

import { Navbar } from "react-bootstrap";

import { Link } from "react-router-dom";

import { SignOut } from "phosphor-react";

function SecondaryHeader({ nomeUsuario }) {
  const [autenticacao, setAutenticacao] = useState("");

  useEffect(() => {}, [autenticacao]);

  function logout() {
    localStorage.clear();
    setAutenticacao("logout");
  }

  return (
    <>
      <header>
        <Navbar className="navbar">
          <Navbar.Brand>
            <Link to="/">
              <img
                src={Logo}
                width="100"
                height="30"
                className="align-top ml-4"
                alt="LOGO"
              />
            </Link>
          </Navbar.Brand>

          <div className="user_autenticado">
            <div className="user_options">
              <div className="welcome_text">
                <p>Olá, {nomeUsuario} </p>
              </div>
              <button
                className="logout"
                onClick={() => {
                  logout();
                }}
              >
                {" "}
                <a href="/">
                  <SignOut size={25} />
                </a>{" "}
              </button>
              <button className="perfil">{nomeUsuario.substr(0, 1)}</button>
            </div>
          </div>
        </Navbar>
      </header>
    </>
  );
}

export default SecondaryHeader;