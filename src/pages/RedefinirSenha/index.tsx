import { Link, useParams } from "react-router-dom";
// import { useAuth } from "../../contexts/auth";
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import "../../styles/global.css";
import { useState } from "react";
import Loader from "../../components/loader";
import { useAuth } from "../../contexts/auth";
import { useNavigate } from "react-router-dom";


function RedefinirSenha() {
    const { id, firstTime } = useParams();

    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfimarSenha] = useState('')
    const [termo, setTermo] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [errorTermoMessage, setErrorTermoMessage] = useState('');

    const { signOut } = useAuth()

    const handleTermoCheck = () => {
        setTermo(!termo);
    };

    const salvarSenha = async() => {
        signOut()
        setErrorMessage('');
        setErrorTermoMessage('');
        setLoading(true);
        try {
            if (termo || firstTime === 'false') {
            const response = await api.patch('/usuario/password/' + id, {senha, confirmarSenha});

            Alert.alert(response.data.msg);
            setSenha('')
            setConfirmarSenha('')
            navigation.navigate('Login');
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
        {!!errorMessage && <h1 className="text-red-800 text-2xl">{errorMessage}</h1>}
        <div className="w-2/3 h-4/5 flex justify-center items-center flex-col p-8">
            <h1 className="text-blue-900  text-5xl font-black mb-4" >Reportify</h1>
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
                onChange={(event) => setConfimarSenha(event.target.value)}
                />
            </div>
            {firstTime === 'true' && (
                <div className="flex flex-row items-center">
                    <input className="mx-5" type="checkbox" checked={termo} onChange={handleTermoCheck}/>
                    <p>
                        <span>Estou ciente do&nbsp;</span>
                        <Link to='https://docs.google.com/document/d/e/2PACX-1vS95FEPOWKp-Kp2GidnxjKPfdNse9LGssZFxurbmqgSw09eIIfwxXjvZUmzr0UwWLLt5XviUjmHXQE8/pub'><span className="text-blue-800 text-center">Termo de Compromisso do app.</span></Link>
                    </p>
                    {errorTermoMessage && <p>{errorTermoMessage}</p>}
                </div>
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