import { Switch } from "@mui/material";
import Menu from "../../components/menus";
import { useAuth } from "../../contexts/auth";
import api from "../../services/api";
import { useState } from "react";

function Perfil () {

    const { usuario, signOut, updateEmail } = useAuth()

    const [isEnabled, setIsEnabled] = useState(usuario.email_notificacao);

    const toggleSwitch = async () => {
        try {
          const response = await api.patch('/notificacao/email', {id:usuario._id});
          accept()
    
          updateEmail()
    
        } catch (error) {
          console.error(error);
        }
        
        setIsEnabled(previousState => !previousState);
    }

    const accept = async () => {
        try {
          await api.post('/notificacao/accept/', {id:usuario._id});
    
        } catch (error) {
          console.error(error);
        }
    }    

    return(
        <div className="flex flex-wrap flex-row">
        <Menu/>
            <div id="conteusdo" className="mt-16 w-full flex-1">
            <div className="p-10 flex items-center flex-col">
                <p className="text-3xl mb-5 font-black">Perfil</p>
                <p className="text-xl mb-5 font-black">Informações do Usuário:</p>
                <p className="mb-3"><span className="bold font-black">Nome: </span>{usuario.nome}</p>
                <p className="mb-3"><span className="bold font-black">Email: </span>{usuario.email}</p>
                <p className="mb-3"><span className="bold font-black">Perfil: </span>{usuario.perfil === "admin" ? "Administrador" : "Cliente"}</p>
                <p className="mb-3"><span className="bold font-black">Empresa: </span>{usuario.empresa}</p>
                <p className="mb-7"><span className="font-black">Contato da Empresa: </span>{usuario.contato_empresa}</p>
                <p className="mb-3"><span className="font-black">Notificações por email: </span></p>
                <Switch onChange={toggleSwitch} checked={isEnabled} />
                <p onClick={signOut} className="mb-3 mt-7 text-blue-800 text-center cursor-pointer font-bold">Sair</p>
            </div>      
            </div>
        </div>
    );
}

export default Perfil