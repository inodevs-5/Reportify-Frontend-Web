import AuthRoutes from "./Stack/auth.routes";
import Rout from "./Stack/routes";
import { useAuth } from "../contexts/auth";
import { BrowserRouter}  from "react-router-dom";
import AdminRoutes from "./Stack/admin.routes";
import Loader from "../components/loader";

export default function () {
    const { signed, loading, usuario } = useAuth();

    if (loading) {
        return (
            <>
            <Loader/>
            </>
        )
    }


   return (
        <BrowserRouter>
            {usuario && usuario.perfil == "admin" ? <AdminRoutes /> : signed ? <AuthRoutes /> : <Rout />}
        </BrowserRouter>
    )

}