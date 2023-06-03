import Menu from "../../components/menus";
import { useState, useEffect } from "react";
import api from '../../services/api';
import { useAuth } from '../../contexts/auth';
import "./notificacoes.css";

function Notificacoes () {
  const { usuario } = useAuth();

  //Inicio da lógica para as notificações:
  const [loading, setLoading] = useState(true);
  const [notificacoes, setNotificacoes] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get('/usuario/' + usuario._id);
        console.log(response.data)
        setNotificacoes(response.data.notificacoes);
        setLoading(false)
      } catch (response) {
        console.log(response.data.msg);
      }
    })();
  }, []);

  return (
    <>
      <div className="flex flex-wrap flex-row">
        <Menu></Menu>
        <div id="conteudo" className="mt-16  bg-white flex-1 ">
          <div className="p-10 flex  flex-col">
            <h1 id="alinhatitulonot">Notificações</h1>
          </div>
        </div>
      </div>
      {notificacoes && !loading && notificacoes.length < 1 && <div>Não há nenhuma notificação</div>}
      <div id="conteudo2">
        {notificacoes && notificacoes.map((notification, index) => (
          <div id="notificacoes" key={index}>
            <h2>{notification.mensagem}</h2>
            <h2>{notification.data.toLocaleString()}</h2>
          </div>
        ))}
      </div>
    </>
  );
}

export default Notificacoes