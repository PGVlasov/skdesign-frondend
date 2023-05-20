import { FC, useState } from 'react'
import styles from './inputs.module.css'

interface IInputName {
    value: string
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const FirstNameInput: FC<IInputName> = ({ value, handleChange }) => {
    const [validInput, setValidInput] = useState<Boolean>(true)
    function handleChangeInput(e: React.ChangeEvent<HTMLInputElement>): void {
        handleChange(e)
        setValidInput(e.target.checkValidity())
    }
    return (
        <div className={styles.input__container}>
            <span className={styles.input__error}>
                {validInput ? '' : 'Нужно ввести имя'}
            </span>
            <input
                className={styles.input}
                type="text"
                name="firstName"
                minLength={2}
                required
                placeholder="Введите имя"
                value={value || ''}
                onChange={handleChangeInput}
            />
        </div>
    )
}
export default FirstNameInput