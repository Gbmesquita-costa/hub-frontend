import { motion } from "framer-motion"
import { Avatar } from "@mui/material"

import { UseContext } from "../../../../context/context"
import styles from "./styles.module.scss"

export function LogoutUser(): JSX.Element {
    const { user, LogOut } = UseContext()

    return (
        <motion.div
            className={styles.container}
            initial={{
                y: -10,
                opacity: 0
            }}
            animate={{
                y: 0,
                opacity: 1
            }}
            transition={{
                duration: 0.2
            }}
        >
            <div className={styles.content}>
                <div className={styles.user}>
                    <Avatar src="/avatar/avatar.png" alt="user_avatar" />
                    <span>{user?.name}</span>
                </div>

                <div>
                    <button onClick={() => LogOut()}>
                        Sair
                    </button>
                </div>
            </div>
        </motion.div>
    )
}