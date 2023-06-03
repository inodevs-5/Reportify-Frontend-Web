import React from 'react';
import Menu from "../../components/menus";
import "../../styles/global.css";
import "./contatos.css"


function Contatos() {
  const conversas = [
    { id: 1, nome: 'Pessoa 1', titulo: 'RO1' },
    { id: 2, nome: 'Pessoa 2', titulo: 'RO2' },
    { id: 3, nome: 'Pessoa 3', titulo: 'RO3' },
  ];

  return (
    <><div className="flex flex-wrap flex-row">
      <Menu></Menu>
      <div id="conteudo" className="mt-16  bg-white flex-1">
        <div className="p-10 flex flex-col">
          <h1 id="alinhatitulocontatos" >Meus Chats</h1>
          
        </div>
      </div>
    </div><div id="conteudo2">

        {conversas.map((conversa) => (
          <div id = "mensagens" key={conversa.id}>
           <a href = "../Chat"><h2 >{conversa.nome}</h2></a>
            <p>{conversa.titulo}</p>
            <hr /> {/* Linha separando as conversas */}
          </div>
        ))}
      </div></>
      
    
  );
}

export default Contatos;