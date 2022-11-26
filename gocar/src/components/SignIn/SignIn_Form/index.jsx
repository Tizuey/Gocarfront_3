import React from "react";

import { useFormik } from "formik";

import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../../Context/Context";



const validate = (values) => {
  const errors = {};

  if (!values.username) {
    errors.username = "Obrigatório";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.username)) {
    errors.username = "Email Inválido";
  } 
  // else if (values.username != login.username) {
  //   errors.username = "Por favor tente novamente, suas credenciais são inválidas";
  // }

  if (!values.password) {
    errors.password = "Obrigatório";
  } 
  // else if (values.password != login.password) {
  //   errors.password =
  //     "Por favor tente novamente, suas credenciais são inválidas";
  // }

  return errors;
};

const SignInForm = () => {
  
  const {authenticated, login} = useContext(Context);



  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      // localStorage.setItem("nome", login.nome);
      // window.location.href = "/";
      console.log("submit",(values))
      login(values);
      // integração com o context e api
    },
  });

// Lógica de login


  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="signup_form">
        <div className="title">
          <h1>Iniciar Sessão</h1>
          <p>{String(authenticated)}</p>
        </div>

        <label htmlFor="username">Email</label>
        <input
          id="username"
          name="username"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
        {formik.touched.username && formik.errors.username ? (
          <div className="error">{formik.errors.username}</div>
        ) : null}

        <label htmlFor="password">Senha</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="error">{formik.errors.password}</div>
        ) : null}

        <button className="btn_login" type="submit">
          Login
        </button>
        <p>
          Ainda não possui conta? <Link to="/signup">Cadastre-se</Link>{" "}
        </p>
      </form>
    </div>
  );
};

export default SignInForm;