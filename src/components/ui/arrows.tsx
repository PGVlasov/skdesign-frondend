import { useState } from "react"
import styles from "./arrows.module.css"

const Arrow = () => {
    const [direction, setDirection] = useState<Boolean>(false)
    const clickHandler = () => {
        setDirection(!direction)
    }

    return (
        <div className={styles.arrow} onClick={clickHandler}>
            {direction ? <>▼</> : <>▲</>}
        </div>
    )

}

export default Arrow