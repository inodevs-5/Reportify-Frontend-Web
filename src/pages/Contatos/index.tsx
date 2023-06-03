import React from 'react';
import Menu from "../../components/menus";
import "../../styles/global.css";
import "./contatos.css"


function Contatos() {
  const conversas = [
    { id: 1, titulo: 'Conversa 1', ultimaMensagem: 'Última mensagem da conversa 1' },
    { id: 2, titulo: 'Conversa 2', ultimaMensagem: 'Última mensagem da conversa 2' },
    { id: 3, titulo: 'Conversa 3', ultimaMensagem: 'Última mensagem da conversa 3' },
  ];

  return (
    <><div className="flex flex-wrap flex-row">
      <Menu></Menu>
      <div id="conteudo" className="mt-16  bg-white flex-1">
        <div className="p-10 flex flex-col">
          <h1 id="alinhatitulo" >Meus Chats</h1>
        </div>
      </div>
    </div><div id="conteudo2">

        {conversas.map((conversa) => (
          <div id = "mensagens" key={conversa.id}>
           <a href = "../Chat"><h2 >{conversa.titulo}</h2></a>
            <p>{conversa.ultimaMensagem}</p>
            <hr /> {/* Linha separando as conversas */}
          </div>
        ))}
      </div></>
      
    
  );
}

export default Contatos;