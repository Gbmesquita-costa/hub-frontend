import { useEffect } from "react";

import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom";

import { Button } from "@mui/material";
import { api } from "../../services/axios";

import styles from "./styles.module.scss"

interface BusinessWithProps {
  name: string;
  website: string;
  cnpj: string;
}

export function DashboardMain(): JSX.Element {
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchData() {
      const { data } = await api<BusinessWithProps[]>({ method: "get", url: "/businessReturned" })

      if (data.length >= 1) {
        navigate("/dashboard/painel")
      }
    }

    fetchData()
  }, [])

  return (
    <motion.div
      className={styles.mainintial}
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
      <div className={styles.title}>
        <h1>
          Nenhuma empresa <br /> cadastrada!
        </h1>
      </div>
      <div className={styles.button}>
        <Button
          variant="contained"
          onClick={() => navigate("/dashboard/create")}
        >
          Adicionar Empresa
        </Button>
      </div>
    </motion.div>
  )
}