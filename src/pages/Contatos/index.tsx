import React, { useEffect, useState } from 'react';
import Menu from "../../components/menus";
import "../../styles/global.css";
import "./contatos.css"
import { Link, useNavigate } from 'react-router-dom';
import LoaderRo from '../../components/loader/loaderRo';
import { useAuth } from '../../contexts/auth';
import api from '../../services/api';


function Contatos() {

  const { usuario } = useAuth();
  const [errorMessage, setErrorMessage] = useState(null);
  const navigation = useNavigate()
  const [myRos, setMyRos] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
         if (usuario.perfil == "admin") {
          const response = await api.get('/ro/atribuido/' + usuario._id);
          setMyRos(response.data);
      }else{
        const response2 = await api.get('/ro/relator/' + usuario._id);
        setMyRos(response2.data);
        console.log(response2.data)
      }
    } catch (response) {
      setErrorMessage(response.data.msg);
    }
    setLoading(false);
  })();
  }, []);

  function handlePress(destinatario:string): void {
    navigation('/Chat/' + destinatario)
  }

  function esperar () : void {
    alert("Ainda nao há um colaborador")
  }

  function error () : void {
    alert("Não é possivel acessar esse Chat")
  }
  
  return (
    <>
    <div className="flex flex-wrap flex-row">
      <Menu></Menu>
      <div id="conteudo" className="mt-16  bg-white flex-1">
        <div className="p-10 flex flex-col">
          <h1 className="text-xl text-black font-semibold text-center">Meus Chats</h1>
        </div>
      </div>
    </div>
    
    <div id="conteudo2">

    {  usuario.perfil == 'admin' ? (
      <>
        {myRos && !loading ? myRos.map((ro) => (
          <div id = "mensagens" key={ro._id}>
            <div className='flex flex-row cursor-pointer' onClick={() => { ro.relator.id ?  handlePress(ro.relator.id._id) : error()}}>
              <div>
                <div className="bg-blue-700 px-5 py-3 rounded-full mr-2 mb-2">
                  <p className='font-bold text-white'>{ro.relator.id ? ro.relator.id.nome.charAt(0).toUpperCase() : "N"}</p>
                </div>
              </div>
              <div>
                <h2 className="font-bold">{ ro.relator.id ? ro.relator.id.nome : "Não é possivel acessar"}</h2>
                <p>{ro.tituloOcorrencia}</p>
              </div>
            </div>
            <hr /> {/* Linha separando as conversas */}
          </div>
        )) : (
          <div className="flex justify-center">
            <LoaderRo />
          </div>
        )}
      </>
        ) : (
          <>
          {myRos && !loading ? myRos.map((ro) => (
          <div id = "mensagens" key={ro._id}>
            <div className='flex flex-row' onClick={() => { ro.suporte  && ro.suporte.colaboradorIACIT.id ?  handlePress(ro.suporte.colaboradorIACIT.id._id) : esperar()}}>
              <div>
                <div className="bg-blue-700 px-5 py-3 rounded-full mr-2 mb-2">
                  <p className='font-bold text-white text-center'>{ro.suporte && ro.suporte.colaboradorIACIT.id ? ro.suporte.colaboradorIACIT.id.nome.charAt(0).toUpperCase() : "N"}</p>
                </div>
              </div>
              <div>
                <h2 className="font-bold">{ ro.suporte  && ro.suporte.colaboradorIACIT.id ? ro.suporte.colaboradorIACIT.id.nome : "Colaborador não está disponível"}</h2>
                <p>{ro.tituloOcorrencia}</p>
              </div>
            </div>
            <hr /> {/* Linha separando as conversas */}
          </div>
          )) : (
            <div className="flex justify-center">
              <LoaderRo />
            </div>
          )}
          </>
        )
        
      }
      </div>
    </>
  );
}

export default Contatos;