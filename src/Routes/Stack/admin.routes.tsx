// import Login from '../../pages/Login';
import Home from '../../pages/Home'
import {Routes , Route}  from "react-router-dom";
import CadastroRo from '../../pages/CadastroRo';
import TabelaRo from '../../pages/TabelaRO';
import MembroSuporte from '../../pages/Membro_suporte';
import CadastroUsuario from '../../pages/CadastroUsuario';
import EditarUsuario from '../../pages/EditarUsuario';
import Contatos from '../../pages/Contatos';
import Notificacao from '../../pages/Notificacoes';
import Backup from '../../pages/backup';
 

export default function Routas() {
        return(
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='*' element={<Home/>}/>
        <Route path='/home' element={<Home/>}/>
        {/* <Route path="backup" element={<Backup/>}/> */}
        <Route path='/CadastroRo' element={<CadastroRo/>}/>
        <Route path='/tabelaRo' element={<TabelaRo/>}/>
        <Route path='/membroSuporte' element={<MembroSuporte/>}/>
        <Route path='/cadastroUsuarios' element={<CadastroUsuario/>}/>
        <Route path='/editarUsuarios' element={<editarUsuario/>}/>
        <Route path='/contatos' element={<Contatos/>}/>
        <Route path='/notificacao' element={<Notificacao/>}/>
    </Routes>
        )
}