import { useEffect, useState } from "react";
import Menu from "../../components/menus";
import "./editar_usario.css"
import Loader from "../../components/loader";
import api from "../../services/api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditarUsuario = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [perfil, setPerfil] = useState('administrador');
  const [empresa, setEmpresa] = useState('empresa1');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const editarUser = () => {
    setLoading(true);

    //enviar dados para a API

    setLoading(false);

    history.push('/home'); // Redireciona para a página desejada
  };

  return (
  <div className="flex flex-wrap flex-row">
      <div>
        <Menu/>
      </div>

    {/* {conteudo fica aqui} */}

    <div id="conteusdo" className="mt-16 w-full flex-1">
      <div className="p-10 flex items-center flex-col">
        <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        />
      
        <h1 className="text-xl text-black  font-semibold">
          Editar Usuário
        </h1>    

        <div className="flex flex-col mt-4 w-3/4">
        <div className="flex mb-4">
        <label htmlFor="nome" className="block text-gray-700 font-bold w-1/4"> 
          Nome:
        </label>
        <input
          type="text"
          id="nome"
          placeholder=""
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
        />
        </div>

      <div className="flex mb-4">
        <label htmlFor="email" className="block text-gray-700 font-bold w-1/4">
          Email:
        </label>
        <input
          type="text"
          id="email"
          placeholder=""
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
        />
      </div>

      <div className="flex mb-4">
        <label htmlFor="perfil" className="block text-gray-700 font-bold w-1/4">
          Perfil:
        </label>
        <input
          type="text"
          id="perfil"
          placeholder=""
          value={perfil}
          onChange={(e) => setPerfil(e.target.value)}
          className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
        />
      </div>

      <div className="flex mb-4">
        <label htmlFor="empresa" className="block text-gray-700 font-bold w-1/4">
          Empresa:
        </label>
        <input
          type="text"
          id="empresa"
          placeholder=""
          value={empresa}
          onChange={(e) => setEmpresa(e.target.value)}
          className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
        />
      </div>

      <div className="flex mb-4">
        <label htmlFor="empresa" className="block text-gray-700 font-bold w-1/4">
          Senha:
        </label>
        <input
          type="password"
          placeholder=""
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
        />
      </div>

      <div className="flex justify-center w-full">
        <div className="flex justify-end w-1/2 ">
        {!loading ? (
          <button className="bg-blue-300 hover:bg-blue-400 hover:ring-blue-500  ring-offset-0 font-black  ring ring-blue-400 outline-none  p-1 text-white text-xl w-3/6 rounded-xl cursor-pointer"
            onClick={editarUser}>Editar</button>) 
          : (
          <div className="bg-blue-300 ring-offset-0 font-black ring ring-blue-400 flex justify-center p-1  items-center  w-3/6  text-white text-xl rounded-xl ">
            <Loader />
         </div>
                  )
        }
</div>
  </div>
    </div>
      </div>
        </div>
          </div>
  );
}

export default EditarUsuario