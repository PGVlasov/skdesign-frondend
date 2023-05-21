import { FC, useState } from 'react'
import styles from './inputs.module.css'

interface InputId {
  value: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const IdInput: FC<InputId> = ({ value, handleChange }) => {
  const [validInput, setValidInput] = useState<Boolean>(true)
  function handleChangeInput(e: React.ChangeEvent<HTMLInputElement>): void {
    handleChange(e)
    setValidInput(e.target.checkValidity())
  }
  return (
    <div className={styles.input__container}>
      <span className={styles.input__error}>
        {validInput ? '' : 'Нужно ввести id'}
      </span>
      <input
        className={styles.input}
        type="text"
        pattern="[0-9]*"
        name="id"
        minLength={2}
        required
        placeholder="Введите id"
        value={value || ''}
        onChange={handleChangeInput}
      />
    </div>
  )
}
export default IdInput