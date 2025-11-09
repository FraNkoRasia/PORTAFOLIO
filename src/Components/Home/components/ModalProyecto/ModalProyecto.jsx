import { useState, useEffect, useRef } from "react";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./ModalProyecto.scss";

export default function ModalProyecto({ proyecto, cerrarModal }) {
  const [imagenActual, setImagenActual] = useState(0);
  const intervaloRef = useRef(null);

  const imagenes = proyecto.imagenes || (proyecto.imagen ? [proyecto.imagen] : []);
  const tieneMultiples = imagenes.length > 1;

  const siguiente = () => setImagenActual((i) => (i + 1) % imagenes.length);
  const anterior = () => setImagenActual((i) => (i - 1 + imagenes.length) % imagenes.length);

  useEffect(() => {
    if (tieneMultiples) {
      intervaloRef.current = setInterval(siguiente, 4000);
      return () => clearInterval(intervaloRef.current);
    }
  }, [proyecto]);

  return (
    <div className="modal-overlay" onClick={cerrarModal}>
      <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
        
        {/* Botones fuera del contenedor */}
        <button className="modal-cerrar" onClick={cerrarModal}>
          <FaTimes />
        </button>
  
        {tieneMultiples && (
          <>
            <button className="modal-anterior" onClick={anterior}>
              <FaChevronLeft />
            </button>
            <button className="modal-siguiente" onClick={siguiente}>
              <FaChevronRight />
            </button>
          </>
        )}
  
        <div className="modal-imagen-contenedor">
          <img
            src={imagenes[imagenActual]}
            alt={proyecto.titulo}
            className="modal-imagen"
          />
        </div>
  
        {tieneMultiples && (
          <div className="modal-indicadores">
            {imagenes.map((_, i) => (
              <span
                key={i}
                className={`modal-punto ${i === imagenActual ? "activo" : ""}`}
                onClick={() => setImagenActual(i)}
              />
            ))}
          </div>
        )}
  
        <div className="modal-info">
          <h2 className="modal-titulo">{proyecto.titulo}</h2>
          <p className="modal-descripcion">{proyecto.descripcion}</p>
        </div>
      </div>
    </div>
  );
  
}
