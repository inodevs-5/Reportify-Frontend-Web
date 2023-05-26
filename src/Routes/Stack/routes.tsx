import Login from '../../pages/Login';
// import { propsNavigationStack } from "./Models";
import {Routes , Route , Navigate}  from "react-router-dom";
// import RedefinirSenha from "../../Pages/RedefinirSenha";
// import EmailRedefinicao from "../../Pages/EmailRedenificao";

// const { Navigator, Screen } = createNativeStackNavigator<propsNavigationStack>()

export default function Rout () {

    return(
        <Routes>
            <Route path='*' element={<Login/>}  />
            <Route path='/login' element={<Login/>} />
            <Route path="/" element={<Login />} />
            {/* <Screen name="RedefinirSenha" component={RedefinirSenha}/>
            <Screen name="EmailRedefinicao" component={EmailRedefinicao}/> */}
        </Routes>
    )
}