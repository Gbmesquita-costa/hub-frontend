import * as yup from "yup"

import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { motion } from "framer-motion"
import { toast } from "react-toastify"

import Button from "@mui/material/Button"
import { InputPropsElement } from "../../inputs"

import { api } from "../../../services/axios"

import Logo from "../../../assets/login/logo.png"
import styles from "./styles.module.scss"

interface SignUpWithProps {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

const signupValidation = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  email: yup.string()
    .email("Preencha o e-mail corretamente")
    .required("E-mail obrigatório"),
  password: yup.string()
    .min(8, "A senha deve conter no mínimo 8 caracteres")
    .max(12, "A senha deve conter no máximo 12 caracteres")
    .required(),
  confirm_password: yup.string()
    .min(8, "A senha deve conter no mínimo 8 caracteres")
    .max(12, "A senha deve conter no máximo 12 caracteres")
    .required("Repita a senha")
    .oneOf([yup.ref("password")], "As senhas não correspondem")
})

export function SignUp(): JSX.Element {
  const navigate = useNavigate()

  const { handleSubmit, register, formState: { errors } } = useForm<SignUpWithProps>({
    resolver: yupResolver(signupValidation)
  })

  async function HandleSignUp({ email, name, password }: SignUpWithProps) {
    const userData = {
      email: email,
      name: name,
      password: password
    }

    try {
      const { data, status } = await api({  
        method: "post", 
        url: "/createUser", 
        data: userData 
      })

      if (status === 201) {
        toast.success(data, {
          autoClose: 3000
        })

        navigate("/")
      }
    } catch (error: any) {
        toast.error(error.response.data.message, {
          autoClose: 3000
        })
    }
  }

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
            {...register("name")}
            label="Nome"
            name="name"
            x={-200}
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
          />

          <InputPropsElement
            {...register("email")}
            label="Email"
            name="email"
            x={200}
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
          />

          <InputPropsElement
            {...register("password")}
            label="Senha"
            name="password"
            x={-200}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
          />

          <InputPropsElement
            {...register("confirm_password")}
            label="Repetir senha"
            name="confirm_password"
            type={"password"}
            x={200}
            error={Boolean(errors.confirm_password)}
            helperText={errors.confirm_password?.message}
          />
        </div>

        <motion.div
          className={styles.register}
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
            onClick={handleSubmit(HandleSignUp)}
          >
            REGISTRAR
          </Button>
        </motion.div>

        <motion.div
          className={styles.login}
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
            onClick={() => navigate("/")}
          >
            LOGAR
          </Button>
        </motion.div>
      </form>
    </div>
  )
}