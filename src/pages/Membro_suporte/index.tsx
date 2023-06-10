import { useEffect, useState } from "react";
import Menu from "../../components/menus";
import { useAuth } from "../../contexts/auth";
import "../../styles/global.css";
import api from "../../services/api";
import { FaEdit } from "react-icons/fa";
import Loader_preto from "../../components/loader/loaderpreto";
import { Link, Navigate } from "react-router-dom";
// import { useState } from "react";


function ListagemUsuario() {
  const { signOut } = useAuth();

  const [usuarios, setUsuarios] = useState()
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);


  useEffect(() => {
    (async () => {
      try {
        const response = await api.get('/usuario');

        setUsuarios(response.data);
        setLoading(false)
      } catch (response) {
        setErrorMessage(response.data.msg);
      }
    })();
  }, []);

  // const editauser = (id:number) => {
  //   // console.log(id)
  //  return <Link to={`editar_usuario:${id}`}/>
  // }


  return (
    <div className="flex flex-wrap flex-row">
      <Menu></Menu>
      <div id="conteusdo" className="mt-16  bg-white flex-1 ">
      <div className="flex p-10 w-full items-center  flex-col">
        <h1 className="text-3xl my-2 font-black">Listagem Usuários</h1>
        { 
        usuarios && !loading ?(
                  
                  <table className="w-full   md:table-fixed table-fixed ">
              <thead>
                <tr className="text-center border border-slate-600 bg-gradient-to-r from-zinc-800 to-zinc-700 text-gray-50  text-xl">
                  {/* <th className="border border-slate-700">ID</th> */}
                  <th className="border border-slate-700">Nome</th>
                  <th className="border border-slate-700">Perfil</th>
                  <th className="border border-slate-700">Empresa</th>
                  <th className="border border-slate-700">Editar</th>
                </tr>
              </thead>
              <tbody >
                {
                  usuarios.map((usuario , i)=> (
                  <tr className={i % 2 === 0 ? 'bg-gray-200' : 'bg-white'} key={usuario._id}>
                  {/* <td className="border border-slate-700 tex p-1">
                    <div className="flex justify-center">
                    <div className="flex text-white text-lg  bg-gradient-to-r from-zinc-800 to-zinc-700 rounded-3xl w-2/5 justify-center"> 
                      {usuario._id}
                    </div>
                    </div>
                    
                    </td> */}
                  {/* <td className="border border-slate-700 p-1 text-center">
                    {usuario.tituloOcorrencia.charAt(0).toUpperCase()+ usuario.tituloOcorrencia.slice(1)}
                    </td> */}
                  <td className="border border-slate-700 p-1  text-center">
                    <div className="flex justify-center">
                    <div className="">
                    {usuario.nome.charAt(0).toUpperCase() + usuario.nome.slice(1)}
                    </div>
                    </div>
                    </td>
                  <td className="border border-slate-700 p-1">
                    <div className="flex justify-center text-center">
                    <div className="">
                      {usuario.perfil.charAt(0).toUpperCase() + usuario.perfil.slice(1)}
                      </div>
                      </div>
                      </td>
                  <td className="border border-slate-700 p-1 text-center ">
                    { usuario.empresa.charAt(0).toUpperCase() + usuario.empresa.slice(1) }
                    </td>
                  <td className="border border-slate-700 p-1">
                    <div className="flex w-full items-center justify-center ">
                      <Link to={`/editar/${usuario._id}`}>

                      </Link>
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
                  )}
        </div>
    </div>
    </div>
)};


export default ListagemUsuario