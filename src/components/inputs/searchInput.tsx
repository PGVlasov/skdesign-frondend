import { FC, useState } from 'react'
import styles from './inputs.module.css'

interface SearchInput {
  value: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const SearchInput: FC<SearchInput> = ({ value, handleChange }) => {
  const [validInput, setValidInput] = useState<Boolean>(true)
  function handleChangeInput(e: React.ChangeEvent<HTMLInputElement>): void {
    handleChange(e)
    setValidInput(e.target.checkValidity())
  }
  return (
    <div className={styles.input__container}>
      <span className={styles.input__error}>
        {validInput ? '' : 'Нужно ввести что то'}
      </span>
      <input
        className={styles.input}
        type="text"
        name="search"
        minLength={2}
        required
        placeholder="Введите данные"
        value={value || ''}
        onChange={handleChangeInput}
      />
    </div>
  )
}
export default SearchInput