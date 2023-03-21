import { Avatar } from "@mui/material"
import { UseContext } from "../../../../context/context"

import styles from "./styles.module.scss"

export function User(): JSX.Element {
  const { user, handleModal } = UseContext()

  return (
    <div className={styles.user}>
      <div className={styles.avatarImage}>
        <Avatar src="/avatar/avatar.png" alt="user_avatar" />

        <span>{user?.name}</span>
        
        <button onClick={() => handleModal()}>
          <img src="/avatar/arrow.png" alt="arrow_png" />
        </button>
      </div>
    </div>
  )
}
