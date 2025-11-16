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
        
        // Forzar verificación más frecuente para detectar scroll programático (móviles, flechas, etc.)
        const intervalId = setInterval(() => {
            const { currentScroll, isScrolledDown } = checkScrollPosition();
            if (currentScroll > 50 || isScrolledDown) {
                applyBackground(true);
            } else if (currentScroll <= 50) {
                applyBackground(false);
            }
        }, 100);

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

        // Detectar scroll táctil para móviles
        let touchStartY = 0;
        let touchScrollDelta = 0;
        
        const handleTouchStart = (e) => {
            touchStartY = e.touches[0].clientY;
            touchScrollDelta = 0;
        };
        
        const handleTouchMove = (e) => {
            const currentY = e.touches[0].clientY;
            const deltaY = touchStartY - currentY;
            touchScrollDelta += Math.abs(deltaY);
            touchStartY = currentY;
            
            // Si el desplazamiento acumulado es mayor a 50px, mostrar fondo
            if (touchScrollDelta > 50) {
                applyBackground(true);
            }
            
            // También verificar la posición del scroll actual
            handleScroll();
        };
        
        const handleTouchEnd = () => {
            // Verificar la posición final del scroll múltiples veces
            handleScroll();
            setTimeout(() => handleScroll(), 50);
            setTimeout(() => handleScroll(), 150);
            setTimeout(() => handleScroll(), 300);
        };

        // Detectar arrastre con mouse (para modo móvil con cursor)
        let mouseStartY = 0;
        let mouseScrollDelta = 0;
        let isMouseDown = false;
        
        const handleMouseDown = (e) => {
            mouseStartY = e.clientY;
            mouseScrollDelta = 0;
            isMouseDown = true;
        };
        
        const handleMouseMove = (e) => {
            if (isMouseDown) {
                const currentY = e.clientY;
                const deltaY = mouseStartY - currentY;
                mouseScrollDelta += Math.abs(deltaY);
                mouseStartY = currentY;
                
                // Si el desplazamiento acumulado es mayor a 50px, mostrar fondo
                if (mouseScrollDelta > 50) {
                    applyBackground(true);
                }
                
                // También verificar la posición del scroll actual
                handleScroll();
            }
        };
        
        const handleMouseUp = () => {
            isMouseDown = false;
            // Verificar la posición final del scroll múltiples veces
            handleScroll();
            setTimeout(() => handleScroll(), 50);
            setTimeout(() => handleScroll(), 150);
            setTimeout(() => handleScroll(), 300);
        };

        // Verificar estado inicial
        setTimeout(() => {
            handleScroll();
        }, 100);

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('wheel', handleWheel, { passive: true });
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchmove', handleTouchMove, { passive: true });
        window.addEventListener('touchend', handleTouchEnd, { passive: true });
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            cancelAnimationFrame(rafId);
            clearInterval(intervalId);
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
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
