import React, { useState } from 'react';
import { auth, db } from '../firebase-config';

function Cadastro() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const cadastrar = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, senha);
      const user = userCredential.user;

      await db.collection("usuarios").doc(user.uid).set({
        email: email,
        moedas: 1000
      });

      alert('Cadastro realizado com sucesso!');
    } catch (err) {
      alert('Erro: ' + err.message);
    }
  };

  return (
    <div>
      <h2>Cadastro</h2>
      <form onSubmit={cadastrar}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Senha" onChange={(e) => setSenha(e.target.value)} />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default Cadastro;