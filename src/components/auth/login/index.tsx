import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"

import Button from "@mui/material/Button"

import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { motion } from "framer-motion"

import { LoginWithProps, UseContext } from "../../../context/context"
import { InputPropsElement } from "../../inputs"

import Logo from "../../../assets/login/logo.png"
import styles from "./styles.module.scss"

const loginValidation = yup.object().shape({
    email: yup.string()
        .email("Preencha o e-mail corretamente")
        .required("E-mail obrigatório"),
    password: yup.string()
        .min(8, "A senha deve conter no mínimo 8 caracteres")
        .max(12, "A senha deve conter no máximo 12 caracteres")
        .required()
})

export function Login(): JSX.Element {
    const { handleLogin } = UseContext()
    const navigate = useNavigate()

    const { handleSubmit, register, formState: { errors } } = useForm<LoginWithProps>({
        resolver: yupResolver(loginValidation)
    })

    return (
        <div className={styles.form}>
            <motion.div
                initial={{
                    y: -200,
                    opacity: 0
                }}
                animate={{
                    y: 0,
                    opacity: 1
                }}
                transition={{
                    duration: 1.3
                }}
            >
                <img src={Logo} alt={"logo"} />
            </motion.div>

            <form>
                <div className={styles.inputs}>
                    <InputPropsElement
                        {...register("email")}
                        label="Email"
                        name="email"
                        x={-200}
                        error={Boolean(errors.email)}
                        helperText={errors.email?.message}
                    />
                    <InputPropsElement
                        {...register("password")}
                        label="Senha"
                        name="password"
                        x={200}
                        error={Boolean(errors.password)}
                        helperText={errors.password?.message}
                    />
                </div>

                <motion.div
                    className={styles.login}
                    initial={{
                        x: -200,
                        opacity: 0
                    }}
                    animate={{
                        x: 0,
                        opacity: 1
                    }}
                    transition={{
                        duration: 1.3
                    }}
                >
                    <Button
                        type="button"
                        onClick={handleSubmit(handleLogin)}
                    >
                        LOGAR
                    </Button>
                </motion.div>

                <motion.div
                    className={styles.register}
                    initial={{
                        x: 200,
                        opacity: 0
                    }}
                    animate={{
                        x: 0,
                        opacity: 1
                    }}
                    transition={{
                        duration: 1.3
                    }}
                >
                    <Button
                        type="button"
                        onClick={() => navigate("/register")}
                    >
                        CRIAR CONTA
                    </Button>
                </motion.div>
            </form>
        </div>
    )
}