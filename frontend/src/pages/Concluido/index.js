// importe de bibliotecas
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


// função Agendamento
function Concluido() {

    const nav = useNavigate();

    // useEffect para buscar detalhes do usuário
    useEffect(() => {
        handleAgendar();
    }, []); // Rodar apenas uma vez, na montagem

    // useEffect para lidar com a lógica de agendamento


    // função para agendar e salvar no banco de dados
    const handleAgendar = async () => {
        const cachedProcedimento = JSON.parse(localStorage.getItem('procedimento'));

        console.log(cachedProcedimento);
        try {
            console.log("EU TO AQUIII");
            await fetch('http://127.0.0.1:5000/agendamentos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    CPF: "123",
                    NOME: cachedProcedimento.displayName,
                    EMAIL: cachedProcedimento.email,
                    DATA: cachedProcedimento.dataMarca,
                    HORA: cachedProcedimento.horario,
                    VALOR: cachedProcedimento.total,
                    PROCEDIMENTO: cachedProcedimento.procedimentos,
                    TP_PAGAMENTO: "Online"
                }),
            });

            alert('Agendamento realizado com sucesso!');
            localStorage.removeItem('procedimento');
            console.log('Agendamento realizado com sucesso!');
            nav('/agendamentos');
        } catch (error) {
            console.error('Erro ao agendar:', error);
        }
    };



    return (
        <>
        </>
    );
}

export default Concluido;
