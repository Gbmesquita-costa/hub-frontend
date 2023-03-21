import { Button } from "@mui/material"
import { motion } from "framer-motion"

import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"

import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"

import { api } from "../../../services/axios"
import { UseContext } from "../../../context/context"
import { Inputs } from "../components/inputs"

import Close from "../../../assets/dashboard/business/close.png"
import styles from "./styles.module.scss"

interface BusinessLocation {
    name: string;
    cep: string;
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    businessId?: string;
}

const locationValidation = yup.object().shape({
    name: yup.string().required("Nome do local é obrigatório"),
    cep: yup.string().required("Cep é obrigatório").min(9, "Inválido, CEP deverá conter 8 caracteres"),
    street: yup.string().required("Nome da rua é obrigatório"),
    number: yup.string().required("Número do local é obrigatório"),
    neighborhood: yup.string().required("Nome do bairro é obrigatório"),
    state: yup.string().required("Estado é obrigatório"),
    city: yup.string().required("Nome da cidade é obrigatório"),
})

export function LocationModal(): JSX.Element {
    const { checkCep, maskedCep } = UseContext()

    const { id } = useParams()
    const navigate = useNavigate()

    const { handleSubmit, register, setValue, formState: { errors } } = useForm<BusinessLocation>({
        resolver: yupResolver(locationValidation)
    })

    async function handleCreateLocal(location: BusinessLocation) {

        try {
            const { data, status } = await api({
                withCredentials: true,
                method: "post",
                url: `/createLocation/${id}`,
                data: location
            })

            if (status === 201) {
                toast.success(data, {
                    autoClose: 3000
                })

                navigate("/dashboard/location/painel")
            }
        } catch (error: any) {
            toast.error(error.response.data.message, {
                autoClose: 3000
            })
        }
    }

    return (
        <>
            <motion.div
                className={styles.opacity}
                initial={{
                    y: -200,
                    opacity: 0
                }}
                animate={{
                    y: 0,
                    opacity: 1
                }}
                transition={{
                    duration: 0.8
                }}
            />

            <motion.div
                className={styles.modal}
                initial={{
                    y: -200,
                    opacity: 0
                }}
                animate={{
                    y: 0,
                    opacity: 1
                }}
                transition={{
                    duration: 1.0
                }}
            >
                <div className={styles.addBusiness}>
                    <div className={styles.title}>
                        <h1>Adicionar Local</h1>

                        <div>
                            <Button onClick={() => {
                                navigate("/dashboard/location/painel")
                            }}>
                                <img src={Close} alt="close_png" />
                            </Button>
                        </div>
                    </div>
                    <form>
                        <Inputs
                            register={register}
                            checkCep={checkCep}
                            maskedCep={maskedCep}
                            setValue={setValue}
                            errors={errors}
                        />

                        <footer>
                            <div>
                                <Button type="button" variant="contained" onClick={handleSubmit(handleCreateLocal)}>
                                    Adicionar
                                </Button>
                            </div>
                        </footer>
                    </form>
                </div>
            </motion.div>
        </>
    )
}