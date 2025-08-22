import './login.scss';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaGoogle } from 'react-icons/fa';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usuario, setUsuario] = useState({});

  const nav = useNavigate();


  const handleLogin = async (e) => {
  

    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          EMAIL: email,
          SENHA: password
        }),
      });

      if (response.ok) {
        const data = await response.json(); // <-- transforma em objeto JS

        console.log('Dados recebidos:', data);

        // Armazena no cache (localStorage)
        localStorage.setItem('usuario',data[0].NOME);
        localStorage.setItem('CPF', data[0].CPF);
        localStorage.setItem('ID', data[0].ID);
       nav('/agendamentos')
     }
    }
    catch (error) {
      console.error('Erro ao fazer login:', error);
    }
}


  return (
    <>
      <Header />
      <main className='login-page'>
        <section className='login-container'>
          <h2 style={{ fontFamily: 'Arial, sans-serif' }}>LOGIN</h2>
          <form id='login-form' onSubmit={handleLogin}>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type='email'
              id='email'
              name='email'
              placeholder='Endereço de E-mail'
              required
            />
            <br />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type='password'
              id='password'
              name='password'
              placeholder='Senha'
              required
            />
            <br />
            <br />
            <input type='submit' value='Entrar' />
          </form>


          <Link to="/registro">Registrar</Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
