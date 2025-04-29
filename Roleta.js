import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase-config';

function Roleta() {
  const [moedas, setMoedas] = useState(0);
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = auth.currentUser;

  useEffect(() => {
    const carregarDados = async () => {
      if (!user) return;
      const doc = await db.collection("usuarios").doc(user.uid).get();
      if (doc.exists) {
        setMoedas(doc.data().moedas);
        setLoading(false);
      }
    };
    carregarDados();
  }, [user]);

  const girarRoleta = async () => {
    if (moedas < 10) {
      alert('Saldo insuficiente!');
      return;
    }

    const sorteio = Math.floor(Math.random() * 36);
    const ganhou = sorteio % 2 === 0;
    const novoSaldo = moedas - 10 + (ganhou ? 20 : 0);

    setResultado(sorteio);
    setMoedas(novoSaldo);

    await db.collection("usuarios").doc(user.uid).update({
      moedas: novoSaldo
    });
  };

  if (loading) return <p>Carregando saldo...</p>;

  return (
    <div>
      <h2>Roleta</h2>
      <p>Saldo: {moedas} moedas</p>
      <button onClick={girarRoleta}>Girar (custa 10 moedas)</button>
      {resultado !== null && (
        <p>Resultado: {resultado} - {resultado % 2 === 0 ? 'Você Ganhou!' : 'Você Perdeu!'}</p>
      )}
    </div>
  );
}

export default Roleta;