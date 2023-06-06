import "../../styles/global.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../contexts/auth";


function Termo() {
    const navigate = useNavigate()
    const [termoInfo, setTermoInfo] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const { signOut, usuario } = useAuth()
    
    useEffect(() => {
        (async () => {
            try {
                const response = await api.get('/termo/');

                setTermoInfo(response.data)
            } catch (response) {
                setErrorMessage(response.data.msg);
            }
        })();
    }, []);
    
    const accept = async () => {
        try {
            await api.post('/termo/accept/', {usuario: usuario._id, versaoTermo: termoInfo._id});
            navigate('/')
        } catch (error) {
            console.error(error);
        }
    }
    
    return (
        <div className="h-screen bg-gray-100 w-screen flex-col flex items-center">
        <div className="w-2/3 h-4/5 flex justify-center items-center flex-col p-8 mt-12">
            <h1 className="text-blue-900 text-5xl font-black mb-4" >Reportify</h1>
            <h2 className="mt-5 text-4xl text-center text-blue-900 font-bold mb-7">Atualização do Termo</h2>
            <p className="mb-5 text-center">Uma nova versão {termoInfo && `(${termoInfo._id})`} de termo de compromisso foi adicionada.</p>
            {errorMessage && <p className="mb-5 text-red-600">{errorMessage}</p>}
            <p className="mb-8"><a className="text-blue-800 text-center cursor-pointer" href={termoInfo && termoInfo.url}>Clique aqui</a>, para mais informações</p>
            <button className="bg-blue-300 hover:bg-blue-400 hover:ring-blue-500  ring-offset-0 font-black  ring ring-blue-400 outline-none  p-1 text-white text-lg w-3/6 rounded-xl cursor-pointer mb-7"
            onClick={accept}>
                Estou ciente do Termo de Compromisso
            </button>
            <button className="outline-none">
                <p className="text-blue-800 text-center cursor-pointer text-lg" onClick={signOut}>Sair</p>
            </button>   
            </div>
        </div>
    );
};


export default Termo