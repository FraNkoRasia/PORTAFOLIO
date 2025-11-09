import { useState, useRef, useEffect } from "react";
import { ImGithub } from "react-icons/im";
import { GrLinkedin } from "react-icons/gr";
import { MdOutlineSimCardDownload } from "react-icons/md";
import "./Header.scss";

export default function Header() {
  const [showCurriculumOptions, setShowCurriculumOptions] = useState(false);
  const curriculumRef = useRef(null);

  const toggleCurriculumOptions = () => setShowCurriculumOptions((p) => !p);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (curriculumRef.current && !curriculumRef.current.contains(e.target))
        setShowCurriculumOptions(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="imagen-titulo">
        <img
          className="imagenperfil"
          src="/image/perfil/FraNko.png"
          alt="perfil"
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
          +3 años de Formación.{" "}
          <span className="naranja">Full Stack Web Developer.</span> De Río
          Cuarto, Argentina 🇦🇷. Especializado en desarrollo de aplicaciones web
          únicas y responsivas.
        </p>
      </div>

      <div className="redes">
        <ul>
          <li>
            <a href="https://github.com/FraNkoRasia?tab=repositories">
              <ImGithub /> GitHub
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/francorasia/">
              <GrLinkedin /> LinkedIn
            </a>
          </li>
          <li className="curriculum-options-container" ref={curriculumRef}>
            <button className="curriculum-button" onClick={toggleCurriculumOptions}>
              <MdOutlineSimCardDownload /> Curriculum
            </button>
            {showCurriculumOptions && (
              <div className="curriculum-options">
                <a href="/image/CurriculumPdf/Curriculum.pdf" target="_blank" rel="noreferrer">Ver</a>
                <a href="/image/CurriculumPdf/Curriculum.pdf" download>Descargar</a>
              </div>
            )}
          </li>
        </ul>
      </div>
    </>
  );
}
