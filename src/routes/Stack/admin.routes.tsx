import { BrowserRouter, Route, Routes as Switch, Navigate } from "react-router-dom";
import Login from "../../pages/Login";
import Home from "../../pages/home";


export default function AdminRoutes(){
    return (
        <BrowserRouter>
        <Switch>
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/"  element={<Home/>} />
            <Route path="/login" element={<Login/>}/>
            {/* <Route path="/RedefinirSenha" />
            <Route path="/EmailRedefinicao" /> */}
        </Switch>
        </BrowserRouter>
        )
}