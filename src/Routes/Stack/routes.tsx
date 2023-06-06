import Login from '../../pages/Login';
// import { propsNavigationStack } from "./Models";
import {Routes , Route , Navigate}  from "react-router-dom";
// import RedefinirSenha from "../../Pages/RedefinirSenha";
import EmailRedefinicao from '../../pages/EmailRedefinicao';
import RedefinirSenha from '../../pages/RedefinirSenha';

// const { Navigator, Screen } = createNativeStackNavigator<propsNavigationStack>()

export default function Rout () {

    return(
        <Routes>
            <Route path='*' element={<Login/>}  />
            <Route path='/login' element={<Login/>} />
            <Route path="/" element={<Login />} />
            <Route path="/senha/:id/:firstTime/:token" element={<RedefinirSenha />}/>
            <Route path="/emailRedefinicao" element={<EmailRedefinicao/>}/>
        </Routes>
    )
}