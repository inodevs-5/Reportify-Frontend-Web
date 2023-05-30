import { useEffect, useState } from "react";
import "../../styles/global.css";
import "./tabela.css"
import api from "../../services/api";
import Loader_preto from "../loader/loaderpreto";
import { FaEdit } from "react-icons/fa";
import { useAuth } from "../../contexts/auth";




function Tabela() {
    const { usuario } = useAuth();
    const [input, setInput] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [ros, setRos] = useState();
    const [allRos, setAllRos] = useState();
    const [myRos, setMyRos] = useState();
    const [loading, setLoading] = useState(true);
    const [selectedFirstButton, setSelectedFirstButton] = useState(false);
    const [selectedSecondButton, setSelectedSecondButton] = useState(true);
    const [inputFocus, setInputFocus] = useState(false);



useEffect(() => {
    (async () => {
      try {
        if (usuario.perfil == "admin") {
          const response = await api.get('/ro');
          setAllRos(response.data);
          const response2 = await api.get('/ro/atribuido/' + usuario._id);
          setMyRos(response2.data);
        } else {
          const response = await api.get('/ro/relator/' + usuario._id);
          setRos(response.data);
        }

      } catch (response) {
        setErrorMessage(response.data.msg);
      }

      setLoading(false);
    })();
  }, []);


  function changeToAll() {
    setSelectedFirstButton(!selectedFirstButton)
    setSelectedSecondButton(!selectedSecondButton)
  }

  function changeToMyTasks() {
    setSelectedFirstButton(!selectedFirstButton)
    setSelectedSecondButton(!selectedSecondButton)
  }

    return(
      <div id="conteusdo" className="mt-16 w-full flex ">
        <div className="flex p-10 w-full items-center  flex-col">
          {  
         usuario.perfil == 'admin' ?
          <>
          { 
          selectedSecondButton ?
          <>
              <h1 className='text-3xl my-2 font-black'>Ros</h1>
          </> :
          <>
          <h1 className='text-3xl my-2 font-black'>Meus Ros</h1>
          </>
                  }
                  <div className="flex w-full max-h-80  rounded-xl overflow-auto border-y border-slate-600 shadow-xl my-2 justify-center">
              { selectedSecondButton ? <>    
                { allRos && !loading ?(
                  
                  <table className="w-full   md:table-fixed table-fixed ">
              <thead>
                <tr className="text-center border border-slate-600 bg-gradient-to-r from-zinc-800 to-zinc-700 text-gray-50  text-xl">
                  <th className="border border-slate-700">ID</th>
                  <th className="border border-slate-700">Título</th>
                  <th className="border border-slate-700">Status</th>
                  <th className="border border-slate-700">Colaborador</th>
                  <th className="border border-slate-700">Responsavel</th>
                  <th className="border border-slate-700">Editar</th>
                </tr>
              </thead>
              <tbody >
                {allRos.map((ro , i)=> (
                  <tr className={i % 2 === 0 ? 'bg-gray-200' : 'bg-white'} key={ro._id}>
                  <td className="border border-slate-700 tex p-1">
                    <div className="flex justify-center">
                    <div className="flex text-white text-lg  bg-gradient-to-r from-zinc-800 to-zinc-700 rounded-3xl w-2/5 justify-center"> 
                      {ro._id}
                    </div>
                    </div>
                    
                    </td>
                  <td className="border border-slate-700 p-1 text-center">{ro.tituloOcorrencia.charAt(0).toUpperCase()+ ro.tituloOcorrencia.slice(1)}</td>
                  <td className="border border-slate-700 p-1  text-center">
                    <div className="flex justify-center">
                    <div className={
                      ro.suporte ? 
                      ro.suporte.fase == "concluido" ?
                      "bg-green-500 rounded-xl w-3/4 " : 
                      ro.suporte ? 
                      ro.suporte.fase == "validacao" ? 
                      "bg-yellow-400 rounded-xl w-3/4 " : "bg-slate-300 rounded-xl w-3/4" : 
                      ""
                      : "bg-slate-300 rounded-xl w-3/4" }>
                    {ro.suporte ? ro.suporte.fase.charAt(0).toUpperCase() + ro.suporte.fase.slice(1) : "Pendente" }
                    </div>
                    </div>
                    </td>
                  <td className="border border-slate-700 p-1">
                    <div className="flex justify-center text-center">
                    <div className={ro.suporte && ro.suporte.colaboradorIACIT && ro.suporte.colaboradorIACIT.id ? "bg-primary text-white rounded-xl w-3/4" : "bg-slate-300 rounded-xl w-3/4"}>
                      {ro.suporte && ro.suporte.colaboradorIACIT && ro.suporte.colaboradorIACIT.id ? ro.suporte.colaboradorIACIT.id.nome : "A definir"}
                      </div>
                      </div>
                      </td>
                  <td className="border border-slate-700 p-1 text-center ">{ro.relator.id ? ro.relator.id.nome.charAt(0).toUpperCase() + ro.relator.id.nome.slice(1) : "N/A"}</td>
                  <td className="border border-slate-700 p-1">
                    <div className="flex w-full items-center justify-center ">
                      <button  className="curso-pointer p-2 ">
                        <FaEdit size={24}/>
                      </button>
                    </div>
                      </td>
                </tr>
                ))}
                </tbody>
                  </table>
                  ) : (
                  <>
                <Loader_preto/>
                  </>
                )
              
              }</> : ""  }
     { selectedFirstButton ? <>
     {        
       myRos && !loading ?(
        
        <table className="w-full   md:table-fixed table-fixed ">
    <thead>
      <tr className="text-center border border-slate-600 bg-gradient-to-r from-zinc-800 to-zinc-700 text-gray-50  text-xl">
        <th className="border border-slate-700">ID</th>
        <th className="border border-slate-700">Título</th>
        <th className="border border-slate-700">Status</th>
        <th className="border border-slate-700">Colaborador</th>
        <th className="border border-slate-700">Responsavel</th>
        <th className="border border-slate-700">Editar</th>
      </tr>
    </thead>
    <tbody >
       {
       myRos.map((ro , i)=> (
        <tr className={i % 2 === 0 ? 'bg-gray-200' : 'bg-white'} key={ro._id}>
        <td className="border border-slate-700 tex p-1">
          <div className="flex justify-center">
          <div className="flex text-white text-lg  bg-gradient-to-r from-zinc-800 to-zinc-700 rounded-3xl w-2/5 justify-center"> 
            {ro._id}
          </div>
          </div>
          
          </td>
        <td className="border border-slate-700 p-1 text-center">{ro.tituloOcorrencia.charAt(0).toUpperCase()+ ro.tituloOcorrencia.slice(1)}</td>
        <td className="border border-slate-700 p-1  text-center">
          <div className="flex justify-center">
          <div className={
            ro.suporte ? 
            ro.suporte.fase == "concluido" ?
            "bg-green-500 rounded-xl w-3/4 " : 
            ro.suporte ? 
            ro.suporte.fase == "validacao" ? 
            "bg-yellow-400 rounded-xl w-3/4 " : "bg-slate-300 rounded-xl w-3/4" : 
            ""
            : "bg-slate-300 rounded-xl w-3/4" }>
          {ro.suporte ? ro.suporte.fase.charAt(0).toUpperCase() + ro.suporte.fase.slice(1) : "Pendente" }
          </div>
          </div>
          </td>
        <td className="border border-slate-700 p-1">
          <div className="flex justify-center text-center">
          <div className={ro.suporte && ro.suporte.colaboradorIACIT && ro.suporte.colaboradorIACIT.id ? "bg-primary text-white rounded-xl w-3/4" : "bg-slate-300 rounded-xl w-3/4"}>
            {ro.suporte && ro.suporte.colaboradorIACIT && ro.suporte.colaboradorIACIT.id ? ro.suporte.colaboradorIACIT.id.nome : "A definir"}
            </div>
            </div>
            </td>
        <td className="border border-slate-700 p-1 text-center ">{ro.responsavel ? ro.responsavel.nome.charAt(0).toUpperCase() + ro.responsavel.nome.slice(1) : "a"}</td>
        <td className="border border-slate-700 p-1">
          <div className="flex w-full items-center justify-center ">
            <button  className="curso-pointer p-2 ">
              <FaEdit size={24}/>
            </button>
          </div>
            </td>
      </tr>
      ))}
      </tbody>
        </table>
        ) : (
        <>
      <Loader_preto/>
        </>
      )
    
    }</> : ""
    

    
    }
     </div>
     <div className="w-full h-16 flex  justify-center items-center ">
          <div className="justify-around items-center flex w-3/5">
            <button className='
            hover:ring-blue-400 
            hover:from-blue-700 
            hover:to-blue-400 
            bg-gradient-to-r  
            from-blue-400 
            to-blue-700    
            ring-offset-0 
            font-black  
            ring ring-blue-400 
            outline-none   
            text-white text-xl  
            rounded-xl 
            cursor-pointer'
            onClick={changeToAll}
            disabled={selectedSecondButton}
            >
              <p className="p-2">Todos Registros</p>
            </button>
            <button className="
            hover:ring-blue-400 
            hover:from-blue-400 
            hover:to-blue-700 
            bg-gradient-to-r  
            from-blue-700 
            to-blue-400    
            ring-offset-current
            font-black  
            ring ring-blue-400 
            outline-none   
            text-white text-xl  
            rounded-xl 
            cursor-pointer"
            disabled={selectedFirstButton}
            
            onClick={changeToMyTasks}
            >
              <p className="p-2">Minhas Tasks</p>
            </button> 
          </div>
      </div>
     </>
      :
     <>
     <h1 className="text-3xl my-2 font-black">Meus Ro</h1>
         <div className="flex w-full max-h-80  rounded-xl overflow-auto border-y border-slate-600 shadow-xl my-2 justify-center">
          { ros && !loading ?(
                  
                  <table className="w-full   md:table-fixed table-fixed ">
              <thead>
                <tr className="text-center border border-slate-600 bg-gradient-to-r from-zinc-800 to-zinc-700 text-gray-50  text-xl">
                  <th className="border border-slate-700">ID</th>
                  <th className="border border-slate-700">Título</th>
                  <th className="border border-slate-700">Status</th>
                  <th className="border border-slate-700">Colaborador</th>
                  <th className="border border-slate-700">Responsavel</th>
                  <th className="border border-slate-700">Editar</th>
                </tr>
              </thead>
              <tbody >
                {ros.map((ro , i)=> (
                  <tr className={i % 2 === 0 ? 'bg-gray-200' : 'bg-white'} key={ro._id}>
                  <td className="border border-slate-700 tex p-1">
                    <div className="flex justify-center">
                    <div className="flex text-white text-lg  bg-gradient-to-r from-zinc-800 to-zinc-700 rounded-3xl w-2/5 justify-center"> 
                      {ro._id}
                    </div>
                    </div>
                    
                    </td>
                  <td className="border border-slate-700 p-1 text-center">{ro.tituloOcorrencia.charAt(0).toUpperCase()+ ro.tituloOcorrencia.slice(1)}</td>
                  <td className="border border-slate-700 p-1  text-center">
                    <div className="flex justify-center">
                    <div className={
                      ro.suporte ? 
                      ro.suporte.fase == "concluido" ?
                      "bg-green-500 rounded-xl w-3/4 " : 
                      ro.suporte ? 
                      ro.suporte.fase == "validacao" ? 
                      "bg-yellow-400 rounded-xl w-3/4 " : "bg-slate-300 rounded-xl w-3/4" : 
                      ""
                      : "bg-slate-300 rounded-xl w-3/4" }>
                    {ro.suporte ? ro.suporte.fase.charAt(0).toUpperCase() + ro.suporte.fase.slice(1) : "Pendente" }
                    </div>
                    </div>
                    </td>
                  <td className="border border-slate-700 p-1">
                    <div className="flex justify-center text-center">
                    <div className={ro.suporte && ro.suporte.colaboradorIACIT && ro.suporte.colaboradorIACIT.id ? "bg-primary text-white rounded-xl w-3/4" : "bg-slate-300 rounded-xl w-3/4"}>
                      {ro.suporte && ro.suporte.colaboradorIACIT && ro.suporte.colaboradorIACIT.id ? ro.suporte.colaboradorIACIT.id.nome : "A definir"}
                      </div>
                      </div>
                      </td>
                  <td className="border border-slate-700 p-1 text-center ">{ro.relator.id ? ro.relator.id.nome.charAt(0).toUpperCase() + ro.relator.id.nome.slice(1) : "N/A"}</td>
                  <td className="border border-slate-700 p-1">
                    <div className="flex w-full items-center justify-center ">
                      <button  className="curso-pointer p-2 ">
                        <FaEdit size={24}/>
                      </button>
                    </div>
                      </td>
                </tr>
                ))}
                </tbody>
                  </table>
                  ) : (
                  <>
                <Loader_preto/>
                  </>
                )
              
              }

         </div>
     </>
}



     
        
      
        </div>   
    </div>
        )
}export default Tabela