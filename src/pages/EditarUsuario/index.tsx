import { useEffect, useState } from "react";
import Menu from "../../components/menus";
import "./editar_usario.css"
import Loader from "../../components/loader";
import api from "../../services/api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, useParams } from "react-router-dom";
import Loader_preto from "../../components/loader/loaderpreto";



interface Perfil {
  label: string;
  value: string;
}

interface Empresa {
  label: string;
  value: string;
}


const EditarUsuario = () => {

  const [loading, setLoading] = useState(true);// do botão de enviar
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [selectedPerfil, setSelectedPerfil] = useState('admin');
  const [empresa, setEmpresa] = useState('');
  const [contato_empresa, setContato] = useState('');
  const [enviado , setEnviado] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null);
  // const [senha, setSenha] = useState('');
  // const a = _id
  const perfis: Perfil[] = [
    { label: 'Administrador', value: 'administrador' },
    { label: 'Cliente', value: 'cliente' },
  
  ];
  const [selectedEmpresa, getSelectedEmpresa] = useState('empresa1');


  const { _id } = useParams();

  // async function editarUser() {
  //   setLoading(true);
  //   try {
  //     const response = await api.put('/usuario/'+id , {nome, email, selectedPerfil, empresa, contato_empresa })
  //     Alert.alert(response.data.msg);
  //     navigation.navigate('Home')
  //   } catch (response) {
  //     Alert.alert(response.data.msg);
  //   }
  //   setLoading(false);
  // }

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get('/usuario/'+_id);
        
        setNome(response.data.nome);
        setEmail(response.data.email);
        setSelectedPerfil(response.data.perfil);
        setEmpresa(response.data.empresa);
        setContato(response.data.contato_empresa);
        // setSenha(response.data.senha);
        setLoading(false)
      } catch (response) {
        setErrorMessage(response.data.msg);
      }
    })();
  }, []);


  async function editarUser() {
    setLoading(true);
    try {
      const response = await api.put('/usuario/'+_id , {nome, email, selectedPerfil, empresa, contato_empresa })
      roni()
    } catch (response) {
      setErrorMessage(response.data.msg);
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

  return (
    <div className="flex flex-wrap flex-row">
    <div>
      <Menu/>
    </div>


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
     {!loading ? 
     <>
        
      
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
        value={nome}
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
        value={email}
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
      value={selectedPerfil}
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
        value={empresa}
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
        value={contato_empresa}
        id="contato"
        onChange={(event) => setContato(event.target.value)}
        className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
      />
    </div>
  <div className="flex justify-center w-full">
    <div className="flex justify-end w-3/6">
        {enviado && (
            <>
                <Navigate to="/membroSuporte" replace={true} />
            </> 
         )}
        {!loading ?
          (<button className="bg-blue-300 hover:bg-blue-400 hover:ring-blue-500 ring-offset-0 font-black ring ring-blue-400 outline-none  p-1 text-white text-xl w-3/6 rounded-xl cursor-pointer"
            onClick={editarUser}> Cadastrar </button>)
            : (
            <div className="bg-blue-300 ring-offset-0 font-black ring ring-blue-400 flex justify-center p-1 items-center w-3/6 text-white text-xl rounded-xl">
              <Loader />
            </div>
                  )
          }
</div>
  </div>
    </div>
      
    </>:<>
 
    <Loader_preto/>
                   
   </> } 

      </div>
        </div>
          </div>
  );
}

export default EditarUsuario