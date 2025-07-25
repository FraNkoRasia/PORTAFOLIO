import { useState, useEffect, useRef } from "react";
import "./Home.scss";
import { ImGithub, ImLink } from "react-icons/im";
import { GrLinkedin } from "react-icons/gr";
import { MdOutlineSimCardDownload } from "react-icons/md";
import {
  FaCode,
  FaChevronDown,
  FaChevronUp,
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaNode,
  FaFigma,
  FaGithub,
  FaTrello,
} from "react-icons/fa";
import { SiMysql, SiPostman } from "react-icons/si";
import { RiTailwindCssFill } from "react-icons/ri";
import { TbUserCheck, TbBrandGithub } from "react-icons/tb";
import { PiCertificateDuotone } from "react-icons/pi";
import { IoLogoJavascript } from "react-icons/io5";
import { RiUserShared2Line } from "react-icons/ri";

export default function Home() {
  const [proyectos, setProyectos] = useState([]);
  const [formacion, setFormacion] = useState([]);
  const [mostrarTodosProyectos, setMostrarTodosProyectos] = useState(false);
  const [mostrarTodosFormacion, setMostrarTodosFormacion] = useState(false);
  const [showCurriculumOptions, setShowCurriculumOptions] = useState(false);
  const curriculumRef = useRef(null);

  const API_URL = "https://fake-api-json.vercel.app/";

  useEffect(() => {
    fetch(`${API_URL}proyectos`)
      .then((response) => response.json())
      .then((data) => setProyectos(data.reverse()))
      .catch((error) => console.error("Error fetching projects:", error));

    fetch(`${API_URL}formacion`)
      .then((response) => response.json())
      .then((data) => setFormacion(data.reverse()))
      .catch((error) => console.error("Error fetching formacion:", error));
  }, []);

  const handleVerMasProyectos = () => setMostrarTodosProyectos((prev) => !prev);
  const handleVerMasFormacion = () => setMostrarTodosFormacion((prev) => !prev);
  const toggleCurriculumOptions = () =>
    setShowCurriculumOptions((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        curriculumRef.current &&
        !curriculumRef.current.contains(event.target)
      ) {
        setShowCurriculumOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="Home">
      <div className="imagen-titulo">
        <img
          className="imagenperfil"
          src="/image/perfil/FraNko.png"
          alt="imagenperfil"
        />
        <a href="https://www.linkedin.com/in/francorasia/">
          <h1 className="trabajar">Disponible para trabajar</h1>
        </a>
      </div>

      <div>
        <h1 className="frankorasia">
          Hola, soy <span className="naranja">FraNko</span>
        </h1>
        <p className="descripcion">
          +2 años de Formacion.{" "}
          <span className="naranja">Full Stack Web Developer. </span>
          De Rio Cuarto, Argentina <span>🇦🇷</span>. Especializado en el
          desarrollo de aplicaciones web únicas y Responsivas.
        </p>
      </div>

      <div className="redes">
        <ul>
          <li>
            <a href="https://github.com/FraNkoRasia?tab=repositories">
              <ImGithub className="iconoGithub" /> GitHub
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/francorasia/">
              <GrLinkedin /> LinkedIn
            </a>
          </li>
          <li className="curriculum-options-container" ref={curriculumRef}>
            <button
              className="curriculum-button"
              onClick={toggleCurriculumOptions}
            >
              <MdOutlineSimCardDownload /> Curriculum
            </button>
            {showCurriculumOptions && (
              <div className="curriculum-options">
                <a
                  href="/image/CurriculumPdf/Curriculum.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver
                </a>
                <a href="/image/CurriculumPdf/Curriculum.pdf" download>
                  Descargar
                </a>
              </div>
            )}
          </li>
        </ul>
      </div>

      <h1 className="experiencia" id="proyectos">
        <FaCode />
        &nbsp;Proyectos
      </h1>
      <div className="proyectos">
        {proyectos
          .slice(0, mostrarTodosProyectos ? proyectos.length : 3)
          .map((proyecto) => (
            <div className="proyect" key={proyecto.id}>
              <img src={proyecto.imagen} alt={proyecto.titulo} />
              <div>
                <h1 className="titulo-proyecto">{proyecto.titulo}</h1>
                <p className="descripcion-proyecto">{proyecto.descripcion}</p>
                <div className="btn-code-preview">
                  {proyecto.github && (
                    <a href={proyecto.github}>
                      <button className="code">
                        <TbBrandGithub className="iconoGithub" />
                        &nbsp;GitHub
                      </button>
                    </a>
                  )}
                  {proyecto.web && (
                    <a href={proyecto.web}>
                      <button className="preview">
                        <ImLink />
                        &nbsp;Preview
                      </button>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="btn-vermas-vermenos">
        {proyectos.length > 3 && (
          <button className="ver-mas" onClick={handleVerMasProyectos}>
            {mostrarTodosProyectos
              ? "Ver menos Proyectos "
              : "Ver más Proyectos "}
            {mostrarTodosProyectos ? (
              <FaChevronUp className="ver-mas-icono" />
            ) : (
              <FaChevronDown className="ver-mas-icono" />
            )}
          </button>
        )}
      </div>

      <h1 className="formacion" id="formacion">
        <PiCertificateDuotone />
        &nbsp;Formación
      </h1>
      <div className="proyectos">
        {formacion
          .slice(0, mostrarTodosFormacion ? formacion.length : 3)
          .map((formacionItem) => (
            <div className="proyect" key={formacionItem.id}>
              <img src={formacionItem.imagen} alt={formacionItem.institucion} />
              <div>
                <h1 className="titulo-proyecto">{formacionItem.institucion}</h1>
                <p className="descripcion-proyecto">
                  {formacionItem.descripcion}
                </p>
              </div>
              <div className="btn-code-preview">
                {formacionItem.url && (
                  <a
                    href={formacionItem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="code">
                      <ImLink />
                      &nbsp;Certificado
                    </button>
                  </a>
                )}
              </div>
            </div>
          ))}
      </div>
      <div className="btn-vermas-vermenos">
        {formacion.length > 3 && (
          <button className="ver-mas" onClick={handleVerMasFormacion}>
            {mostrarTodosFormacion
              ? "Ver menos Certificados"
              : "Ver más Certificados "}
            {mostrarTodosFormacion ? (
              <FaChevronUp className="ver-mas-icono" />
            ) : (
              <FaChevronDown className="ver-mas-icono" />
            )}
          </button>
        )}
      </div>

      <h1 className="formacion" id="skills">
        <RiUserShared2Line />
        &nbsp;Skills
      </h1>
      <div className="iconos-svg">
        <IoLogoJavascript />
        <FaNode />
        <FaReact />
        <FaHtml5 />
        <FaCss3Alt />
        <RiTailwindCssFill />
        <FaFigma />
        <SiPostman />
        <FaGithub />
        <SiMysql />
        <FaTrello />
      </div>

      <h1 className="sobremititulo">
        <TbUserCheck />
        &nbsp;Sobre mi
      </h1>
      <div className="sobremi" id="sobre-mi">
        <img
          className="imagensobremi"
          src="/image/perfil/FraNko-3.png"
          alt="imagensobremi"
        />
        <div>
          <p>
            Desarrollador web especializado en la creación de soluciones
            innovadoras, funcionales y responsivas.
            <span className="naranja">
              {" "}
              Con experiencia en tecnologías como React, Node.js, MySQL, y
              diseño UX/UI con Figma.
            </span>{" "}
            Autodidacta con enfoque en el aprendizaje continuo y comprometido
            con el crecimiento colaborativo. Orientado al desarrollo de
            proyectos de alta calidad que generen un impacto positivo
          </p>
          <p></p>
        </div>
      </div>
    </div>
  );
}
