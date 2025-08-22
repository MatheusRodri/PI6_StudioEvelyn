import React from 'react';
import './index.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Home() {


  return (
    <>
      <Header />

      <main className="container">

        {/* Seção da primeira imagem com texto */}
        <section className="section">
          <img
            src="images/home1.png"
            alt="Imagem 1: Empreendedora e sua história"
            className="image"
          />
          <article className="textSection">
            <h2 className="tituloh2">Seja Bem Vinda(o)!!</h2>
            <p className='vw-plugin-top-wrapper'>
              Nosso propósito é lhe proporcionar as melhores experiências em extensão de cílios! Entregando um resultado lindo e de alta performance!
            </p>
            <p>
              Temos diversos modelos de extensão de cílios para você se apaixonar! Nossos modelos vão desde um resultado mais natural a um resultado com mais volume. Você escolhe!
            </p>
          </article>
        </section>

        {/* Seção da segunda imagem com texto */}
        <section className="section">
          <article className="textSection">
            <h2 className="tituloh2">Segurança é a nossa base!</h2>
            <p>
              No Studio Evelyn Gomes Cílios e Sobrancelhas trabalhamos sempre com segurança e cautela, respeitando os limites dos cílios de nossas clientes.
            </p>
            <p>
              Todos os nossos materiais são esterilizados e higienizados, além de um ambiente seguro e confortável.
            </p>
          </article>
          <img
            src="images/home2.png"
            alt="Imagem: Destaque de um procedimento"
            className="image"
          />
        </section>

        {/* Seção da terceira imagem com texto */}
        <section className="section">
          <img
            src="images/home3.png"
            alt="Imagem da execução do serviço de cílios: Destaque de um procedimento"
            className="image"
          />
          <article className="textSection">
            <h2 className="tituloh2">Lábios mais Harmonizados!</h2>
            <p>
              Com o nosso serviço de micropigmentação labial, você terá os lábios mais harmônicos e com mais cor!
            </p>
            <p>
              Temos cores mais suaves, como um rosado mais natural até um vermelho marcante. Entre na nossa página de serviços disponível em nosso site e fique à vontade!
            </p>
          </article>
        </section>

        {/* Seção da quarta imagem com texto */}
        <section className="section">
          <article className="textSection">
            <h2 className="tituloh2">Sobrancelhas bem definidas!</h2>
            <p>
              Na categoria sobrancelhas, temos serviços de micropigmentação, design simples e design com henna.
            </p>
            <p>
              Tudo depende da sua necessidade e do que mais te agrada! No canto superior direito de nosso site, está disponível a página de serviços onde você, nossa cliente, pode escolher o que quiser!
            </p>
          </article>
          <img
            src="images/home4.png"
            alt="Imagem: Destaque de um procedimento"
            className="image"
          />
        </section>

      </main>

      <Footer />
    </>
  );
}
