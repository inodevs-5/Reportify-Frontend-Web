import { useEffect, useState } from "react";
import Menu from "../../components/menus";
import "./cadastro_usuario.css"
import Loader from "../../components/loader";
import api from "../../services/api";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Perfil { // para o picker (select)
  label: string;
  value: string;
}


function CadastroUsuario () {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [perfil, setPerfil] = useState('cliente');
  const [selectedPerfil, setSelectedPerfil] = useState('cliente');
  const [empresa, setEmpresa] = useState('');
  const [contato_empresa, setConato_empresa] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [enviado , setEnviado] = useState(false)

  const perfis: Perfil[] = [
    { label: 'Administrador', value: 'admin' },
    { label: 'Cliente', value: 'cliente' },
   ];

  async function cadastrarUsuario() {
    setLoading(true);
    try {
      const response = await api.post('/usuario', {nome, 
        email, perfil, empresa, contato_empresa })
      
      
      roni()
    } catch (response) {
      if (response && response.data && response.data.msg) {
        setErrorMessage(response.data.msg);
        console.log(response.data.msg)
      } else {
        setLoading(false);
        console.log('indefinido')
        
      }
    }
    setLoading(false);
  }

  async function roni () {
    toast.success('Usuário cadastrado com sucesso', {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
    setTimeout(() => {
    setEnviado(true)
    },3000)
  }

return(
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
          Cadastrar Usuário
      </h1>    

        {
        !!errorMessage && 
        <>
        <h1 className="text-red-900">{errorMessage}</h1>
          </>
        }
        
      <div className="flex flex-col mt-4 w-3/4">
        <div className="flex mb-4">
        <label htmlFor="nome" className="block text-gray-700 font-bold w-1/4">
          Nome:
        </label>
      <input
        type="text"
        id="nome"
        onChange={(event) => setNome(event.target.value)}
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
        onChange={(event) => setEmail(event.target.value)}
        className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
      />
    </div>
      <div className="flex mb-4">
        <label htmlFor="perfil" className="block text-gray-700 font-bold w-1/4">
          Perfil:
        </label>
        <select
      name="perfil"
      className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
      onChange={e => setPerfil(e.target.value)}
      id="perfil"
      >
    <option disabled selected>
    Selecione
  </option>
      { perfis && perfis.map((relator) => (
      <option key={relator.value} value={relator.value}>{relator.label}</option>
      ))}
    </select>
    </div>
      <div className="flex mb-4">
        <label htmlFor="empresa" className="block text-gray-700 font-bold w-1/4">
          Empresa:
        </label>
      <input
        type="text"
        id="empresa"
        onChange={(event) => setEmpresa(event.target.value)}
        className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
      />
    </div>
    <div className="flex mb-4">
        <label htmlFor="contato" className="block text-gray-700 font-bold w-1/4">
          Contato Empresa:
        </label>
      <input
        type="text"
        id="contato"
        onChange={(event) => setConato_empresa(event.target.value)}
        className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
      />
    </div>
  <div className="flex justify-center w-full">
    <div className="flex justify-end w-3/6">
        {enviado && (
            <>
                <Navigate to="/home" replace={true} />
            </> 
         )}
        {!loading ?
          (<button className="bg-blue-300 hover:bg-blue-400 hover:ring-blue-500 ring-offset-0 font-black ring ring-blue-400 outline-none  p-1 text-white text-xl w-3/6 rounded-xl cursor-pointer"
            onClick={cadastrarUsuario}> Cadastrar </button>)
            : (
            <div className="bg-blue-300 ring-offset-0 font-black ring ring-blue-400 flex justify-center p-1 items-center w-3/6 text-white text-xl rounded-xl">
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

export default CadastroUsuario