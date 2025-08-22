//importa o Link do react-router-dom e os icones do react-icons e o css do componente
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import './index.css';

export default function Footer() {
    return (
        <footer id="footer">
            <section id="text">
                <p>Desenvolvido por: Agatha Vitoria, Emily, Felipe e Matheus</p>
            </section>
            <section id="redes">
                <a className="icon" href="https://www.instagram.com/studioevelynciliosesobrancelha?igsh=MWlhcmpyYTVtNDI3eQ%3D%3D" target="_blank" rel="noreferrer">
                    <FaInstagram />
                </a>
                <a className="icon" href="https://api.whatsapp.com/send?phone=5511948043847&text=Ol%C3%A1,como%20posso%20ajudar?" target="_blank" rel="noreferrer">
                    <FaWhatsapp />
                </a>
            </section>
        </footer>
    )
}