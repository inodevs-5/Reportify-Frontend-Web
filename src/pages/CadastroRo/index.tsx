import { useState } from "react";
import Menu from "../../components/menus";
import "./cadastro.css"
   


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

  const [loading, setLoading] = useState(true);

return(
<div className="flex flex-wrap flex-row">
    <div>
    <Menu/>
    </div>
    {/* {conteudo fica aqui} */}
    <div id="conteudo" className="mt-16  bg-white flex-1 ">
      <div className="p-10 flex items-center flex-col ">
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
    <div className="flex mb-4">
      <label htmlFor="Defeito" className="block text-gray-700 font-bold w-1/4">
        Defeito:
      </label>
      <input
        type="text"
        id="Defeito"
        className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
      />
    </div>
    <div className="flex mb-4">
      <label htmlFor="fase" className="block text-gray-700 font-bold w-1/4">
        fase:
      </label>
      <input
        type="text"
        id="fase"
        className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
      />
    </div>
    <div className="flex mb-4">
      <label htmlFor="fase" className="block text-gray-700 font-bold w-1/4">
        fase:
      </label>
      <input
        type="text"
        id="fase"
        className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
      />
    </div>
    <div className="flex mb-4">
      <label htmlFor="fase" className="block text-gray-700 font-bold w-1/4">
        fase:
      </label>
      <input
        type="text"
        id="fase"
        className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
      />
    </div>
    <div className="flex mb-4">
      <label htmlFor="fase" className="block text-gray-700 font-bold w-1/4">
        fase2:
      </label>
      <input
        type="text"
        id="fase"
        className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
      />
    </div>
    <div className="flex mb-4">
      <label htmlFor="fase" className="block text-gray-700 font-bold w-1/4">
        fase:
      </label>
      <input
        type="text"
        id="fase"
        className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
      />
    </div>
    <div className="flex mb-4">
      <label htmlFor="fase" className="block text-gray-700 font-bold w-1/4">
        fase:
      </label>
      <input
        type="text"
        id="fase"
        className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
      />
    </div>
    <div className="flex mb-4">
      <label htmlFor="fase" className="block text-gray-700 font-bold w-1/4">
        fase:
      </label>
      <input
        type="text"
        id="fase"
        className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
      />
    </div>


        </div>
      </div>
  </div>
</div>
);
}export default CadastroRo