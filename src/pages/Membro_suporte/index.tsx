import Menu from "../../components/menus";
import "../../styles/global.css";
// import { useState } from "react";


function MembroSuporte() {

  return (
    <div className="flex flex-wrap flex-row">
      <Menu></Menu>
      <div id="conteudo" className="mt-16  bg-white flex-1 ">
        <div className="p-10 flex items-center flex-col">
        <h1>Membros Suporte</h1>

        </div>
    </div>
    </div>
  );
};


export default MembroSuporte