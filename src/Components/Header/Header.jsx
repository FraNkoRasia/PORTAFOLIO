import { useEffect, useState, useRef } from 'react';
import './Header.scss';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const headerRef = useRef(null);

    useEffect(() => {
        const applyBackground = (shouldShow) => {
            if (headerRef.current) {
                if (shouldShow) {
                    headerRef.current.style.setProperty('background-color', 'rgba(0, 0, 0, 0.8)', 'important');
                    headerRef.current.classList.add('header-scrolled');
                } else {
                    headerRef.current.style.setProperty('background-color', 'transparent', 'important');
                    headerRef.current.classList.remove('header-scrolled');
                }
                setIsScrolled(shouldShow);
            }
        };

        // Función mejorada para verificar la posición del scroll
        const checkScrollPosition = () => {
            // Obtener el scroll de todas las formas posibles
            const currentScroll = Math.max(
                window.scrollY || 0,
                window.pageYOffset || 0,
                document.documentElement.scrollTop || 0,
                document.body.scrollTop || 0
            );
            
            // También verificar la posición del primer elemento visible en la página
            const bodyRect = document.body.getBoundingClientRect();
            const isScrolledDown = bodyRect.top < -50 || currentScroll > 50;
            
            return { currentScroll, isScrolledDown };
        };

        // Usar requestAnimationFrame para verificar continuamente si hay scroll
        let rafId;
        let lastScrollTop = -1;
        
        const checkScroll = () => {
            const { currentScroll, isScrolledDown } = checkScrollPosition();
            
            // Si el scroll cambió o si estamos scrolleados hacia abajo, actualizar el fondo
            if (currentScroll !== lastScrollTop || isScrolledDown) {
                if (currentScroll > 50 || isScrolledDown) {
                    applyBackground(true);
                } else {
                    applyBackground(false);
                }
                lastScrollTop = currentScroll;
            }
            
            rafId = requestAnimationFrame(checkScroll);
        };
        
        rafId = requestAnimationFrame(checkScroll);

        // Detectar teclas de flecha - solución más directa
        let arrowScrollCount = 0;
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
                arrowScrollCount++;
                if (arrowScrollCount >= 2) { // Después de 2 flechas, mostrar fondo
                    applyBackground(true);
                }
            } else if (e.key === 'ArrowUp' || e.key === 'PageUp' || e.key === 'Home') {
                if (arrowScrollCount > 0) {
                    arrowScrollCount--;
                    if (arrowScrollCount <= 0) {
                        applyBackground(false);
                        arrowScrollCount = 0;
                    }
                }
            }
        };

        // Detectar scroll con wheel (para mouse) - mejorado
        let wheelScroll = 0;
        let lastWheelTime = Date.now();
        const handleWheel = (e) => {
            const now = Date.now();
            // Resetear si pasó mucho tiempo desde el último wheel
            if (now - lastWheelTime > 500) {
                wheelScroll = 0;
            }
            
            lastWheelTime = now;
            wheelScroll += Math.abs(e.deltaY);
            
            if (wheelScroll > 50) {
                applyBackground(true);
            }
            
            // Si scrolleamos hacia arriba, reducir el contador
            if (e.deltaY < 0) {
                wheelScroll = Math.max(0, wheelScroll - Math.abs(e.deltaY));
                if (wheelScroll <= 50) {
                    applyBackground(false);
                }
            }
        };

        // Detectar scroll tradicional (funciona con barra de scroll y rueda del mouse)
        const handleScroll = () => {
            const scrollY = Math.max(
                window.scrollY || 0,
                window.pageYOffset || 0,
                document.documentElement.scrollTop || 0,
                document.body.scrollTop || 0
            );
            
            // También verificar si hay contenido visible que indica scroll
            const viewportTop = window.pageYOffset || document.documentElement.scrollTop || 0;
            
            if (scrollY > 50 || viewportTop > 50) {
                applyBackground(true);
            } else {
                applyBackground(false);
            }
        };

        // Verificar estado inicial
        setTimeout(() => {
            handleScroll();
        }, 100);

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('wheel', handleWheel, { passive: true });
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('keydown', handleKeyDown);
        };
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
