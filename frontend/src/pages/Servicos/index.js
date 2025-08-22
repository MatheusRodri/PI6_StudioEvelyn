import React from 'react';
import './index.css';
import CardProcedimento from '../../components/CardProcedimento/index.js';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import servicos from '../../services/servicos.js';

function ProductPage() {

  return (
    <>
      <Header />

      <div className="servicos-container">
        <div className='servicos'>
          {
            servicos.map((procedimento, index) => (
              <CardProcedimento key={index} procedimento={procedimento} />
            ))
          }
        </div>
      </div>
      <Footer />
    </>

  );
}

export default ProductPage;
