import './index.css';
import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import servicos from '../../services/servicos';

function Agendamento() {
  const [dataMarca, setDataMarca] = useState(new Date().toISOString().split('T')[0]);
  const [horario, setHorario] = useState(() => {
    const dataBrasilia = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
    const dataComHora = new Date(dataBrasilia);
    return dataComHora.toTimeString().split(' ')[0].slice(0, 5);
  });
  const [servicosSelecionados, setServicosSelecionados] = useState([]);
  const [precosSelecionados, setPrecosSelecionados] = useState([]);
  const nav = useNavigate();

  const total = useMemo(() => {
    return precosSelecionados.reduce((acc, price) => acc + price, 0);
  }, [precosSelecionados]);

  const handleAgendar = async () => {
    const clienteId = localStorage.getItem('ID');

    if (!clienteId) {
      alert('Erro: ID do cliente não encontrado. Por favor, faça o login novamente.');
      return;
    }
    if (total === 0) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const agendamentoData = {
      ID_CLIENT: parseInt(clienteId, 10),
      DATA: dataMarca,
      HORA: horario,
      VALOR: total,
      PROCEDIMENTO: servicosSelecionados.join(', '),
      TP_PAGAMENTO: "Online"
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/agendamentos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(agendamentoData),
      });

      if (!response.ok) {
        throw new Error('Falha ao realizar agendamento. Tente novamente.');
      }

      alert('Agendamento realizado com sucesso!');
      nav('/agendamentos');
    } catch (error) {
      console.error('Erro ao agendar:', error);
      alert(error.message);
    }
  };

  return (
    <div>
      <Header />
      <div className="agendamento-container">
        <h2>Agendamento</h2>
        <label>
          Data:
          <input type="date" name='data' value={dataMarca} onChange={(e) => setDataMarca(e.target.value)} />
        </label>
        <label>
          Horário:
          <input type="time" name='hora' value={horario} onChange={(e) => setHorario(e.target.value)} />
        </label>
        <h3>Serviços:</h3>
        <ul className="servicos-list">
          {servicos.map(servico => (
            <li key={servico.name}>
              <label>
                <input
                  type="checkbox"
                  value={servico.name}
                  name="servico"
                  checked={servicosSelecionados.includes(servico.name)}
                  onChange={(e) => {
                    const servicoSelecionado = servico;
                    const isChecked = e.target.checked;
                    const preco = parseFloat(servico.price.replace(/[^0-9,]/g, '').replace(',', '.'));

                    setServicosSelecionados(prev =>
                      isChecked
                        ? [...prev, servicoSelecionado.name]
                        : prev.filter(item => item !== servicoSelecionado.name)
                    );

                    setPrecosSelecionados(prev =>
                      isChecked
                        ? [...prev, preco]
                        : prev.filter(item => item !== preco)
                    );
                  }}
                />
                {servico.name}
                <br />
                R${servico.price}
              </label>
            </li>
          ))}
        </ul>
        {total > 0 && (
          <p>Total: R$ {total.toFixed(2)}</p>
        )}
        <button id='btn-agendar' onClick={handleAgendar}>Agendar</button>
      </div>
      <Footer />
    </div>
  );
}

export default Agendamento;