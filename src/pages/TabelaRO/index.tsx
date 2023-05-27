import { useEffect, useState } from "react";
import Menu from "../../components/menus";
import "../../styles/global.css";
import api from "../../services/api";
import Loader_preto from "../../components/loader/loaderpreto";
import { FaEdit } from "react-icons/fa";




function TabelaRo() {

  useEffect(() => {
      ( async () => {
        try {
          const response = await api.get('/ro');
          setAllRos(response.data);
    }catch (response) {
      setErrorMessage(response.data.msg);
    }
      
    setLoading(false);
  })();
  },[])


const [allRos, setAllRos] = useState();
const [errorMessage, setErrorMessage] = useState(null);
const [loading, setLoading] = useState(false);


    return(
      <div className="flex flex-wrap flex-row">
      <Menu></Menu>
      <div id="conteusdo" className="mt-16 w-full flex ">
        <div className="flex p-10 w-full items-center  flex-col">
        <h1 className='text-3xl my-2 font-black'>Meus Ros</h1>
        <div className="flex w-full  my-2 justify-center">
        {        
       allRos && !loading ?(
        
        <table className="w-full  md:table-fixed table-fixed ">
    <thead>
      <tr  className="text-left border border-slate-600 bg-gradient-to-r from-zinc-800 to-zinc-500 text-gray-50  text-2xl">
        <th className="border border-slate-700">ID</th>
        <th className="border border-slate-700">Título</th>
        <th className="border border-slate-700">Status</th>
        <th className="border border-slate-700">Categoria</th>
        <th className="border border-slate-700">Relator</th>
        <th className="border border-slate-700">Editar</th>
      </tr>
    </thead>
    <tbody >
       {allRos.map((ro , i)=> (
        <tr className={i % 2 === 0 ? 'bg-gray-200' : 'bg-white'} key={ro._id}>
        <td className="border border-slate-700 p-1">{ro._id}</td>
        <td className="border border-slate-700 p-1">{ro.tituloOcorrencia}</td>
        <td className="border border-slate-700 p-1">{ro.suporte ? ro.suporte.fase : "Pendente"}</td>
        <td className="border border-slate-700 p-1">{ro.suporte && ro.suporte.colaboradorIACIT && ro.suporte.colaboradorIACIT.id ? ro.suporte.colaboradorIACIT.id.nome : "A definir"}</td>
        <td className="border border-slate-700 p-1">{ro.suporte && ro.suporte.categoria ? ro.suporte.categoria : "A definir"}</td>
        <td className="border border-slate-700 p-1"><div className="flex w-full items-center justify-center"><button  className="curso-pointer p-2"><FaEdit size={24}/></button></div></td>
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
        </div>   
    </div>
    </div>
        )
}export default TabelaRo