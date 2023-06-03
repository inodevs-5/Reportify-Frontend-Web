import { useEffect, useState } from "react";
import Menu from "../../components/menus";
import "./cadastro.css"
import Loader from "../../components/loader";
import api from "../../services/api";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
// import { Redirect } from 'react-router-dom';
import { redirect } from "react-router-dom";
import LoaderRo from "../../components/loader/loaderRo";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Alert from "@mui/material/Alert";
// import BasicAlerts from "../../components/Alertas";
// import Alert from '@mui/material/Alert';
// import Stack from '@mui/material/Stack';


function CadastroRo () {
  const { usuario } = useAuth();
  const [contrato, setContrato] = useState('');
  const [fase, setFase] = useState('');
  const [orgao, setOrgao] = useState('');
  const [relator, setRelator] = useState('');
  const [posGradRelator, setPosGradRelator] = useState('');
  const [responsavel, setResponsavel] = useState('');
  const [posGradResponsavel, setPosGradResponsavel] = useState('');
  const [hardwareChecked, setHardwareChecked] = useState(false);
  const [softwareChecked, setSoftwareChecked] = useState(false);
  const [equipamento, setEquipamento] = useState('');
  const [posicao, setPosicao] = useState('');
  const [partNumber, setPartNumber] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [versaoBaseDados, setVersaoBaseDados] = useState('');
  const [versaoSoftware, setVersaoSoftware] = useState('');
  const [descricao, setDescricao] = useState('');
  const [titulo, setTitulo] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [logsAnexados, setLogsAnexados] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(true);
  const [enviado , setEnviado] = useState(false)
  // const navigate = useNavigate
  
  const [usuarios, setUsuarios] = useState([]);
  const [selectedUser, setSelectedUser] = useState(usuario._id);
  useEffect(() => {
    (async () => {
      try {
        const response = await api.get('/usuario');

        setUsuarios(response.data);
        setLoading1(false);
      } catch (response) {
        console.log(response.data.msg);
      }
    })();
  }, []);

 

  

  async function cadastrarRO() {
    setLoading(true);
    try {
      const data = new FormData();

      data.append('contrato', contrato);
      data.append('fase', fase);
      data.append('orgao', orgao);
      data.append('idRelator', selectedUser);
      data.append('nomeRelator', relator);
      data.append('posGradRelator', posGradRelator);
      data.append('nomeResponsavel', responsavel);
      data.append('posGradResponsavel', posGradResponsavel);

      if (softwareChecked) {
        data.append('classDefeito', 'software');
        data.append('versaoBaseDados', versaoBaseDados);
        data.append('versaoSoftware', versaoSoftware);
        data.append( 'anexo' , logsAnexados);

      } else if (hardwareChecked) {
        data.append('classDefeito', 'hardware');
        data.append('equipamento', equipamento);
        data.append('equipPosicao', posicao);
        data.append('serialNumber', serialNumber);
        data.append('partNumber', partNumber);
      }

      if (descricao) {
        data.append('descricaoOcorrencia', descricao);
      }
      data.append('tituloOcorrencia', titulo);
      
      const response = await api.post('/ro', data, {headers: {'Content-Type': 'multipart/form-data'}})
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

  const handleHardwareCheck = () => {
    setHardwareChecked(!hardwareChecked);
    setSoftwareChecked(false);
  };

  const handleSoftwareCheck = () => {
    setSoftwareChecked(!softwareChecked);
    setHardwareChecked(false);
  };



  // const notify = () => toast("Wow so easy!");

  async function roni () {
    toast.success('RO cadastrado com sucesso', {
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
          Atualizar Status do Registro de Ocorrência
        </h1>    
        {
        !!errorMessage && 
        <>
        <h1 className="text-red-900">{errorMessage}</h1>
          </>
        }
        
        <div className="flex flex-col mt-4 w-3/4">
        
        <div className="flex  mb-4 flex-col">
    
    <div className="flex  mb-4 flex-col">
      <div className="flex flex-row">
      <label htmlFor="Defeito" className="block text-gray-700 font-bold w-1/4">
        Classificação:
      </label>
      <label htmlFor="hardware">Defeito</label>
      <input
        type="checkbox"
        value="defeito"
        disabled={softwareChecked}
        id="defeito"
        className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
        />
      <label htmlFor="software">Melhoria</label>
      <input
        type="checkbox"
        value="melhoria"
        disabled={hardwareChecked}
        id="melhoria"
        className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
        />
        <label htmlFor="software">Outro</label>
      <input
        type="checkbox"
        value=""
        disabled={hardwareChecked}
        id=""
        className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
        />
        </div> </div>
        <div className="flex  mb-4 flex-col">
      <div className="flex flex-row">
      <label htmlFor="Defeito" className="block text-gray-700 font-bold w-1/4">
        Categoria:
      </label>
      <label htmlFor="hardware">Alta</label>
      <input
        type="checkbox"
        value="defeito"
        disabled={softwareChecked}
        id="defeito"
        className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
        />
      <label htmlFor="software">Média</label>
      <input
        type="checkbox"
        value="melhoria"
        disabled={hardwareChecked}
        id="melhoria"
        className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
        />
        <label htmlFor="software">Baixa</label>
      <input
        type="checkbox"
        value=""
        disabled={hardwareChecked}
        id=""
        className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
        />
        </div> </div>
    

   

    <div className="flex mb-4">
      <label htmlFor="Responsavel" className="block text-gray-700 font-bold w-1/4">
        Responsável:
      </label>
      <input
        type="text"
        onChange={(event) => setResponsavel(event.target.value)}
        id="Responsave"
        className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
      />
    </div>
    <div className="flex  mb-4 flex-col">
      <div className="flex flex-row">
      <label htmlFor="Defeito" className="block text-gray-700 font-bold w-1/4">
        Defeito:
      </label>
      <label htmlFor="hardware">Hardware</label>
      <input
        type="checkbox"
        value="hardware"
        disabled={softwareChecked}
        onChange={handleHardwareCheck}
        id="hardware"
        className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
        />
      <label htmlFor="software">Software</label>
      <input
        type="checkbox"
        value="sofware"
        disabled={hardwareChecked}
        onChange={handleSoftwareCheck}
        id="software"
        className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
        />
        </div>
    </div>
    { hardwareChecked && (
        <>
    
    <div className="flex mb-4">
    <label htmlFor="Equipamento" className="block text-gray-700 font-bold w-1/4">
    Equipamento:
    </label>
    <input
      type="text"
      onChange={(event) => setEquipamento(event.target.value)}
      id="Equipamento"
      className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
      />
    </div>
    <div className="flex mb-4">
    <label htmlFor="Posicao" className="block text-gray-700 font-bold w-1/4">
    Posição:
    </label>
    <input
      type="text"
      id="Posicao"
      onChange={(event) => setPosicao(event.target.value)}
      className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
      />
    </div>
    <div className="flex mb-4">
    <label htmlFor="partNumber" className="block text-gray-700 font-bold w-1/4">
    Part Number:
    </label>
    <input
      type="text"
      id="partNumber"
      onChange={(event) => setPartNumber(event.target.value)}
      className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
      />
    </div>
    <div className="flex mb-4">
    <label htmlFor="serialNumber" className="block text-gray-700 font-bold w-1/4">
    Serial Number:
    </label>
    <input
      type="text"
      id="serialNumber"
      onChange={(event) => setSerialNumber(event.target.value)}
      className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
      />
    </div>
    
    
      </>
    )

    }


      
    { softwareChecked && (
      <>
       <div className="flex mb-4">
       <label htmlFor="versao_base" className="block text-gray-700 font-bold w-1/4">
       Versão da base de dados:
       </label>
       <input
         type="text"
         id="versao_base"
         onChange={(event) => setVersaoBaseDados(event.target.value)}
         className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
       />
     </div>
     <div className="flex mb-4 ">
     <label htmlFor="vesaosoftware" className="block text-gray-700 font-bold w-1/4">
       Versão do software:
     </label>
     <input
       type="text"
       id="vesaosoftware"
       onChange={(event) => setVersaoSoftware(event.target.value)}
       className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
       />
     </div>
     { usuario && usuario.perfil === 'cliente' &&
     <div className="flex mb-4">
     <label htmlFor="log_anexados" className="block text-gray-700 font-bold w-1/4">
       Logs Anexos
     </label>
     <input
       type="file"
       id="log_anexados"
       name=""
       onChange={(event) => setLogsAnexados(event.target.files[0])}
       className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
       />
     </div>}
      </>
    )

    }
    <div className="flex mb-4">
      <label htmlFor="titulo" className="block text-gray-700 font-bold w-1/4">
        Titulo:
      </label>
      <input
        type="text"
        id="titulo"
        onChange={(event) => setTitulo(event.target.value)}
        className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
      />
    </div>
    <div className="flex mb-4">
      <label htmlFor="descricao" className="block text-gray-700 font-bold w-1/4">
        Justificativa:
      </label>
      <input
        type="text"
        id="justificativa"
        onChange={(event) => setDescricao(event.target.value)}
        className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
      />
    </div>
    <div className="flex flex-row">
      <label htmlFor="Defeito" className="block text-gray-700 font-bold w-1/4">
        Status:
      </label>
      <label htmlFor="hardware">Pendente</label>
      <input
        type="checkbox"
        value="pendente"
        disabled={softwareChecked}
        id="pendente"
        className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
        />
      <label htmlFor="software">Em andamento</label>
      <input
        type="checkbox"
        value="andamento"
        disabled={hardwareChecked}
        id="andamento"
        className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
        />
        <label htmlFor="software">Concluído</label>
      <input
        type="checkbox"
        value="concluido"
        disabled={hardwareChecked}
        id="concluido"
        className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
        />
        </div></div>
    <div className="flex justify-center w-full ">
    <div className="flex justify-end w-1/2 ">


    {enviado && (
      <>
          <Navigate to="/home" replace={true} />
      </> 
        )}
        

    {
              !loading ?

                (<button className="bg-blue-300 hover:bg-blue-400 hover:ring-blue-500  ring-offset-0 font-black  ring ring-blue-400 outline-none  p-1 text-white text-xl w-3/6 rounded-xl cursor-pointer"
                onClick={cadastrarRO}
                >
                  Enviar
                </button>)
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
}export default CadastroRo