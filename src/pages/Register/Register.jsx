import styles from "./Register.module.css";

import { useState, useEffect } from "react";

const Register = () => {
  return (
    <div>
      <h1>Cadraste-se para postar</h1>
      <p>Crie seu usuário e compartilhe suas histórias</p>
      <form>
        <label>
          <span>Nome:</span>
          <input
            type="text"
            name="displayName"
            placeholder="Nome do usuário"
            required
          />
        </label>
        <label>
          <span>E-mail:</span>
          <input
            type="email"
            name="displayEmail"
            placeholder="E-mail do usuário"
            required
          />
        </label>
        <label>
          <span>Senha:</span>
          <input
            type="password"
            name="password"
            placeholder="Senha do usuário"
            required
          />
        </label>
        <label>
          <span>Confirmação de senha:</span>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirme a senha"
            required
          />
        </label>
        <button className="btn">Cadastar</button>
      </form>
    </div>
  );
};

export default Register;
