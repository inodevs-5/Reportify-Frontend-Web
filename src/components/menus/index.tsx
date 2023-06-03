import { Link, useNavigate } from "react-router-dom";
import "../../styles/global.css";
import "./lado.css"
import { FaComment, FaBell, FaBars, FaTimes  } from 'react-icons/fa';
import { useState } from "react";
import { useAuth } from "../../contexts/auth";
// import { useState } from "react";


function Menu() {
const [open , setOpen] = useState(false)
const { usuario, signOut } = useAuth();

const isopen = () => {
  setOpen(!open)
}

const sair = () => {
  window.location.reload();
  signOut()
}



  return (
    <div className="flex relative flex-wrap">
      <div className="bg-primary fixed h-16 w-screen flex items-center justify-center">
        <div className="bg-primary fixed h-16 w-11/12 flex items-center justify-between" > 
        <div>
          <h1 className="text-3xl text-white">Olá {usuario.nome}</h1>
        </div>
        <div>
          <h1 className="text-3xl text-white" >Reportify</h1>
        </div>
        <div className="flex w-16 flex-row justify-between">
        <div>
          <Link to="/contatos" >
        <FaComment className="text-white" size={24}/>
          </Link>
        </div>
        <div className="flex items-center">
        <Link to="/notificacoes">
        <FaBell className="text-white"  size={24} />
        </Link>
        <div className="absolute top-5 right-0 w-3 h-3 bg-red-500 rounded-full"></div>
        </div>
        </div>
      </div>
      </div>

      <div id="lado" className=" bg-primary min-h-screen fixed flex flex-col">
      <div className="text-white font-bold text-xl "></div>
      <div className="flex-1">
      <ul className="text-white flex flex-col flex-grow   p-4">
        <li className="">
          <h1 className="text-3xl pl-2 text-white">Olá {usuario.nome}</h1>
        </li>
        <li className="py-3 rounded-xl text-center hover:bg-secondary cursor-pointer mt-3 ring-1 ring-black-300 shadow-2xl">
          <Link to="/tabelaRo" className="text-gray-400 p-4 hover:text-white">Registro de Ocorrência</Link>
        </li>
        { usuario && usuario.perfil === 'admin' && 
        <li className="py-3 rounded-xl text-center hover:bg-secondary  cursor-pointer mt-4 ring-1 ring-black-800 shadow-2xl">
        <Link to="/membroSuporte" className="text-gray-400 hover:text-white  p-4 ">Membros do Suporte</Link>
        </li>}
        <li className="py-3 rounded-xl text-center hover:bg-secondary  mt-4 ring-1 ring-black-300 shadow-2xl">
        <Link to="/CadastroRo" className="text-gray-400 p-4 hover:text-white">Novo Registro de Ocorrência</Link>
        </li>
       { usuario && usuario.perfil === 'admin' && <li className="py-3 rounded-xl  text-center  mt-4 ring-1 hover:bg-secondary cursor-pointer ring-black-300 shadow-2xl">
        <Link to="/cadastroUsuarios" className="text-gray-400 p-4 hover:text-white">Cadastrar Novo Usuário</Link>
        </li>}
        <li className="py-3 rounded-xl text-center  mt-4 ring-1 hover:bg-secondary cursor-pointer ring-black-300 shadow-2xl">
        <Link to="/contatos" className="text-gray-400 p-4 hover:text-white px-16 ">Meus Chats</Link>
        </li>
        <li className="py-3 rounded-xl text-center  mt-4 ring-1 hover:bg-secondary cursor-pointer ring-black-300 shadow-2xl">
        <Link to="/home" className="text-gray-400 p-4 w-full hover:text-white px-16 ">Home</Link>
        </li>
        {usuario && usuario.perfil === 'admin' && 
        <li className="py-3 rounded-xl text-center  mt-4 ring-1 hover:bg-secondary cursor-pointer ring-black-300 shadow-2xl">
        <Link to="/backup" className="text-gray-400 p-4 w-full hover:text-white px-16 ">Backup</Link>
        </li>
        }
        <div className="absolute pb-3 w-10/12 bottom-0 flex ">
        <button className="bg-blue-800  m-auto flex ring-offset-0 font-medium ring ring-blue-900 
        justify-center p-1  items-center  w-3/6  text-white text-xl rounded-xl"
        onClick={sair}>
           <p>sair</p> 
        </button>
          </div>
      </ul>
      <div>
      </div>
      </div>
    </div >

{/* menu do lado */}
   { open && (
   <div  className=" bg-primary min-h-screen fixed mt-4 flex flex-col">
      <div className="text-white font-bold text-xl "></div>
      <div className="flex-1">
      <ul className="text-white flex flex-col flex-grow   p-4">
        <li className="">
          <h1 className="text-3xl pl-2 text-white"></h1>
        </li>
        <li className="py-3 rounded-xl text-center hover:bg-secondary cursor-pointer mt-3 ring-1 ring-black-300 shadow-2xl">
          <Link to="/tabelaRo" className="text-gray-400 p-4 hover:text-white">Registro de Ocorrência</Link>
        </li>
        { usuario && usuario.perfil === 'admin' &&
        <li className="py-3 rounded-xl text-center hover:bg-secondary  cursor-pointer mt-4 ring-1 ring-black-800 shadow-2xl">
        <Link to="/membroSuporte" className="text-gray-400 hover:text-white  p-4">Membros do Suporte</Link>
        </li>}
        <li className="py-3 rounded-xl text-center hover:bg-secondary  mt-4 ring-1 ring-black-300 shadow-2xl">
        <Link to="/CadastroRo" className="text-gray-400 p-4 hover:text-white">Novo Registro de Ocorrência</Link>
        </li>
        { usuario && usuario.perfil === 'admin' &&
        <li className="py-3 rounded-xl  text-center  mt-4 ring-1 hover:bg-secondary cursor-pointer ring-black-300 shadow-2xl">
        <Link to="/cadastroUsuarios" className="text-gray-400 p-4 hover:text-white">Cadastrar Novo Usuário</Link>
        </li>}
        <li className="py-3 rounded-xl text-center  mt-4 ring-1 hover:bg-secondary cursor-pointer ring-black-300 shadow-2xl">
        <Link to="/contatos" className="text-gray-400 p-4 hover:text-white">Meus Chats</Link>
        </li>
        <li className="py-3 rounded-xl text-center  mt-4 ring-1 hover:bg-secondary cursor-pointer ring-black-300 shadow-2xl">
        <Link to="/home" className="text-gray-400 p-4 hover:text-white">Home</Link>
        </li>
        {usuario && usuario.perfil === 'admin' &&
        <li className="py-3 rounded-xl text-center  mt-4 ring-1 hover:bg-secondary cursor-pointer ring-black-300 shadow-2xl">
        <Link to="/backup" className="text-gray-400 p-4 w-full hover:text-white px-16 ">Backup</Link>
        </li>}
        <div className="absolute pb-6 w-10/12 bottom-0 flex ">
        <button className="bg-blue-800  m-auto flex ring-offset-0 font-medium ring ring-blue-900 
        justify-center p-1  items-center  w-3/6  text-white text-xl rounded-xl">
           <p>sair</p> 
        </button>
          </div>
      </ul>
      <div>
      </div>
      </div>
    </div >
    
    )}

    
    {open ? (
      <div id="bar" className="bg-primary  fixed text-white flex flex-col">
        <button className="cursor-pointer p-3" onClick={isopen}>
          <FaTimes size={26} /> {/* Ícone de "X" */}
        </button>
      </div> 
      ) : (
        <div id="bar" className="bg-primary mt-16 fixed text-white flex flex-col">
        <button className="cursor-pointer p-2" onClick={isopen}>
          <FaBars size={26} /> {/* Ícone de menu */}
        </button>
        </div>
      )}

    
    </div>
  );
};


export default Menu