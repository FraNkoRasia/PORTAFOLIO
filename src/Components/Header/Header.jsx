import { useEffect, useRef } from 'react';
import './Header.scss';

export default function Header() {
    const headerRef = useRef(null);

    useEffect(() => {
        // Aplicar fondo fijo siempre
        if (headerRef.current) {
            headerRef.current.style.setProperty('background-color', 'rgba(0, 0, 0, 0.8)', 'important');
            headerRef.current.classList.add('header-scrolled');
        }
    }, []);

    return (
        <header 
            ref={headerRef}
            className="header"
            style={{
                transition: 'background-color 0.3s ease'
            }}
        >
            <div className="header-content">
                <nav>
                    <ul>
                        <li><a className='secciones' href="#proyectos">Proyectos</a></li>
                        <li><a className='secciones' href="#formacion">Formación</a></li>
                        <li><a className='secciones' href="#skills">Skills</a></li>
                        <li><a className='secciones' href="#sobre-mi">Sobre mí</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
