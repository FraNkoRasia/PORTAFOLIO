import { useState } from "react";
import { FaCode, FaChevronDown, FaChevronUp } from "react-icons/fa";
import ProyectoCard from "../ProyectoCard/ProyectoCard";
import ModalProyecto from "../ModalProyecto/ModalProyecto";
import "./Proyectos.scss";
import "../ProyectoCard/ProyectoCard.scss";

export default function Proyectos({ proyectos }) {
  const [mostrarTodos, setMostrarTodos] = useState(false);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [proyectoModal, setProyectoModal] = useState(null);

  const abrirModal = (p) => { setProyectoModal(p); setModalAbierto(true); };
  const cerrarModal = () => { setModalAbierto(false); setProyectoModal(null); };

  return (
    <>
      <h1 className="experiencia" id="proyectos">
        <FaCode /> &nbsp;Proyectos
      </h1>

      <div className="proyectos">
        {proyectos.slice(0, mostrarTodos ? proyectos.length : 3).map((p) => (
          <ProyectoCard key={p.id} proyecto={p} abrirModal={abrirModal} />
        ))}
      </div>

      {modalAbierto && proyectoModal && (
        <ModalProyecto proyecto={proyectoModal} cerrarModal={cerrarModal} />
      )}

      {proyectos.length > 3 && (
        <div className="btn-vermas-vermenos">
          <button className="ver-mas" onClick={() => setMostrarTodos((p) => !p)}>
            {mostrarTodos ? "Ver menos Proyectos" : "Ver más Proyectos"}
            {mostrarTodos ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </div>
      )}
    </>
  );
}
