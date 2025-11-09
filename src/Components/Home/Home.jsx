import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Proyectos from "./components/Proyectos/Proyectos";
import Formacion from "./components/Formacion/Formacion";
import Skills from "./components/Skills/Skills";
import SobreMi from "./components/SobreMi/SobreMi";
import "./Home.scss";

export default function Home() {
  const API_URL = "https://fake-api-json.vercel.app/";
  const [proyectos, setProyectos] = useState([]);
  const [formacion, setFormacion] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}proyectos`)
      .then((res) => res.json())
      .then((data) => setProyectos(data.reverse()))
      .catch((err) => console.error("Error fetching proyectos:", err));

    fetch(`${API_URL}formacion`)
      .then((res) => res.json())
      .then((data) => setFormacion(data.reverse()))
      .catch((err) => console.error("Error fetching formacion:", err));
  }, []);

  return (
    <div className="Home">
      <Header />
      <Proyectos proyectos={proyectos} />
      <Formacion formacion={formacion} />
      <Skills />
      <SobreMi />
    </div>
  );
}
