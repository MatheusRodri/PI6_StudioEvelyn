// importa useState do react e o css do componente
import { useState } from 'react';
import './style.css'

export default function CardProcedimento({ procedimento }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <section
      className="card-procedimento"
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      <img src={procedimento.image} alt={procedimento.name} />
      {isHovered ? (
        <section className="description">
          <p>{procedimento.description}</p>
        </section>
      ) : (
        <>
          <h2>{procedimento.name}</h2>
          <span>{procedimento.price}</span>
        </>
      )}
    </section>
  );
}