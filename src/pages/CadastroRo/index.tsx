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
  const [logsAnexados, setLogsAnexados] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate
  
  const [usuarios, setUsuarios] = useState([]);
  const [selectedUser, setSelectedUser] = useState(usuario._id);
  useEffect(() => {
    (async () => {
      try {
        const response = await api.get('/usuario');

        setUsuarios(response.data);
        setLoading(false);
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

        logsAnexados.forEach((l) => {
          data.append('anexo', l);
        });

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
      
      const response = await api.post('/ro', data, {headers: {'Content-Type': 'multipart/form-data'}});
      alert('Botão clicado!');
      return navigate("/")
      
     
    } catch (response) {
      if (response && response.data && response.data.msg) {
        setErrorMessage(response.data.msg);
        console.log(response.data.msg)
      } else {
        // Lógica para lidar com o caso em que 'response', 'response.data' ou 'response.data.msg' sejam indefinidos.
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


  const  roni = () => {
    return navigate("/")
  }

return(
<div className="flex flex-wrap flex-row">
    <div>
    <Menu/>
    </div>
    {/* {conteudo fica aqui} */}
    <div id="conteusdo" className="mt-16 w-full flex-1">
      <div className="p-10 flex items-center flex-col">
      <h1 className="text-xl text-black  font-semibold">
          Novo Registro de Ocorrência
        </h1>    
        <h1>
        {!!errorMessage && <h1 className="text-red-800 text-2xl">{errorMessage}</h1>}
        </h1>
        <div className="flex flex-col mt-4 w-3/4">
        <div className="flex mb-4">
      <label htmlFor="contrato" className="block text-gray-700 font-bold w-1/4">
        Contrato:
      </label>
      <input
        type="text"
        id="contrato"
        onChange={(event) => setContrato(event.target.value)}
        className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
      />
    </div>
    <div className="flex mb-4">
      <label htmlFor="orgao" className="block text-gray-700 font-bold w-1/4">
        Orgão:
      </label>
      <input
        type="text"
        id="orgao"
        onChange={(event) => setOrgao(event.target.value)}
        className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
      />
    </div>
    <div className="flex mb-4">
      <label htmlFor="Relator" className="block text-gray-700 font-bold w-1/4">
        Relator:
      </label>
      { !loading ? 
      <>
      <select
      name="Relator"
      className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
      id="Relator"
      >
      { usuarios && usuarios.map((relator) => (
      <option key={relator._id} value={relator._id}>{relator.nome}</option>
      ))}
    </select>
    </>
    :
       <LoaderRo/>
      }
    </div>
    <div className="flex mb-4">
      <label htmlFor="POS./GRAD" className="block text-gray-700 font-bold w-1/4">
        POS./GRAD:
      </label>
      <input
        type="text"
        id="POS_GRAD"
        onChange={(event) => setPosGradRelator(event.target.value)}
        className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
      />
    </div>
    <div className="flex mb-4">
      <label htmlFor="Responsavel/supervisor do centro" className="block text-gray-700 font-bold w-1/4">
        Responsavel/centro:
      </label>
      <input
        type="text"
        onChange={(event) => setResponsavel(event.target.value)}
        id="Responsavel/supervisor do centro"
        className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
      />
    </div>
    <div className="flex mb-4">
      <label htmlFor="Res_POS_GRAD" className="block text-gray-700 font-bold w-1/4">
        Res.POS./GRAD:
      </label>
      <input
        type="text"
        onChange={(event) => setPosGradResponsavel(event.target.value)}
        id="Res_POS_GRAD"
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
        onChange={handleHardwareCheck}
        id="hardware"
        className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
        />
      <label htmlFor="software">Software</label>
      <input
        type="checkbox"
        value="sofware"
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
     <div className="flex mb-4">
     <label htmlFor="log_anexados" className="block text-gray-700 font-bold w-1/4">
       Logs Anexos
     </label>
     <input
       type="text"
       id="log_anexados"
       onChange={(event) => setLogsAnexados(event.target.value)}
       className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
       />
     </div>
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
        Descrição:
      </label>
      <input
        type="text"
        id="descricao"
        onChange={(event) => setDescricao(event.target.value)}
        className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
      />
    </div>
    <div className="flex justify-center w-full ">
    <div className="flex justify-end w-1/2 ">
    {
              !loading ?

                (<button className="bg-blue-300 ml-4 hover:bg-blue-400 hover:ring-blue-500  ring-offset-0 font-black  ring ring-blue-400 outline-none  p-1 text-white text-xl w-3/6 rounded-xl cursor-pointer"
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