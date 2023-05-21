import { FC } from "react"
import styles from "./arrows.module.css"

interface Arrow {
  direction: "asc" | "desc"
}

const Arrow: FC<Arrow> = ({ direction }) => {
  return (
    <div className={styles.arrow} >
      {direction === "desc" ? <>▼</> : <>▲</>}
    </div>
  )
}

export default Arrow