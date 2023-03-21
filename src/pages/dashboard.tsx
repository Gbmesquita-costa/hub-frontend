import { Header } from "./header";
import { useEffect } from "react";

import { parseCookies } from "nookies";
import { Outlet, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"

import styles from "./styles.module.scss"

export function Dashboard(): JSX.Element {
  const navigate = useNavigate()

  useEffect(() => {
    const { "user_token": token } = parseCookies()

    if (!token) {
      navigate("/")
    }
  }, [])

  return (
    <>
      <Header />
      <motion.div 
        className={styles.dashboard}
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1
        }}
        transition={{
          duration: 1.5
        }}
      >
        
        <main>
          <Outlet/>
        </main>
      </motion.div>
    </>
  )
}
