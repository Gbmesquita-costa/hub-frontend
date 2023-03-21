import { Outlet } from 'react-router'
import { motion } from "framer-motion"

import styles from "./styles.module.scss"

export function Home(): JSX.Element {
  return (
    <div className={styles.page}>
        <motion.div 
            className={styles.banner}
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
        />
       <Outlet/>
    </div>
  )
}
