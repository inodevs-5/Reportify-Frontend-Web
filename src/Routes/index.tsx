import Login from '../pages/Login';
import Home from '../pages/Home'
import {Routes , Route}  from "react-router-dom";
import CadastroRo from '../pages/CadastroRo';


export default function Routas() {
        return(
    <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/home' element={<Home/>}/>
        <Route path='/CadastroRo' element={<CadastroRo/>}/>
    </Routes>
        )
}