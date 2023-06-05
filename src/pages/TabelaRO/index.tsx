import Menu from "../../components/menus";
import "../../styles/global.css";
import Tabela from "../../components/TabelaAdmin";


function TabelaRo() {


    return(
      <div className="flex flex-wrap flex-row">
      <Menu />
      <Tabela/>
      </div>
        )
}export default TabelaRo