import React from 'react';
import Menu from "../../components/menus";
//import "../../styles/global.css";
import { useState } from "react";
import "./notificacoes.css";

interface Notification {
  title: string;
  
  datetime: Date;
}

const notifications: Notification[] = [
  { title: 'Mensagem recebida', datetime: new Date() },
  { title: 'Atualização de RO 01',  datetime: new Date() },
  { title: 'Mensagem recebida',  datetime: new Date() },
 
];

const Notificacao: React.FC = () => {
  return (
    <><div className="flex flex-wrap flex-row">
      <Menu></Menu>
      <div id="conteudo" className="mt-16  bg-white flex-1 ">
        <div className="p-10 flex items-center flex-col">
          <h1>Notificações</h1>
        </div>
      </div>
    </div><div id="conteudo2">

        {notifications.map((notification, index) => (
          <div id="notificacoes" key={index}>
            <h2>{notification.title}</h2>
            <p>{notification.datetime.toLocaleString()}</p>
            {index !== notifications.length - 1 && <hr />}
          </div>
        ))}
      </div></>
  );
};

export default Notificacao;
