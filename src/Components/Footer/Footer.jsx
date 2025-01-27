import './Footer.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faTelegram } from '@fortawesome/free-brands-svg-icons';


export default function Footer() {
    window.addEventListener('scroll', function() {
        const footer = document.querySelector('.footer');
        if (window.scrollY > 50) { // Cambia el valor según cuándo quieras que aparezca el fondo
            footer.classList.add('footer-scrolled');
        } else {
            footer.classList.remove('footer-scrolled');
        }
    });
    
    return (
        <footer className='footer'>
           
            <div className="redes-footer">
                <a href="https://www.linkedin.com/in/francorasia/" className="redes-icon"><FontAwesomeIcon icon={faLinkedin} size="2x" /></a>
                <a href="https://github.com/FraNkoRasia?tab=repositories" className="redes-icon"><FontAwesomeIcon icon={faGithub} size="2x" /></a>
                <a href="https://wa.me/543583415501" className="redes-icon"><FontAwesomeIcon icon={faWhatsapp} size="2x" /></a>
                <a href="https://t.me/FraNNkop" className="redes-icon"><FontAwesomeIcon icon={faTelegram} size="2x" /></a>
            </div>
            {/* <p>Web Desarrollada por | Franco Rasia 2024</p> */}
            <p>&copy; {new Date().getFullYear()} FraNko. Todos los derechos reservados.</p>
        </footer>

    );
}
