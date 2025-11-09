import { useState } from "react";
import { PiCertificateDuotone } from "react-icons/pi";
import { ImLink } from "react-icons/im";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "../../Home/Home.scss";
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
          .slice(0, mostrarTodos ? formacion.length : 3)
          .map((item) => (
            <div className="proyect" key={item.id}>
              <img src={item.imagen} alt={item.institucion} />
              <div>
                <h1 className="titulo-proyecto">{item.institucion}</h1>
                <p className="descripcion-proyecto">{item.descripcion}</p>
              </div>
              <div className="btn-code-preview">
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="code">
                      <ImLink /> &nbsp;Certificado
                    </button>
                  </a>
                )}
              </div>
            </div>
          ))}
      </div>

      {formacion.length > 3 && (
        <div className="btn-vermas-vermenos">
          <button className="ver-mas" onClick={() => setMostrarTodos((p) => !p)}>
            {mostrarTodos ? "Ver menos Certificados" : "Ver más Certificados"}
            {mostrarTodos ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </div>
      )}
    </>
  );
}
