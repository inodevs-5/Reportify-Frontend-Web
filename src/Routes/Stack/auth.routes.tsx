
import Home from '../../pages/Home'
import {Routes , Route, Navigate, useNavigate}  from "react-router-dom";
import CadastroRo from '../../pages/CadastroRo';
import TabelaRo from '../../pages/TabelaRO';
import MembroSuporte from '../../pages/Membro_suporte';
import CadastroUsuario from '../../pages/CadastroUsuario';
import Contatos from '../../pages/Contatos';
import Chat from '../../pages/Chat';
import Notificacao from '../../pages/Notificacoes';
import Backup from '../../pages/Backup';
import RedefinirSenha from '../../pages/RedefinirSenha';
import EmailRedefinicao from '../../pages/EmailRedefinicao';
import EditarUsuario from '../../pages/EditarUsuario';
import Notificacoes from '../../pages/Notificacoes';
import Perfil from '../../pages/Perfil';
import { useAuth } from '../../contexts/auth';
import { useEffect } from 'react';
import api from '../../services/api';
import Termo from '../../pages/Termo';


export default function AdminRoutes() {

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
            <Route path="*" element={<Navigate to="/" />} />
            <Route path='/' element={<Home/>}/>
            <Route path='/CadastroRo' element={<CadastroRo/>}/>
            <Route path='/tabelaRo' element={<TabelaRo/>}/>
            {/* <Route path='/membroSuporte' element={<MembroSuporte/>}/> */}
            <Route path='/cadastroUsuarios' element={<CadastroUsuario/>}/>
            <Route path='/editarUsuarios' element={<EditarUsuario/>}/>
            <Route path='/contatos' element={<Contatos/>}/>
            <Route path='/notificacoes' element={<Notificacoes/>}/>
            <Route path='/chat/:id' element={<Chat/>}/>
            <Route path='/notificacao' element={<Notificacao/>}/>
            <Route path='/forceBackup' element={<Backup/>}/>
            <Route path='/emailRedefinicao' element={<EmailRedefinicao/>}/>
            <Route path="/senha/:id/:firstTime/:token" element={<RedefinirSenha />}/>
            <Route path="/termo" element={<Termo />}/>
            <Route path='/perfil' element={<Perfil/>}/>
        </Routes>
    )
}