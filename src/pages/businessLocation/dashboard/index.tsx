import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { parseCookies } from "nookies";
import { motion } from "framer-motion"

import { Button } from "@mui/material";

import { UseContext } from "../../../context/context";
import { api } from "../../../services/axios";

import styles from "./styles.module.scss"

interface BusinessWithProps {
  id: string;
  name: string;
  website: string;
  LocalBusiness: [];
  cnpj: string;
}

export function DashboardLocation(): JSX.Element {
  const { setLocationActive } = UseContext()

  const [locationId, setLocationId] = useState<string>("")
  const navigate = useNavigate()

  useEffect(() => {
    const { "user_token": token } = parseCookies()

    if (token) {
      setLocationActive(true)
    }

    async function fetchData() {
      const { data } = await api<BusinessWithProps[]>({ withCredentials: true, method: "get", url: "/businessReturned" })

      data.map(({ LocalBusiness, id }) => {
        if (LocalBusiness.length >= 1) {
          navigate("/dashboard/location/painel")
        }
        setLocationId(id)
      })
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
          Nenhum Local <br /> cadastrado!
        </h1>
      </div>
      <div className={styles.button}>
        <Button
          variant="contained"
          onClick={() => navigate(`/dashboard/location/create/${locationId}`)}
        >
          Adicionar Local
        </Button>
      </div>
    </motion.div>
  )
}