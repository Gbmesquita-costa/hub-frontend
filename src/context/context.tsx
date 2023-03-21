import { useContext, createContext, ReactNode, useState, useEffect, SetStateAction, Dispatch } from "react"
import { destroyCookie, setCookie, parseCookies } from "nookies";

import { useNavigate } from "react-router-dom";

import { mask, unMask } from "remask"
import { toast } from "react-toastify"
import axios from "axios"

import { api } from "../services/axios";

interface ChildrenWithProps {
    children: ReactNode
}

interface CepOptions {
    cep: string;
    bairro: string;
    logradouro: string;
    localidade: string;
    uf: string;
}

export interface LoginWithProps {
    email: string;
    password: string;
}

interface User {
    email: string;
    name:  string;
}

interface ContextWithProps {
    BusinessInputMask: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; 
    checkCep: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, setValue: any) => Promise<void>
    handleLogin: ({ email, password }: LoginWithProps) => Promise<void>;
    handleModal: () => void;
    LogOut: () => void;
    maskedCep: string;
    businessCnpj: string;
    locationActive: boolean;
    setLocationActive: Dispatch<SetStateAction<boolean>>;
    active: boolean;
    setActive: Dispatch<SetStateAction<boolean>>;
    isAuthenticated: boolean;
    user: User | null;
}

export const context = createContext({} as ContextWithProps)

export function ContextApi({ children }: ChildrenWithProps): JSX.Element {
    const [businessCnpj, SetBusinessCnpj] = useState<string>("")
    const [maskedCep, setMaskedCep] = useState<string>("")

    const [locationActive, setLocationActive] = useState<boolean>(false)
    const [active, setActive] = useState<boolean>(false)
    
    const [user, setUser] = useState<User | null>(null)
    const isAuthenticated = !!user

    const navigate = useNavigate()
    
    useEffect(() => {
        const { "user_token": token } = parseCookies()

        if (token) {
            api({
                method: "get",
                url: "/getUser"
            }).then((response) => {
                const { email, name } = response.data
                setUser({ email: email , name: name})
            })
        }
    }, [])

    function BusinessInputMask(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        const values = unMask(event.target.value)
        const maskedValue = mask(values, ["99.999.999/9999-99"])

        SetBusinessCnpj(maskedValue)
    }

    const checkCep = async (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, setValue: any): Promise<void> => {
        const values = unMask(event.target.value)
        const maskedValue = mask(values, ["99999-999"])

        setMaskedCep(maskedValue)

        try {
            const { data } = await axios<CepOptions>({ method: "get", url: `https://viacep.com.br/ws/${maskedValue}/json/` })
            
            if (!data.cep) {
                toast.error("CEP não foi encontrado 😔: Digite novamente!")
                return
            }
            
            setValue("neighborhood", data.bairro)
            setValue("state", data.uf)
            setValue("city", data.localidade)
            setValue("street", data.logradouro)

            toast.success("CEP foi encontrado 😊")
        } catch (error: any) {
            toast.error(error.response.data.message, {
                autoClose: 3000
            })
        }
    }

    async function handleLogin({ email, password }: LoginWithProps): Promise<void> {
        try {
            const userLogin = {
                email: email,
                password: password
            }

            const { data } = await api({
                method: "post",
                url: "/login",
                data: userLogin
            })

            setUser(data.user)

            setCookie(undefined, "user_token", data.tokenSign, {
                maxAge: 60 * 60 * 1, // 1 hour
            })

            api.defaults.headers["Authorization"] = `Bearer ${data.tokenSign}`

            navigate("/dashboard")

        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    }

    function LogOut(): void {
        destroyCookie(undefined, "user_token")
        navigate("/")
    }

    function handleModal(): void {
        setActive(!active)
    }

    return (
        <context.Provider value={{ 
            BusinessInputMask, businessCnpj, handleModal, 
            active, setActive, locationActive, 
            setLocationActive, handleLogin, LogOut, 
            isAuthenticated, user, checkCep, maskedCep
        }}>
            {children}
        </context.Provider>
    )
}

export function UseContext() {
    return useContext(context)
}