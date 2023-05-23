import { Link } from "react-router-dom";
import "../../styles/global.css";
import "./lado.css"
import { FaComment, FaBell, FaBars, FaTimes  } from 'react-icons/fa';
import { useState } from "react";
// import { useState } from "react";


function Menu() {
const [open , setOpen] = useState(false)

const isopen = () => {
  setOpen(!open)
  console.log("passei")
}

  return (
    // menu decima
    <div className="flex relative flex-wrap">
      <div className="bg-primary fixed h-16 w-screen flex items-center justify-center">
        <div className="bg-primary fixed h-16 w-11/12 flex items-center justify-between" > 
        <div>
          <h1 className="text-3xl text-white">Ola Fulano</h1>
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
        <Link to="/notificacao">
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
          <h1 className="text-3xl pl-2 text-white">Ola Fulano</h1>
        </li>
        <li className="py-3 rounded-xl text-center hover:bg-secondary cursor-pointer mt-3 ring-1 ring-black-300 shadow-2xl">
          <Link to="/tabelaRo" className="text-gray-400 p-4 hover:text-white">Registro de Ocorrência</Link>
        </li>
        <li className="py-3 rounded-xl text-center hover:bg-secondary  cursor-pointer mt-4 ring-1 ring-black-800 shadow-2xl">
        <Link to="/membroSuporte" className="text-gray-400 hover:text-white  p-4 ">Membros do Suporte</Link>
        </li>
        <li className="py-3 rounded-xl text-center hover:bg-secondary  mt-4 ring-1 ring-black-300 shadow-2xl">
        <Link to="/CadastroRo" className="text-gray-400 p-4 hover:text-white">Novo Registro de Ocorrência</Link>
        </li>
        <li className="py-3 rounded-xl  text-center  mt-4 ring-1 hover:bg-secondary cursor-pointer ring-black-300 shadow-2xl">
        <Link to="/cadastroUsuarios" className="text-gray-400 p-4 hover:text-white">Cadastrar Novo Usuário</Link>
        </li>
        <li className="py-3 rounded-xl text-center  mt-4 ring-1 hover:bg-secondary cursor-pointer ring-black-300 shadow-2xl">
        <Link to="/contatos" className="text-gray-400 p-4 hover:text-white px-16 ">Meus Chats</Link>
        </li>
        <li className="py-3 rounded-xl text-center  mt-4 ring-1 hover:bg-secondary cursor-pointer ring-black-300 shadow-2xl">
        <Link to="/home" className="text-gray-400 p-4 w-full hover:text-white px-16 ">Home</Link>
        </li>
        <div className="absolute pb-3 w-10/12 bottom-0 flex ">
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
        <li className="py-3 rounded-xl text-center hover:bg-secondary  cursor-pointer mt-4 ring-1 ring-black-800 shadow-2xl">
        <Link to="/membroSuporte" className="text-gray-400 hover:text-white  p-4">Membros do Suporte</Link>
        </li>
        <li className="py-3 rounded-xl text-center hover:bg-secondary  mt-4 ring-1 ring-black-300 shadow-2xl">
        <Link to="/CadastroRo" className="text-gray-400 p-4 hover:text-white">Novo Registro de Ocorrência</Link>
        </li>
        <li className="py-3 rounded-xl  text-center  mt-4 ring-1 hover:bg-secondary cursor-pointer ring-black-300 shadow-2xl">
        <Link to="/cadastroUsuarios" className="text-gray-400 p-4 hover:text-white">Cadastrar Novo Usuário</Link>
        </li>
        <li className="py-3 rounded-xl text-center  mt-4 ring-1 hover:bg-secondary cursor-pointer ring-black-300 shadow-2xl">
        <Link to="/contatos" className="text-gray-400 p-4 hover:text-white">Meus Chats</Link>
        </li>
        <li className="py-3 rounded-xl text-center  mt-4 ring-1 hover:bg-secondary cursor-pointer ring-black-300 shadow-2xl">
        <Link to="/home" className="text-gray-400 p-4 hover:text-white">Home</Link>
        </li>
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
      <div id="bar" className="bg-primary p-2  fixed text-white cursor-pointer flex flex-col">
        <button onClick={isopen}>
          <FaTimes size={24} /> {/* Ícone de "X" */}
        </button>
      </div> 
      ) : (
        <div id="bar" className="bg-primary p-2 mt-16 fixed text-white cursor-pointer flex flex-col">
        <button onClick={isopen}>
          <FaBars size={24} /> {/* Ícone de menu */}
        </button>
        </div>
      )}

    
    </div>
  );
};


export default Menu