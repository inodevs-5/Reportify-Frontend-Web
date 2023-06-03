import { useEffect, useRef, useState } from "react";
import "../../styles/global.css";
import "./tabela.css"
import api from "../../services/api";
import Loader_preto from "../loader/loaderpreto";
import { FaEdit } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { SlClose } from "react-icons/sl";
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
    const [esconde, setEsconde] = useState(true);
    const inputRef = useRef(null);



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

  async function cancel () {
    setLoading(true)
    setInput('');
    try{
      if (usuario.perfil == "admin") {
        const response = await api.get('/ro');
        setAllRos(response.data);

        const response2 = await api.get('/ro/atribuido/' + usuario._id);
        setMyRos(response2.data);

        if (selectedFirstButton) {
          setRos(response.data);
        } else {
          setRos(response2.data)
        }
      } else {
        setSelectedFirstButton(false);
        const response = await api.get('/ro/relator/' + usuario._id);
        setRos(response.data);
      }
    } catch (response) {
      setErrorMessage(response.data.msg);
    }
    setLoading(false)
    setEsconde(!esconde)
    
  }

  async function pesquisar() {
    setLoading(true)
    try {
      if (usuario.perfil == "admin") {
          const response = await api.get('/ro/search/' + input);
          setAllRos(response.data);
          const response2 = await api.get('/ro/atribuido/search/' + usuario._id + '/' + input);
          setMyRos(response2.data)
          if (selectedFirstButton) {
            setRos(response.data);
          } else {
            setRos(response2.data);
          }
      } else {
        const response = await api.get('/ro/relator/search/' + usuario._id + '/' + input);

        if (response.data) {
          setRos(response.data)
        }
      }
    } catch (response) {
      setErrorMessage(response.data.msg);
    }
    setEsconde(!esconde)
    setLoading(false)
    
  }

  function changeToAll() {
    setSelectedFirstButton(!selectedFirstButton)
    setSelectedSecondButton(!selectedSecondButton)
  }
  function escondebusca() {
    setEsconde(!esconde)
  }

  function changeToMyTasks() {
    setSelectedFirstButton(!selectedFirstButton)
    setSelectedSecondButton(!selectedSecondButton)
  }




    return(
      <div id="conteusdo" className="mt-16 w-full flex ">
        <div className="flex p-10 w-full items-center  flex-col">
        { 
          selectedSecondButton && usuario.nivel === "admin" ?
          <>
              <h1 className='text-3xl my-2 font-black'>Ros</h1>
          </> :
          <>
          <h1 className='text-3xl my-2 font-black'>Meus Ros</h1>
          </>
           }
        <div className="flex flex-row w-full">
          <input type="text"  onChange={(event) => setInput(event.target.value)}
        className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow" />
        <div className="flex">
        { 
          esconde ? 
            <button onClick={pesquisar}><FaSearch size={30}/></button> 
          :  <button onClick={cancel}><SlClose size={30}/></button> 
          }
         <div>
      </div>
      {/* <h1 className="text-5xl text-red-900">{errorMessage &&  errorMessage }</h1> */}
        </div>
          </div>
          {  
         usuario.perfil == 'admin' ?
          <>
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
                  <th className="border border-slate-700">Relator</th>
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
       myRos && !loading ?  <>
       {   myRos.length == 0 ? 
      
       <h1 className="text-3xl text-red-800 font-black ">
        {usuario.nome} você não posssui ros atribuidos
       </h1> :
        <table className="w-full   md:table-fixed table-fixed ">
    <thead>
      <tr className="text-center border border-slate-600 bg-gradient-to-r from-zinc-800 to-zinc-700 text-gray-50  text-xl">
        <th className="border border-slate-700">ID</th>
        <th className="border border-slate-700">Título</th>
        <th className="border border-slate-700">Status</th>
        <th className="border border-slate-700">Colaborador</th>
        <th className="border border-slate-700">Relator</th>
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
        }</> : (
        <>
      <Loader_preto/>
        </>
      )
    
    }</> : ""
    

    
    }
     </div>
     <div className="w-full h-16 flex  justify-center items-center ">
          <div className="justify-around items-center flex w-3/5">
            <button className={ 
              selectedFirstButton ? "hover:ring-blue-400 hover:from-blue-700 hover:to-blue-400 bg-gradient-to-r  from-blue-400 to-blue-700    ring-offset-0 font-black  ring ring-blue-400 outline-none   text-white text-xl  rounded-xl cursor-pointer" 
              : "bg-gradient-to-r  from-blue-800 to-zinc-700    ring-offset-0 font-black  ring ring-blue-800 outline-none   text-white text-xl  rounded-xl"}
            onClick={changeToAll}
            disabled={selectedSecondButton}
            >
              <p className="p-2">Todos Registros</p>
            </button>
            <button className={ selectedSecondButton ? "hover:ring-blue-400 hover:from-blue-400 hover:to-blue-700 bg-gradient-to-r  from-blue-700 to-blue-400    ring-offset-currentfont-black  ring ring-blue-400 outline-none   text-white text-xl  rounded-xl cursor-pointer"
          :  "bg-gradient-to-r  from-blue-800 to-zinc-700    ring-offset-0 font-black  ring ring-blue-800 outline-none   text-white text-xl  rounded-xl" 
          }
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
         <div className="flex w-full max-h-80  rounded-xl overflow-auto border-y border-slate-600 shadow-xl my-2 justify-center">
          { ros && !loading ?
          <> { ros.length == 0 ?  <h1 className="text-3xl text-red-800 font-black ">
          {usuario.nome} você não posssui ros atribuidos
         </h1> :
                  
                  <table className="w-full   md:table-fixed table-fixed ">
              <thead>
                <tr className="text-center border border-slate-600 bg-gradient-to-r from-zinc-800 to-zinc-700 text-gray-50  text-xl">
                  <th className="border border-slate-700">ID</th>
                  <th className="border border-slate-700">Título</th>
                  <th className="border border-slate-700">Status</th>
                  <th className="border border-slate-700">Colaborador</th>
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
                }  </> : (
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