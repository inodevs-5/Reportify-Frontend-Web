// import Login from '../../pages/Login';
import {Routes , Route, useNavigate}  from "react-router-dom";
import CadastroRo from '../../pages/CadastroRo';
import TabelaRo from '../../pages/TabelaRO';
import ListagemUsuario from '../../pages/Membro_suporte';
import CadastroUsuario from '../../pages/CadastroUsuario';
import EditarUsuario from '../../pages/EditarUsuario';
import Contatos from '../../pages/Contatos';
import Notificacoes from '../../pages/Notificacoes';
import Chat from '../../pages/Chat';
import Dashboard from '../../pages/Dashboard';
import Backup from '../../pages/Backup';
import EmailRedefinicao from '../../pages/EmailRedefinicao';
import RedefinirSenha from '../../pages/RedefinirSenha';
import Perfil from "../../pages/Perfil";
import EditaRos from '../../pages/EditarRo';
import { useEffect } from "react";
import api from "../../services/api";
import { useAuth } from "../../contexts/auth";
import Termo from "../../pages/Termo";

export default function Routas() {
    const navigate = useNavigate()
    const { usuario } = useAuth()
    
    useEffect(() => {
        (async () => {
            try {
                const response = await api.get('/termo/' + usuario._id);
                
                if (!response.data.status) {
                    navigate('/termo')
                }
            } catch (response) {
                console.log(response.data.msg);
            }
        })()
    }, [])

    return(
        <Routes>
            <Route path='/' element={<TabelaRo/>}/>
            <Route path='*' element={<TabelaRo/>}/>
            {/* <Route path="backup" element={<Backup/>}/> */}
            <Route path='/CadastroRo' element={<CadastroRo/>}/>
            <Route path='/tabelaRo' element={<TabelaRo/>}/>
            <Route path='/membroSuporte' element={<ListagemUsuario/>}/>
            <Route path='/cadastroUsuarios' element={<CadastroUsuario/>}/>
            <Route path='/editarRO/:_id' element={<EditaRos/>}/>
            <Route path='/editar/:_id' element={<EditarUsuario/>}/>
            <Route path='/contatos' element={<Contatos/>}/>
            <Route path='/notificacoes' element={<Notificacoes/>}/>
            <Route path='/chat/:id' element={<Chat/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/forceBackup' element={<Backup/>}/>
            <Route path='/emailRedefinicao' element={<EmailRedefinicao/>}/>
            <Route path="/senha/:id/:firstTime" element={<RedefinirSenha />}/>
            <Route path="/termo" element={<Termo />}/>
            <Route path='/perfil' element={<Perfil/>}/>
        </Routes>
    )
}