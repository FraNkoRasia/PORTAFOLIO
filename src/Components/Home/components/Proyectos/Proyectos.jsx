import { useState } from "react";
import PropTypes from "prop-types"; // ✅ Importamos PropTypes
import { FaCode, FaChevronDown, FaChevronUp } from "react-icons/fa";
import ProyectoCard from "../ProyectoCard/ProyectoCard";
import ModalProyecto from "../ModalProyecto/ModalProyecto";
import "./Proyectos.scss";
import "../ProyectoCard/ProyectoCard.scss";

export default function Proyectos({ proyectos }) {
  const [mostrarTodos, setMostrarTodos] = useState(false);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [proyectoModal, setProyectoModal] = useState(null);

  const abrirModal = (proyecto) => {
    setProyectoModal(proyecto);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setProyectoModal(null);
  };

  return (
    <>
      <h1 className="experiencia" id="proyectos">
        <FaCode /> &nbsp;Proyectos
      </h1>

      <div className="proyectos">
        {proyectos
          .slice(0, mostrarTodos ? proyectos.length : 4)
          .map((p) => (
            <ProyectoCard
              key={p.id}
              proyecto={p}
              abrirModal={abrirModal}
            />
          ))}
      </div>

      {modalAbierto && proyectoModal && (
        <ModalProyecto
          proyecto={proyectoModal}
          cerrarModal={cerrarModal}
        />
      )}

      {proyectos.length > 3 && (
        <div className="btn-vermas-vermenos">
          <button
            className="ver-mas"
            onClick={() => setMostrarTodos((prev) => !prev)}
          >
            {mostrarTodos ? "Ver menos Proyectos" : "Ver más Proyectos"}
            {mostrarTodos ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </div>
      )}
    </>
  );
}

// ✅ Validación de props
Proyectos.propTypes = {
  proyectos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      titulo: PropTypes.string,
      descripcion: PropTypes.string,
      imagen: PropTypes.string,
      tecnologias: PropTypes.arrayOf(PropTypes.string),
      url: PropTypes.string,
      repositorio: PropTypes.string,
    })
  ).isRequired,
};
