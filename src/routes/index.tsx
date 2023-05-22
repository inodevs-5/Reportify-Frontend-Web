import React from "react"
import AuthRoutes from "./Stack/auth.routes";
import Routes from "./Stack/routes";
import { useAuth } from '../contexts/auth';
import AdminRoutes from "./Stack/admin.routes";
import Loader from "../components/loader";
import { Routes as Switch , BrowserRouter} from "react-router-dom";

export default function () {
    const { signed, loading, usuario } = useAuth();

    if (loading) {
        return (
         <>
         <Loader/>
         </>
        )
    }

    // const linking = {
    //     prefixes: ["app://reportify", "http://reportify-app-inodevs-2023"],
    //     config: {
    //         screens: {
    //             Login: {
    //                 path: ""
    //             },
    //             RedefinirSenha: {
    //                 path: "senha/:id/:firstTime",
    //                 parse: {
    //                     id: (id) => `${id}`,
    //                     firstTime: (firstTime) => `${firstTime}`
    //                 }
    //             }
    //         }
    //     }
    // }  

   return (
    <BrowserRouter>
        <Switch >
            {usuario && usuario.perfil == "admin" ? <AdminRoutes /> : signed ? <AuthRoutes /> : <Routes />}
        </Switch>
    </BrowserRouter>
    )

}