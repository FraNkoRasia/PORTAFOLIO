import { useState } from "react";
import PropTypes from "prop-types"; // ✅ Importamos PropTypes
import { PiCertificateDuotone } from "react-icons/pi";
import { ImLink } from "react-icons/im";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "./Formacion.scss";
import "../Proyectos/Proyectos.scss";
import "../ProyectoCard/ProyectoCard.scss";

export default function Formacion({ formacion }) {
  const [mostrarTodos, setMostrarTodos] = useState(false);

  return (
    <>
      <h1 className="formacion" id="formacion">
        <PiCertificateDuotone />
        &nbsp;Formación
      </h1>

      <div className="proyectos">
        {formacion
          .slice(0, mostrarTodos ? formacion.length : 4)
          .map((item) => (
            <article className="proyect" key={item.id}>
              <img
                src={item.imagen}
                alt={item.institucion}
                loading="lazy"
              />

              <div>
                <h2 className="titulo-proyecto">{item.institucion}</h2>
                <p className="descripcion-proyecto">{item.descripcion}</p>
              </div>

              {item.url && (
                <div className="btn-code-preview">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="code">
                      <ImLink /> &nbsp;Certificado
                    </button>
                  </a>
                </div>
              )}
            </article>
          ))}
      </div>

      {formacion.length > 3 && (
        <div className="btn-vermas-vermenos">
          <button
            className="ver-mas"
            onClick={() => setMostrarTodos((prev) => !prev)}
          >
            {mostrarTodos ? "Ver menos Certificados" : "Ver más Certificados"}
            {mostrarTodos ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </div>
      )}
    </>
  );
}

// ✅ Validación de props
Formacion.propTypes = {
  formacion: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      imagen: PropTypes.string.isRequired,
      institucion: PropTypes.string.isRequired,
      descripcion: PropTypes.string,
      url: PropTypes.string,
    })
  ).isRequired,
};
