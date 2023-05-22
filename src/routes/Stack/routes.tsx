import { BrowserRouter, Navigate, Route, Routes as Switch } from "react-router-dom";
import Login from "../../pages/Login";

export default function Routes () {
    return (
        <BrowserRouter>
        <Switch>
            <Route  path="*" element={<Navigate to=""/>}/>
            <Route  path="/login" element={<Login/>}/>
            <Route  path="/" element={<Login/>}/>
        </Switch>
        </BrowserRouter>
    )
}