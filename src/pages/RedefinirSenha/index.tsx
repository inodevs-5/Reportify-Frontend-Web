import { Link, useParams } from "react-router-dom";
import "../../styles/global.css";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import { useAuth } from "../../contexts/auth";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";


function RedefinirSenha() {
    const { id, firstTime } = useParams();

    const navigate = useNavigate();

    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('')
    const [termo, setTermo] = useState(false);
    const [termoInfo, setTermoInfo] = useState();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [errorTermoMessage, setErrorTermoMessage] = useState('');

    const { signOut } = useAuth()

    const handleTermoCheck = () => {
        setTermo(!termo);
      };
    
      useEffect(() => {
        (async () => {
          try {
              const response = await api.get('/termo/');

              console.log(termoInfo)
              setTermoInfo(response.data)
          } catch (response) {
            setErrorMessage(response.data.msg);
          }
        })();
      }, []);
    
      const salvarSenha = async() => {
        signOut()
        setErrorMessage('');
        setErrorTermoMessage('');
        setLoading(true);
          try {
            if (termo || firstTime === 'false') {
              if (firstTime === 'true') {
                await api.post('/termo/accept', {usuario: id, versaoTermo: termoInfo._id});
              }
    
              const response = await api.patch('/usuario/password/' + id, {senha, confirmarSenha});

              setSenha('')
              setConfirmarSenha('')
              navigate('/', {state: {msg: response.data.msg}});
            } else {
              setErrorTermoMessage('É necessário aceitar o termo.');
            }
          } catch (response) {
            setErrorMessage(response.data.msg);
          }
        setLoading(false);
      };
    

    return (
        <div className="h-screen bg-gray-100 w-screen flex-col flex items-center">
        <div className="w-2/3 h-4/5 flex justify-center items-center flex-col p-8 mt-12">
            <h1 className="text-blue-900 text-5xl font-black mb-4" >Reportify</h1>
            <h2 className="mt-5 text-4xl text-center text-blue-900 font-bold mb-4">Redefinição de senha</h2>
            <h2 className="mb-4">Insira sua senha.</h2>
            {errorMessage && <p className="mb-5 text-red-600">{errorMessage}</p>}
            <div className="grid gap-8 w-1/3">
            <div>
                <input
                className="bg-gray-300 p-2 pl-3 w-full outline-none shadow-md rounded-xl"
                type="password"
                placeholder="Senha"
                onChange={(event) => setSenha(event.target.value)}
                value={senha}
                />
            </div>
            <div className="flex-row p-1 bg-gray-300 flex items-center  shadow-md rounded-xl justify-between">
                <input
                className="bg-gray-300 p-1 pl-3 outline-none w-full  rounded-xl"
                type="password"
                placeholder="Confirmar senha"
                value={confirmarSenha}
                onChange={(event) => setConfirmarSenha(event.target.value)}
                />
            </div>
            {errorTermoMessage && <p className="text-red-600 text-center">{errorTermoMessage}</p>}
            {firstTime === 'true' && (
                <>
                {
                    termoInfo &&
                    <div className="flex flex-row items-center">
                    <input className="mx-5" type="checkbox" checked={termo} onChange={handleTermoCheck}/>
                    <p>
                        <span>Estou ciente do&nbsp;</span>
                        <a href={termoInfo.url} target="_blank"><span className="text-blue-800 text-center">Termo de Compromisso.</span></a><br />
                        <span>{` (${termoInfo._id})`}</span>
                    </p>
                    </div>
                }
                </>
            )}
            <div className="flex flex-row items-center justify-around">
                {
                !loading ?
                    (<button className="bg-blue-300 hover:bg-blue-400 hover:ring-blue-500  ring-offset-0 font-black  ring ring-blue-400 outline-none  p-1 text-white text-xl w-3/6 rounded-xl cursor-pointer"
                    onClick={salvarSenha}>
                        Enviar
                    </button>)
                    : 
                    (<div className="bg-blue-300 ring-offset-0 font-black ring ring-blue-400 flex justify-center p-1  items-center  w-3/6  text-white text-xl rounded-xl ">
                        <Loader />
                    </div>)
                }
                </div>
                <button className="outline-none">
                    <Link to="/" >
                        <p className="text-blue-800 text-center cursor-pointer" >Voltar para página inicial</p>
                    </Link>
                </button>   
            </div>
        </div>
    </div>
    );
};


export default RedefinirSenha