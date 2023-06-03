import React, { useState } from 'react';
import './chat.css';
import Menu from "../../components/menus";

const Chat: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([
    { content: 'Olá!', sender: 'user' },
    { content: 'Olá! Como posso ajudar?', sender: 'bot' },
    { content: 'Estou com um problema no meu pedido.', sender: 'user' },
    { content: 'Qual é o problema? Posso te ajudar.', sender: 'bot' },
  ]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleSendMessage = () => {
    if (inputText.trim() !== '') {
      const newMessage = { content: inputText, sender: 'user' };
      setMessages([...messages, newMessage]);
      setInputText('');
    }
  };

  
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (

    <><div className="flex flex-wrap flex-row">
          <Menu></Menu>
          <div id="conteudo" className="mt-16  bg-white flex-1 ">
              <div className="p-10 flex flex-col">
                  <h1 id="alinhatitulo" >Chat</h1>
              </div>
          </div>
      </div>

      <div id="conteudo2">
        <div className="chat-container">
         <div className="messages-container">
              {messages.map((message: { sender: string; content: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }, index: React.Key | null | undefined) => (
                  <div
                      key={index}
                      className={`message ${message.sender === 'user' ? 'user' : 'bot'}`}
                  >
                      {message.content}
                  </div>
              ))}
          </div>
          <div className="input-container">
            <input
              type="text"
              placeholder="Digite sua mensagem..."
              value={inputText}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
            <button onClick={handleSendMessage}>Enviar</button>
         </div>
       </div>
      </div>
    </>
  );
};

export default Chat;