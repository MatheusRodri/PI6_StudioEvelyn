import './index.scss';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useState } from 'react';
import { FaFacebook, FaGoogle } from 'react-icons/fa';

export default function Registro() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');


  const nav = useNavigate()


  async function handleRegister(e) {
    e.preventDefault()
    if (!email || !password || !nome) {
      alert('Preencha todos os campos')
      return
    } else if (password.length < 6) {
      alert('A senha deve ter no mínimo 6 caracteres')
      return
    } else {
      try {

        const response = await fetch('http://localhost:5000/registro', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            NOME: nome,
            EMAIL: email,
            SENHA: password
          }),
        });
        
       

      } catch (e) {
        alert("E-mail já cadastrado")
      }
    }
  }



  return (
    <>
      <Header />
      <main className='register-page'>
        <section className='register-container'>
          <h2 style={{ fontFamily: 'Arial, sans-serif' }}>REGISTRO</h2>
          <form id='register-form' onSubmit={handleRegister}>
            <input onChange={(e) => setNome(e.target.value)} value={nome} type='nome' id='nome' name='nome' placeholder='Nome' /><br />
            <input onChange={(e) => setEmail(e.target.value)} value={email} type='email' id='email' name='email' placeholder='Endereço de E-mail' /><br />
            <input onChange={(e) => setPassword(e.target.value)} value={password} type='password' id='password' name='password' placeholder='Senha' /><br />
            <input type='submit' value='REGISTRAR' />
          </form>
          <Link to="/login">Já tem conta?</Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
