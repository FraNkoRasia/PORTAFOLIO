import { RiUserShared2Line } from "react-icons/ri";
import { IoLogoJavascript } from "react-icons/io5";
import { FaNode, FaReact, FaHtml5, FaCss3Alt, FaFigma, FaGithub } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import { SiPostman, SiMysql } from "react-icons/si";
import "./Skills.scss";

export default function Skills() {
  return (
    <>
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
      </div>
    </>
  );
}
