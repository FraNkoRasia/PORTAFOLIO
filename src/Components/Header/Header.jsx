import React, { useEffect } from 'react';
import './Header.css';

export default function Header() {
    useEffect(() => {
        const handleScroll = () => {
            const header = document.querySelector('.header');
            if (window.scrollY > 50) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Limpiar el evento al desmontar el componente
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className='header'>
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
