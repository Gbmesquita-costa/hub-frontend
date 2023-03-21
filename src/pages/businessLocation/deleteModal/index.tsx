import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { motion } from "framer-motion"

import { Button } from "@mui/material"

import { api } from "../../../services/axios"
import { useNavigate, useParams } from "react-router-dom"

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
}

export function DeleteLocationModal(): JSX.Element {
    const [location, setLocation] = useState<BusinessLocation>({} as BusinessLocation)

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchData() {
            const { data } = await api({
                method: "get",
                url: `/locationFinded/${id}`
            })

            setLocation(data)
        }

        fetchData()
    }, [])

    async function handleDelete() {
        try {
            const { data } = await api({
                method: "delete",
                url: `/deleteLocation/${id}`
            })

            toast.success(data.message, {
                autoClose: 3000
            })

            navigate("/dashboard/location/painel")

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
                <div className={styles.deleteModal}>
                    <div className={styles.title}>
                        <h1>Confirmação de exclusão</h1>

                        <div>
                            <Button onClick={() => { 
                                navigate("/dashboard/location/painel") 
                            }}>
                                <img src={Close} alt="close_png" />
                            </Button>
                        </div>
                    </div>

                    <main>
                        <div>
                            <p>O local <strong>{location.name}</strong> será excluído. Tem certeza dessa ação?</p>
                        </div>
                    </main>

                    <footer>
                        <div>
                            <Button variant="contained" color="error" onClick={() => handleDelete()}>
                                Excluir
                            </Button>
                        </div>
                    </footer>
                </div>
            </motion.div>
        </>
    )
}