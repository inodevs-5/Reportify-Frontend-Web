import { useEffect, useState } from "react";
import Menu from "../../components/menus";
import "./style.css"
import { FaEdit } from "react-icons/fa";
import "../../styles/global.css";
import { useAuth } from "../../contexts/auth";
import api from "../../services/api";
import Loader_preto from '../../components/loader/loaderpreto';
// import { FaPaintBrush } from "react-icons/fa";
// import { useState } from "react";


function Home() {

  const { usuario, signOut } = useAuth();
  // const {height} = Dimensions.get('screen')
  const [usuarios, setUsuarios] = useState()
  const [errorMessage, setErrorMessage] = useState(null);
  // const navigation = useNavigation<propsStack>()
  const [input, setInput] = useState('');
  const [ros, setRos] = useState();
  const [myRos, setMyRos] = useState();
  const [allRos, setAllRos] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
         if (usuario.perfil == "admin") {
          const response = await api.get('/ro/atribuido/' + usuario._id);
          setMyRos(response.data);
        setLoading(false);
      }else{
        const response2 = await api.get('/ro/relator/' + usuario._id);
        console.log(response2.data[0].relator.id._id)
        setRos(response2.data);
      }
      setLoading(false);
    } catch (response) {
      setErrorMessage(response.data.msg);
    }
    
  })();
  }, []);


  

  return (
    <div className="flex flex-wrap flex-row">
      <Menu></Menu>
      <div id="conteusdo" className="mt-16 w-full flex ">
        <div className="flex p-10 w-full items-center  flex-col">
        <h1 className='text-3xl my-2 font-black'>Meus Ros</h1>
        <div className="flex w-full max-h-screen  overflow-auto  my-2 justify-center">
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
       {myRos.map((ro , i)=> (
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
    
    }
      
      </div>
        </div>   
    </div>
    </div>
  );
};


export default Home