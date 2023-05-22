import { BrowserRouter, Route, Routes as Switch, Navigate } from "react-router-dom";
import Login from "../../pages/Login";
import Home from "../../pages/Home";


export default function AuthRoutes(){
    return (
        <BrowserRouter>
        <Switch>
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/home" element={<Home/>} />
            <Route path="/login" element={<Login/>}/>
            <Route path="" />
            {/* <Route path="/RedefinirSenha" />
            <Route path="/EmailRedefinicao" /> */}
        </Switch>
        </BrowserRouter>
        )
}