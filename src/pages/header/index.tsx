import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Button } from "@mui/material"

import { UseContext } from "../../context/context"
import { LogoutUser } from "./components/logoutUser"
import { User } from "./components/user"

import ArrowIcon from "../../assets/dashboard/header/arrow.png"
import BusinessIcon from "../../assets/dashboard/header/icon.png"

import styles from "./styles.module.scss"

export function Header(): JSX.Element {
  const { user, locationActive, setLocationActive, active } = UseContext()
  const navigate = useNavigate()

  useEffect(() => {
    return window.addEventListener("popstate", () => {
      setLocationActive(false)
    })
  }, [])

  return (
    <>
      <header className={styles.header}>
        <motion.div
          className={styles.logo}
          initial={{
            x: -100,
            opacity: 0
          }}
          animate={{
            x: 0,
            opacity: 1
          }}
          transition={{
            duration: 1.0
          }}
          style={user?.name && locationActive ? { background: "#EFEDED", height: "100%", paddingRight: "30px" } : {}}
        >
          <img src={BusinessIcon} alt="icon_logo" />
          <h1>{user?.name && locationActive ? `Empresa de ${user.name}` : "Minhas Empresas"}</h1>
          {
            user?.name && locationActive && (
              <button style={{ marginLeft: "30px" }}>
                <img src="/avatar/arrow.png" alt="avatar_arrow" style={{ height: "11.75px", width: "19px" }} />
              </button>
            )
          }
        </motion.div>

        <motion.div
          className={styles.user}
          initial={{
            x: 100,
            opacity: 0
          }}
          animate={{
            x: 0,
            opacity: 1
          }}
          transition={{
            duration: 1.0
          }}
        >
          <User />
        </motion.div>
      </header>

      {
        active && (
          <LogoutUser/>
        )
      }

      {
        user?.name && locationActive && (
          <motion.div
            className={styles.arrow}
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
            <Button onClick={() => {
              navigate("/dashboard/painel")
              setLocationActive(false)
            }}>
              <img src={ArrowIcon} alt="arrow_png" />
              <span>
                Minhas Empresas
              </span>
            </Button>
          </motion.div>
        )
      }
    </>
  )
}