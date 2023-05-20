import { FC, useState } from 'react'
import styles from './inputs.module.css'

interface IEmailInput {
    value: string
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const EmailInput: FC<IEmailInput> = ({ value, handleChange }) => {
    const [validInput, setValidInput] = useState<Boolean>(true)
    function handleChangeInput(e: React.ChangeEvent<HTMLInputElement>): void {
        handleChange(e)
        setValidInput(e.target.checkValidity())
    }
    return (
        <div className={styles.input__container}>
            <span className={styles.input__error}>
                {validInput ? '' : 'Нужно ввести email'}
            </span>
            <input
                className={styles.input}
                type="email"
                name="email"
                minLength={2}
                // pattern="/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
                required
                placeholder="Введите email"
                value={value || ''}
                onChange={handleChangeInput}
            />
        </div>
    )
}
export default EmailInput