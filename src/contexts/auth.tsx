import { createContext, useState, useEffect, useContext } from 'react'
import api from '../services/api';

interface AuthContextData {
    signed: boolean;
    usuario: object | null;
    signIn(email: string, password: string): Promise<void>,
    signOut(): void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({children}) => {
    const [usuario, setUsuario] = useState<object | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const storageUsuario = await localStorage.getItem('@Reportify:usuario');
            const storageToken = await localStorage.getItem('@Reportify:token');

            if (storageUsuario && storageToken) {
                setUsuario(JSON.parse(storageUsuario));
            }
            setLoading(false);
        })()
    }, [])

    async function signIn(email: string, senha: string) {
        const response = await api.post('/login', {
            email, senha
        });

        setUsuario(response.data.usuario);

        await localStorage.setItem('@Reportify:usuario', JSON.stringify(response.data.usuario));
        await localStorage.setItem('@Reportify:token', response.data.token);
    }

    function signOut() {
        localStorage.clear()
        setUsuario(null); 
    }

    async function updateEmail() {
        if (usuario) {
            const updatedUsuario = {...usuario, email_notificacao: !usuario.email_notificacao}
            await localStorage.setItem('@Reportify:usuario', JSON.stringify(updatedUsuario));
            setUsuario(updatedUsuario)
        }
    }

    return (
    <AuthContext.Provider value={{signed: !!usuario, usuario, signIn, signOut, loading}}>
        {children}
    </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);

    return context;
};