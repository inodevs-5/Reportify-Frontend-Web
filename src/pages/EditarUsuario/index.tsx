import { useEffect, useState } from "react";
import Menu from "../../components/menus";
import "./editar_usario.css"
import Loader from "../../components/loader";
import api from "../../services/api";
import { Navigate, useNavigate } from "react-router-dom";
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

        <div>
        <label>Nome</label>
        <input
          type="text"
          placeholder=""
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </div>

      <div>
        <label>Email</label>
        <input
          type="text"
          placeholder=""
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label>Perfil</label>
        <input
          type="text"
          placeholder=""
          value={perfil}
          onChange={(e) => setPerfil(e.target.value)}
        />
      </div>

      <div>
        <label>Empresa</label>
        <input
          type="text"
          placeholder=""
          value={empresa}
          onChange={(e) => setEmpresa(e.target.value)}
        />
      </div>

      <div>
        <label>Contato da Empresa</label>
        <input type="text" placeholder="" />
      </div>

      <div>
        <label>Senha</label>
        <input
          type="password"
          placeholder=""
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
      </div>

      <div>
        {!loading ? (
          <button onClick={editarUser}>Editar</button>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
    </div>
    </div>
  );
};

export default EditarUsuario;