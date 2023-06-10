import React, { useState, useEffect } from 'react';
// import RNFetchBlob from 'rn-fetch-blob';
import Menu from '../../components/menus';
import api from '../../services/api';
import { useAuth } from '../../contexts/auth';
import { Navigate, useParams } from 'react-router-dom';
import LoaderRo from "../../components/loader/loaderRo";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../components/loader';

interface Fase {
    label: string;
    value: string;
  }
  

const EditaRos = () => {
  const { usuario } = useAuth(); 
    const [loading, setLoading] = useState(false);
    // const [loading1, setLoading1] = useState(true);
    

    const { _id } = useParams();
    const [descricao, setDescricao] = useState('');
    const [contrato, setContrato] = useState('');
    const [orgao, setOrgao] = useState('');
    const [dataRegistro, setDataRegistro] = useState('');
    const [classDefeito, setClassDefeito] = useState('');
    const [versaoBaseDados, setVersaoBaseDados] = useState('');
    const [versaoSoftware, setVersaoSoftware] = useState('');
    const [logsAnexado, setLogsAnexado] = useState('');
    const [equipamento, setEquipamento] = useState('');
    const [equipPosicao, setEquipPosicao] = useState('');
    const [partNumber, setPartNumber] = useState('');
    const [serialNumber, setSerialNumber] = useState('');
    const [procedTecnicos , SetProcedTecnicos] = useState('')
    const [tituloOcorrencia, setTituloOcorrencia] = useState('');
    const [descricaoOcorrencia, setDescricaoOcorrencia] = useState('');
    const [nome, setNome] = useState('');
    const [nomeRelator, setNomeRelator] = useState('');
    const [posGradResponsavel, setPosGradResponsavel] = useState('');
    const [nomeResponsavel, setNomeResponsavel] = useState('');
    const [posGradRelator,setPosGradRelator] = useState('');
    const [fase, setFase] = useState('')
    const [update, setUpdate] =  useState(false)
    const [melhoria, setMelhoria] = useState()
    const [categoria, setCategoria] = useState('')
    const [classificacao, setClassificacao] = useState('');
    const [ro, setRo] = useState([]);
    const [isEditable, setIsEditable] = useState(false);
    const [visible , setVisible] = useState(false)
    const [visi , setVisi] = useState(false)
    // const [procedTecnicos, setProcedTecnicos] = useState('')
    const [defeito, setDefeito] = useState('')
    const [outros, setOutros] = useState('')
    const [situacao, setSituacao] = useState('')
    const [justificativaReclassificacao, setJustificativaReclassificacao] = useState('')
    const [validacaoFechamentoRo, setValidacaoFechamentoRo] = useState('')
    const [justificativaFechamento, setJustificativaFechamento] = useState('')
    // const [usuarios, setUsuarios] = useState()
    const [idcolaboradorIACIT, setIdColaboradorIACIT] = useState()
    const [errorMessage, setErrorMessage] = useState()
    const [usuarios, setUsuarios] = useState([])

    const fases: Fase[] = [
        { label: 'Pendente', value: 'pendente' },
        { label: 'Em andamento', value: 'andamento' },
        { label: 'Aguardando validação', value: 'validacao' },
        { label: 'Concluido', value: 'concluido' },
      
      ];
      const defeitos: Fase[] = [
        { label: 'Critico', value: 'critico' },
        { label: 'Alto', value: 'alto' },
        { label: 'Baixo', value: 'baixo' },
      ];
      const classificacaoo: Fase[] = [
        { label: 'Defeito', value: 'defeito' },
        { label: 'Melhoria', value: 'melhoria' },
        { label: 'Outros', value: 'outros' },
      ];
      const melhorias: Fase[] = [
        { label: 'Funcionalidade existente', value: 'funcionalidade existente' },
        { label: 'Funcionalidade não existente', value: 'funcionalidade nao existente' },
      ];
      const outross: Fase[] = [
        { label: 'Investigação', value: 'investigacao' },
        { label: 'Causa Externa', value: 'causa externa' },
      ];
      const Situacao: Fase[] = [
        { label: 'Aberto', value: 'Aberto' },
        { label: 'Encerrado', value: 'Encerrado' },
        { label: 'Recusado', value: 'Recusado' }
      ];
     
    useEffect(() => {
      (async () => {
        try {
          const response = await api.get(`/ro/${_id}`);
          setRo(response.data);
          setTituloOcorrencia(response.data.tituloOcorrencia);
          setOrgao(response.data.orgao);
          setContrato(response.data.contrato);
          setDataRegistro(response.data.dataRegistro);
          setNomeRelator(response.data.relator.id.nome);
          setNomeResponsavel(response.data.responsavel.nome);
          setPosGradRelator(response.data.relator.posGrad);
          setPosGradResponsavel(response.data.responsavel.posGrad);
          setClassDefeito(response.data.classDefeito);
          setDescricaoOcorrencia(response.data.descricaoOcorrencia);
          setValidacaoFechamentoRo(response.data.validacaoFechamentoRo);
          if (response.data.justificativaFechamento) {
            setJustificativaFechamento(response.data.justificativaFechamento)
          }
          if (response.data.classDefeito === "hardware") {
            setEquipamento(response.data.opcoesHardware.equipamento);
            setEquipPosicao(response.data.opcoesHardware.equipPosicao);
            setPartNumber(response.data.opcoesHardware.partNumber);
            setSerialNumber(response.data.opcoesHardware.serialNumber);
          }
          if (response.data.classDefeito === "software") {
            setVersaoBaseDados(response.data.opcoesSoftware.versaoBaseDados);
            setVersaoSoftware(response.data.opcoesSoftware.versaoSoftware);
            setLogsAnexado(response.data.opcoesSoftware.logsAnexado);
          }
          if (response.data.suporte) {
            setFase(response.data.suporte.fase);
            setDefeito(response.data.suporte.defeito);
            setClassificacao(response.data.suporte.classificacao);
            setCategoria(response.data.suporte.categoria);
            setMelhoria(response.data.suporte.melhoria);
            setOutros(response.data.suporte.outros);
            setJustificativaReclassificacao(response.data.suporte.justificativaReclassificacao);
            if (response.data.suporte.colaboradorIACIT) {
              setIdColaboradorIACIT(response.data.suporte.colaboradorIACIT.id._id);
            }
          } else {
            setFase('pendente')
          }
          
          setDescricaoOcorrencia(response.data.descricaoOcorrencia);
          setValidacaoFechamentoRo(response.data.validacaoFechamentoRo);
          if (response.data.classDefeito === "hardware") {
            setEquipamento(response.data.opcoesHardware.equipamento);
            setEquipPosicao(response.data.opcoesHardware.equipPosicao);
            setPartNumber(response.data.opcoesHardware.partNumber);
            setSerialNumber(response.data.opcoesHardware.serialNumber);
          }
          if (response.data.classDefeito === "software") {
            setVersaoBaseDados(response.data.opcoesSoftware.versaoBaseDados);
            setVersaoSoftware(response.data.opcoesSoftware.versaoSoftware);
            setLogsAnexado(response.data.opcoesSoftware.logsAnexado);
          }
          if (response.data.suporte) {
            if(response.data.suporte.melhoria){
              setMelhoria(response.data.suporte.melhoria);
            }
            if(response.data.suporte.outros){
              setOutros(response.data.suporte.outros);
            }
            if(response.data.suporte.defeito){
              setDefeito(response.data.suporte.defeito);
            }
            if(response.data.suporte.fase){
              setFase(response.data.suporte.fase);
            }
            if(response.data.suporte.classificacao){
              setClassificacao(response.data.suporte.classificacao);
            }
            if(response.data.suporte.categoria){
              setCategoria(response.data.suporte.categoria);
            }
            if(response.data.suporte.defeito){
              setJustificativaReclassificacao(response.data.suporte.justificativaReclassificacao);
            }    
            if (response.data.suporte.colaboradorIACIT) {
              setNome(response.data.suporte.colaboradorIACIT.id.nome);
              setIdColaboradorIACIT(response.data.suporte.colaboradorIACIT.id._id);
            }
          }
          
          setLoading(false)
        } catch (response) {
           setErrorMessage(response.data)
        }
        setLoading(false)
      })();
          
    },[] );

    useEffect(() => {
      (async () => {
        try {


        const response2 = await api.get('/usuario')
          setUsuarios(response2.data)
          console.log(response2.data)
        } catch (response) {
           setErrorMessage(response.data)
        }
        setLoading(false)
      })();
          
    },[] );
    async function handelAtualizar() {
      setLoading(true)

      try{
        const response = await api.patch(`/ro/suporte/${_id}`,
        {
            categoria,
            fase, 
            idcolaboradorIACIT,
            melhoria,
            classificacao, 
            nome,
            outros, 
            procedTecnicos,
            defeito,
            justificativaReclassificacao,
            validacaoFechamentoRo
          }, );
          roni()
          console.log(categoria + fase + idcolaboradorIACIT + classificacao )
      }catch (response){
        setErrorMessage(response.data)
      }
      setLoading(false);

    }

     async function EditarRoa() {
      setIsEditable(!isEditable);  
      setVisible(!visible) 
      setVisi(!visi)
    }
    async function ConfimarRo() {
      setLoading(true)
      try{
        const response = await api.patch(`/ro/cliente/${_id}`,
        {
                  descricao,
                  contrato,
                  orgao,
                  dataRegistro,
                  classDefeito,
                  versaoBaseDados,
                  versaoSoftware,
                  logsAnexado,
                  equipamento,
                  equipPosicao,
                  partNumber,
                  serialNumber,
                  tituloOcorrencia,
                  descricaoOcorrencia,
                  nomeRelator,
                  posGradRelator,
                  posGradResponsavel,
                  nomeResponsavel,
                  idRelator: usuario._id
          }, );
          roni()
      }catch (response){
        setErrorMessage(response.data.msg);
      }
      setLoading(false);
    }

    async function ValidarRo() {
      setLoading(true)
      try{
        const response = await api.patch(`/ro/close/${_id}`,
        {
          validacaoFechamentoRo,
          justificativaFechamento
          }, );
        roni()
      }catch (response){
        setErrorMessage(response.data.msg);
      }
      setLoading(false);
    }

    function formatarData(dataInput: String){
      const data = new Date(dataInput)
      const dia  = data.getDate().toString()
      const diaF = (dia.length == 1) ? '0' + dia : dia
      const mes  = (data.getMonth() + 1).toString()
      const mesF = (mes.length == 1) ? '0' + mes : mes
      const anoF = data.getFullYear()
      const hora = data.getHours()
      const minuto = data.getMinutes()
      const segundo = data.getSeconds()
      return diaF + "/" + mesF + "/" + anoF + " às " + hora + ":" + minuto + ":" + segundo
    }
    async function roni () {
        toast.success('Atualização concluida com sucesso', {
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
        setUpdate(true)
        },3000)
      }

  return (
            <>
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
          Atualizar o Ro 
        </h1>    
        {
        !!errorMessage && 
        <>
        <h1 className="text-red-900">{errorMessage}</h1>
          </>
        }
        
        <div className="flex flex-col mt-4 w-3/4">
        <div className="flex mb-4">
      <label htmlFor="contrato" className="block text-gray-700 font-bold w-1/4">
        Contrato:
      </label>
      <input 
      disabled
        type="text"
        id="contrato"
        value={contrato}
        onChange={(event) => setContrato(event.target.value)}
        className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
      />
    </div>
    <div className="flex mb-4">
      <label htmlFor="orgao" className="block text-gray-700 font-bold w-1/4">
        Orgão:
      </label>
      <input 
      disabled
        type="text"
        id="orgao"
        value={orgao}
        onChange={(event) => setOrgao(event.target.value)}
        className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
      />
    </div>
    
    <div className="flex mb-4">
      <label htmlFor="POS./GRAD" className="block text-gray-700 font-bold w-1/4">
        POS./GRAD:
      </label>
      <input 
      disabled
        type="text"
        value={posGradRelator}
        id="POS_GRAD"
        onChange={(event) => setPosGradRelator(event.target.value)}
        className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
      />
    </div>
    <div className="flex mb-4">
      <label htmlFor="Responsavel/supervisor do centro" className="block text-gray-700 font-bold w-1/4">
        Responsável/centro:
      </label>
      <input 
      disabled
        type="text"
        value={nomeResponsavel}
        onChange={(event) => setNomeResponsavel(event.target.value)}
        id="Responsavel/supervisor do centro"
        className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
      />
    </div>
    <div className="flex mb-4">
      <label htmlFor="Res_POS_GRAD" className="block text-gray-700 font-bold w-1/4">
        Res.POS./GRAD:
      </label>
      <input 
      disabled
        type="text"
        value={posGradResponsavel}
        onChange={(event) => setPosGradResponsavel(event.target.value)}
        id="Res_POS_GRAD"
        className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
      />
    </div>

<div className="flex mb-4">
    <label htmlFor="defeito" className="block text-gray-700 font-bold w-1/4">
        Defeito :
    </label>
    <input 
    disabled
      type="text"
      id="defeito"
      value={classDefeito}
      onChange={(event) => setDefeito(event.target.value)}
      className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
      />
    </div>
    { classDefeito == "hardware" && (
        <>
    
    <div className="flex mb-4">
    <label htmlFor="Equipamento" className="block text-gray-700 font-bold w-1/4">
    Equipamento:
    </label>
    <input 
    disabled
      type="text"
      value={equipamento}
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
    disabled
      type="text"
      id="Posicao"
      value={equipPosicao}
      onChange={(event) => setEquipPosicao(event.target.value)}
      className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
      />
    </div>
    <div className="flex mb-4">
    <label htmlFor="partNumber" className="block text-gray-700 font-bold w-1/4">
    Part Number:
    </label>
    <input 
    disabled
      type="text"
      value={partNumber}
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
    disabled
      type="text"
      id="serialNumber"
      value={serialNumber}
      onChange={(event) => setSerialNumber(event.target.value)}
      className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
      />
    </div>
    
    
      </>
    )

    }


      
{ classDefeito == "sofware" && (
      <>
       <div className="flex mb-4">
       <label htmlFor="versao_base" className="block text-gray-700 font-bold w-1/4">
       Versão da base de dados:
       </label>
       <input 
       disabled
         type="text"
         value={versaoBaseDados}
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
     disabled
       type="text"
       id="vesaosoftware"
       value={versaoSoftware}
       onChange={(event) => setVersaoSoftware(event.target.value)}
       className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
       />
     </div>
     {/* { usuario && usuario.perfil === 'cliente' && */}
     {/* <div className="flex mb-4">
     <label htmlFor="log_anexados" className="block text-gray-700 font-bold w-1/4">
       Logs Anexos
     </label>
     <input 
     disabled
       type="file"
       id="log_anexados"
       name=""
       onChange={(event) => setLogsAnexados(event.target.files[0])}
       className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
       />
     </div> */}
     {/* } */}
      </>
    )

    }
    <div className="flex mb-4">
      <label htmlFor="titulo" className="block text-gray-700 font-bold w-1/4">
        Titulo:
      </label>
      <input 
      disabled
        type="text"
        id="titulo"
        value={tituloOcorrencia}
        onChange={(event) => setTituloOcorrencia(event.target.value)}
        className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
      />
    </div>
    <div className="flex mb-4">
      <label htmlFor="descricao" className="block text-gray-700 font-bold w-1/4">
        Descrição:
      </label>
      <input 
      disabled
        type="text"
        id="descricao"
        value={descricaoOcorrencia}
        onChange={(event) => setDescricao(event.target.value)}
        className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
      />
    </div>
    <div className="flex mb-4">
    <label htmlFor="fase" className="block text-gray-700 font-bold w-1/4">
        Situação:
      </label>
      <select
      name="fase"
      className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
      onChange={e => setFase(e.target.value)}
      id="fase"
      value={fase}
      >
    <option disabled selected>
    {fase}
  </option>
      { fases && fases.map((relator) => (
      <option key={relator.value} value={relator.value}>{relator.label}</option>
      ))}
    </select>
    </div>
    <div className="flex mb-4">
    <label htmlFor="classicao" className="block text-gray-700 font-bold w-1/4">
        Classificação :
      </label>
      <select
      name="classicao"
      value={classificacao}
      className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
      onChange={e => setClassificacao(e.target.value)}
      id="classicao"
      >
    <option disabled selected>
    {classificacao}
  </option>
      { classificacaoo && classificacaoo.map((relator) => (
      <option key={relator.value} value={relator.value}>{relator.label}</option>
      ))}
    </select>
    </div>
   { classificacao == "defeito" &&
    <div className="flex mb-4">
    <label htmlFor="defeito" className="block text-gray-700 font-bold w-1/4">
        Defeito :
      </label>
      <select
      name="defeito"
      className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
      onChange={e => setDefeito(e.target.value)}
      id="defeito"
      
      >
    <option disabled selected>
    {defeito}
  </option>
      { defeitos && defeitos.map((relator) => (
      <option key={relator.value} value={relator.value}>{relator.label}</option>
      ))}
    </select>
    </div>}
    { classificacao == "melhoria" &&
     <div className="flex mb-4">
    <label htmlFor="Melhoria" className="block text-gray-700 font-bold w-1/4">
        Melhoria :
      </label>
      <select
      name="Melhoria"
      className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
      onChange={e => setMelhoria(e.target.value)}
      id="Melhoria"
      >
    <option disabled selected>
    {melhoria}
  </option>
      { melhorias && melhorias.map((relator) => (
      <option key={relator.value} value={relator.value}>{relator.label}</option>
      ))}
    </select>
    </div>}
    { classificacao == "outros" &&
    <div className="flex mb-4">
    <label htmlFor="outro" className="block text-gray-700 font-bold w-1/4">
        Outros :
      </label>
      <select
      name="outro"
      className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
      onChange={e => setOutros(e.target.value)}
      id="outro"
      >
    <option disabled selected>
    {outros}
  </option>
      { outross && outross.map((relator) => (
      <option key={relator.value} value={relator.value}>{relator.label}</option>
      ))}
    </select>
    </div>}
    <div className="flex mb-4">
      <label htmlFor="Categoria" className="block text-gray-700 font-bold w-1/4">
        Categoria:
      </label>
      <input 
        type="text"
        id="Categoria"
        value={categoria}
        onChange={(event) => setCategoria(event.target.value)}
        className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
      />
    </div>
    <div className="flex mb-4">
    <label htmlFor="responsavel" className="block text-gray-700 font-bold w-1/4">
        Responsavel :
      </label>
      <select
      name="responsavel"
      className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
      onChange={e => setIdColaboradorIACIT(e.target.value)}
      id="responsavel"
      value={idcolaboradorIACIT}
      >
    <option disabled selected>
    Selecione
  </option>
      { usuarios && usuarios.map((relator) => (
      <option key={relator._id} value={relator._id}>{relator.nome}</option>
      ))}
    </select>
    </div>
    <div className="flex mb-4">
      <label htmlFor="Justificativa" className="block text-gray-700 font-bold w-1/4">
        Justificativa Reclassificação:
      </label>
      <input 
        type="text"
        id="Justificativa"
        value={justificativaReclassificacao}
        onChange={(event) => setJustificativaReclassificacao(event.target.value)}
        className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
      />
    </div>
    <div className="flex mb-4">
    <label htmlFor="validacao" className="block text-gray-700 font-bold w-1/4">
        Validação :
      </label>
      <select
      disabled={usuario.perfil === "cliente" ? false : true}
      name="validacao"
      className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
      onChange={e => setValidacaoFechamentoRo(e.target.value)}
      id="validacao"
      >
    <option disabled selected>
    Selecione
  </option>
      { Situacao && Situacao.map((relator) => (
      <option key={relator.value} value={relator.value}>{relator.label}</option>
      ))}
    </select>
    </div>

    {
        validacaoFechamentoRo === "Recusado" &&
        <div className="flex mb-4">
      <label htmlFor="Justificativa" className="block text-gray-700 font-bold w-1/4">
        Justificativa Recusão:
      </label>
      <input 
        type="text"
        id="Justificativa"
        value={justificativaFechamento}
        onChange={(event) => setJustificativaFechamento(event.target.value)}
        className="border-b border-gray-400 focus:border-primary focus:outline-none px-2 py-0 flex-grow"
        disabled={usuario.perfil === "cliente" ? false : true}
      />
    </div>
    }
       {
        !!errorMessage && 
        <>
        <h1 className="text-red-900">{errorMessage}</h1>
          </>
        }
    {!loading ?
          (<button className="bg-blue-300 hover:bg-blue-400 hover:ring-blue-500 ring-offset-0 font-black ring ring-blue-400 outline-none  p-1 text-white text-xl w-3/6 rounded-xl cursor-pointer"
            onClick={fase === "validacao" && usuario.perfil === "cliente" ? ValidarRo : handelAtualizar}> Atualizar Ro </button>)
            : (
            <div className="bg-blue-300 ring-offset-0 font-black ring ring-blue-400 flex justify-center p-1 items-center w-3/6 text-white text-xl rounded-xl">
              <Loader />
            </div>
                  )
          }


    <div className="flex justify-center w-full ">
    <div className="flex justify-end w-1/2 ">


    {update && (
      <>
          <Navigate to="/tabelaRo" replace={true} />
      </> 
        )}
        

</div>
</div>
        </div>
      </div>
  </div>
</div>
            </>
  );
};

export default EditaRos;