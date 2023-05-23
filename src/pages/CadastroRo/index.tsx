import { useState } from "react";
import Menu from "../../components/menus";
import "./cadastro.css"
import Loader from "../../components/loader";
   


function CadastroRo () {
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
  const [logsAnexados, setLogsAnexados] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleHardwareCheck = () => {
    setHardwareChecked(!hardwareChecked);
    setSoftwareChecked(false);
  };

  const handleSoftwareCheck = () => {
    setSoftwareChecked(!softwareChecked);
    setHardwareChecked(false);
  };

return(
<div className="flex flex-wrap flex-row">
    <div>
    <Menu/>
    </div>
    {/* {conteudo fica aqui} */}
    <div id="conteudo" className="mt-16  bg-white flex-1">
      <div className="p-10 flex items-center flex-col">
        <h1 className="text-xl text-black font-semibold">
          Novo Registro de Ocorrência
        </h1>
        <div className="flex flex-col mt-4 w-3/4">
        <div className="flex mb-4">
      <label htmlFor="contrato" className="block text-gray-700 font-bold w-1/4">
        Contrato:
      </label>
      <input
        type="text"
        id="contrato"
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
        className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
      />
    </div>
    <div className="flex mb-4">
      <label htmlFor="Relator" className="block text-gray-700 font-bold w-1/4">
        Relator:
      </label>
      <input
        type="text"
        id="Relator"
        className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
      />
    </div>
    <div className="flex mb-4">
      <label htmlFor="POS./GRAD" className="block text-gray-700 font-bold w-1/4">
        POS./GRAD:
      </label>
      <input
        type="text"
        id="POS_GRAD"
        className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
      />
    </div>
    <div className="flex mb-4">
      <label htmlFor="Responsavel/supervisor do centro" className="block text-gray-700 font-bold w-1/4">
        Responsavel/centro:
      </label>
      <input
        type="text"
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
        className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
      />
    </div>
    <div className="flex justify-center w-full ">
    <div className="flex justify-end w-1/2 ">
    {
              !loading ?

                (<button className="bg-blue-300 ml-4 hover:bg-blue-400 hover:ring-blue-500  ring-offset-0 font-black  ring ring-blue-400 outline-none  p-1 text-white text-xl w-3/6 rounded-xl cursor-pointer"
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