
import Home from '../../pages/Home'
import {Routes , Route, Navigate}  from "react-router-dom";
import CadastroRo from '../../pages/CadastroRo';
import TabelaRo from '../../pages/TabelaRO';
import MembroSuporte from '../../pages/Membro_suporte';
import CadastroUsuario from '../../pages/CadastroUsuario';
import Contatos from '../../pages/Contatos';
import Notificacao from '../../pages/Notificacoes';
import Chat from '../../pages/Chat';
import EditarUsuario from '../../pages/EditarUsuario';


export default function AdminRoutes() {
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
        <Route path='/notificacao' element={<Notificacao/>}/>
        <Route path='/chat' element={<Chat/>}/>

    </Routes>
        )
}