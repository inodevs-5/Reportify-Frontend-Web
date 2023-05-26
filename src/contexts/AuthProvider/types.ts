export interface IUser{
    email?: string,
    toker?: string
}

export interface IContext extends IUser{
    autheticate:( email: string, senha:string) => Promise<void>;
    logout: () => void;
}

export interface IAuthProvider {
    children: JSX.Element;
}