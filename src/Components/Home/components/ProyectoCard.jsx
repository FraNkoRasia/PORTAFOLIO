import { ImLink } from "react-icons/im";
import { TbBrandGithub } from "react-icons/tb";
import "../../Home/Home.scss";

export default function ProyectoCard({ proyecto, abrirModal }) {
  const imagenes = proyecto.imagenes || (proyecto.imagen ? [proyecto.imagen] : []);
  const imagenPrincipal = imagenes[0];
  const tieneMultiplesImagenes = imagenes.length > 1;

  return (
    <div className="proyect" key={proyecto.id}>
      <div
        className="imagen-proyecto-contenedor"
        onClick={() => abrirModal(proyecto)}
      >
        {imagenPrincipal && <img src={imagenPrincipal} alt={proyecto.titulo} className="imagen-proyecto" />}
        {tieneMultiplesImagenes && (
          <div className="badge-multiples-imagenes">{imagenes.length} imágenes</div>
        )}
      </div>

      <div>
        <h1 className="titulo-proyecto">{proyecto.titulo}</h1>
        <p className="descripcion-proyecto">{proyecto.descripcion}</p>
        <div className="btn-code-preview">
          {proyecto.github && (
            <a href={proyecto.github}><button className="code"><TbBrandGithub /> GitHub</button></a>
          )}
          {proyecto.web && (
            <a href={proyecto.web}><button className="preview"><ImLink /> Preview</button></a>
          )}
        </div>
      </div>
    </div>
  );
}
