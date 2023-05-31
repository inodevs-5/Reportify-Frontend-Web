import React from 'react';
import './Chat.css';
import Menu from "../../components/menus";

const Chat: React.FC = () => {
  const messages = [
    { content: 'Olá!', sender: 'user' },
    { content: 'Olá! Como posso ajudar?', sender: 'bot' },
    { content: 'Estou com um problema no meu pedido.', sender: 'user' },
    { content: 'Qual é o problema? Posso te ajudar.', sender: 'bot' },
  ];

  return (

    <><div className="flex flex-wrap flex-row">
          <Menu></Menu>
          <div id="conteudo" className="mt-16  bg-white flex-1 ">
              <div className="p-10 flex items-center flex-col">
                  <h1>Chat</h1>
              </div>
          </div>
      </div>
      <div id="conteudo2">
        <div className="chat-container">
              {messages.map((message, index) => (
                  <div
                      key={index}
                      className={`message ${message.sender === 'user' ? 'user' : 'bot'}`}
                  >
                      {message.content}
                  </div>
              ))}
          </div></div></>
  );
};

export default Chat;