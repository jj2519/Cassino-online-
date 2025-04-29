import React, { useState } from 'react';
import { auth } from '../firebase-config';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const login = async (e) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, senha);
      alert('Login realizado com sucesso!');
    } catch (err) {
      alert('Erro: ' + err.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={login}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Senha" onChange={(e) => setSenha(e.target.value)} />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;