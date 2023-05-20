import { FC, useState } from 'react'
import styles from './inputs.module.css'

interface ILasttNameInput {
    value: string
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const LasttNameInput: FC<ILasttNameInput> = ({ value, handleChange }) => {
    const [validInput, setValidInput] = useState<Boolean>(true)
    function handleChangeInput(e: React.ChangeEvent<HTMLInputElement>): void {
        handleChange(e)
        setValidInput(e.target.checkValidity())
    }
    return (
        <div className={styles.input__container}>
            <span className={styles.input__error}>
                {validInput ? '' : 'Нужно ввести фамилию'}
            </span>
            <input
                className={styles.input}
                type="text"
                name="lastName"
                minLength={2}
                required
                placeholder="Введите фамилию"
                value={value || ''}
                onChange={handleChangeInput}
            />
        </div>
    )
}
export default LasttNameInput