import Menu from "../../components/menus";
import "../../styles/global.css";

function TabelaRo() {
    return(
        <div className="flex flex-wrap flex-row">
      <Menu></Menu>
      <div id="conteudo" className="mt-16  bg-white flex-1 ">
        <div className="p-10 flex items-center flex-col">
        <h1 className="text-xl text-black  font-semibold">
          Registro de Ocorrência
          </h1>
          <p></p>
        </div>
    </div>
    </div>
        )
}export default TabelaRo