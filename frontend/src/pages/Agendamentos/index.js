import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './index.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function AgendamentoDetalhe() {
  const [usuario, setUsuario] = useState({});
  const [dados, setDados] = useState([]);
  const [nomeUser, setNomeUser] = useState('');
  const nav = useNavigate();

  document.addEventListener('keydown', function (event) {
    if (event.key === 'a') {
      nav('/agendamento');
      event.preventDefault();
      event.stopPropagation();
    }
  });


  function verificaHorario() {
    let data = new Date();
    let hora = data.getHours();

    if (hora >= 0 && hora <= 11) {
      return "Bom dia";
    } else if (hora >= 12 && hora <= 17) {
      return "Boa tarde";
    } else {
      return "Boa noite";
    }
  }

  const carregarAgendamentoUser = async () => {
    console.log('carregarAgendamentoUser')
    try {
      console.log('carregarAgendamentoUser2')
      const cpf = localStorage.getItem('CPF');
      console.log(cpf)
      const response = await axios.get(`http://localhost:5000/agendamentos/cliente/${cpf}`); // <-- CPF na rota
      setDados(response.data);
    } catch (error) {
      console.error('Erro ao carregar agendamentos:', error);
    }
  };


  const carregarTodosAgendamentos = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/agendamentos`)
      setDados(response.data)
    } catch (error) {
      console.error('Erro ao carregar agendamentos:', error);
    }
  };

  useEffect(() => {
    setNomeUser(localStorage.getItem('usuario'));
      carregarAgendamentoUser();
  }, []);

  function converteData(data) {
    const newDate = new Date(data);
    return newDate.toLocaleDateString('pt-BR');
  }

  function handleLoggout() {
    
  }

  return (
    <>
      <Header />
      <main className='main'>
        <h2>Detalhes dos Agendamentos</h2>
        <div className='nomeEbotao'>
          <p className='nameUser'>{verificaHorario() + " " + (nomeUser || '')}<span onClick={handleLoggout}>Sair</span> </p>
          <button className='buttonAgendar'>
            <Link to="/agendamento">Agendar</Link>
          </button>
        </div>
        {
          dados.length === 0 ? (
            <p className='semAgendamentoText'>Não há agendamentos para exibir</p>
          ) : (
            usuario.permissao === 1 ? (
              dados.map((agendamento) => (
                <div className="detalhe-container" key={agendamento.ID_AGENDAMENTO}>
                  <p><strong>Nome:</strong> {agendamento.NOME}</p>
                  <p><strong>Serviço:</strong> {agendamento.PROCEDIMENTO}</p>
                  <p><strong>Data:</strong> {converteData(agendamento.DATA)}</p>
                  <p><strong>Horário:</strong> {agendamento.HORA}</p>
                  <p><strong>Valor:</strong> {"R$ " + agendamento.VALOR + ",00"}</p>
                </div>
              ))
            ) : (
              dados.map((agendamento) => (
                <div className="detalhe-container" key={agendamento.id}>
                  <p><strong>Serviço:</strong> {agendamento.PROCEDIMENTO}</p>
                  <p><strong>Data:</strong> {converteData(agendamento.DATA)}</p>
                  <p><strong>Horário:</strong> {agendamento.HORA}</p>
                  <p><strong>Valor:</strong> {"R$ " + agendamento.VALOR + ",00"}</p>

                </div>
              ))
            )
          )
        }
      </main>
      <Footer />
    </>
  );
}

export default AgendamentoDetalhe;
