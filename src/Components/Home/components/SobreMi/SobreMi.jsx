import { TbUserCheck } from "react-icons/tb";
import "./SobreMi.scss";

export default function SobreMi() {
  return (
    <>
      <h1 className="sobremititulo" id="sobre-mi">
        <TbUserCheck />
        &nbsp;Sobre mí
      </h1>

      <div className="sobremi">
        <img
          className="imagensobremi"
          src="/image/perfil/FraNko-3.png"
          alt="FraNko Rasia"
        />

        <div>
          <p>
            Desarrollador web especializado en soluciones modernas y responsivas.
            <span className="naranja">
              {" "}Experiencia con React, TypeScript, JavaScript, Node.js y MySQL.
            </span>{" "}
            Autodidacta, orientado al aprendizaje continuo y al desarrollo de
            proyectos funcionales y de calidad.
          </p>
        </div>
      </div>
    </>
  );
}
