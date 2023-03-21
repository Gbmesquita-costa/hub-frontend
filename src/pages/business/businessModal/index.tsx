import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { motion } from "framer-motion"

import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"

import { Button, TextField } from "@mui/material"

import { UseContext } from "../../../context/context"
import { api } from "../../../services/axios"

import Close from "../../../assets/dashboard/business/close.png"
import styles from "./styles.module.scss"

interface BusinessWithProps {
    name: string;
    website: string;
    cnpj: string;
}

const formValidation = yup.object().shape({
    name: yup.string()
        .required("Nome da empresa é obrigatório"),
    website: yup.string()
        .required("O nome do website é obrigatório"),
    cnpj: yup.string().required("CNPJ é obrigatório")
        .min(18, "Inválido, CNPJ deverá conter 14 caracteres"),
})

export function BusinessModal() {
    const { BusinessInputMask, businessCnpj } = UseContext()
    const navigate = useNavigate()

    const { handleSubmit, register, formState: { errors } } = useForm<BusinessWithProps>({
        resolver: yupResolver(formValidation)
    })

    async function handleBusiness({ name, website, cnpj }: BusinessWithProps) {
        const businessData = {
            name: name,
            website: website,
            cnpj: cnpj
        }

        try {
            const { data, status } = await api({
                method: "post",
                url: "/createBusiness",
                data: businessData
            })

            if (status === 201) {
                toast.success(data, {
                    autoClose: 3000
                })

                navigate("/dashboard/painel")
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
                        <h1>Adicionar empresa</h1>

                        <div>
                            <Button onClick={() => {
                                navigate("/dashboard/painel")
                            }}>
                                <img src={Close} alt="close_png" />
                            </Button>
                        </div>
                    </div>
                    <form>
                        <div className={styles.container}>
                            <div className={styles.firstInput}>
                                <label htmlFor="name">Nome</label>
                                <TextField
                                    {...register("name")}
                                    name={"name"}
                                    error={Boolean(errors.name)}
                                    helperText={errors.name?.message}
                                />
                            </div>

                            <div className={styles.inputs}>
                                <div>
                                    <label htmlFor="website">Website</label>
                                    <TextField
                                        {...register("website")}
                                        name={"website"}
                                        error={Boolean(errors.website)}
                                        helperText={errors.website?.message}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="cnpj">Cnpj</label>
                                    <TextField
                                        {...register("cnpj")}
                                        onChange={(event) => BusinessInputMask(event)}
                                        value={businessCnpj}
                                        name={"cnpj"}
                                        error={Boolean(errors.cnpj)}
                                        helperText={errors.cnpj?.message}
                                    />
                                </div>
                            </div>
                        </div>

                        <footer>
                            <div>
                                <Button type="button" variant="contained" onClick={handleSubmit(handleBusiness)}>
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