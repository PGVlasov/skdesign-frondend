import React, { FC } from 'react'
import InputMask from 'react-input-mask'
import styles from './inputs.module.css'

interface IPhoneInput {
    value: string
    handleChange: (e: any) => void
    validPhoneInput: boolean
    setValidPhoneInput: Function
}
const PhoneInput: FC<IPhoneInput> = ({
    value, handleChange, setValidPhoneInput, validPhoneInput
}) => {

    const regex = /^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/;
    const regexInput = /[^0-9+()-]/g
    function handleChangeInput(e: React.ChangeEvent<HTMLInputElement>): void {
        e.target.value = e.target.value.replace(regexInput, '')
        handleChange(e)
        if (!regex.test(e.target.value)) {
            setValidPhoneInput(false)
        } else {
            setValidPhoneInput(true)
        }
    }

    return (
        <div className={styles.input__container}>
            <span className={styles.input__error}>
                {validPhoneInput ? '' : 'Нужно ввести телефон'}
            </span>
            <InputMask
                className={styles.input}
                type="tel"
                name="phone"
                placeholder='введите телефон'
                mask="(999) 999-9999" required
                onChange={handleChangeInput} value={value || ''} />
        </div>
    )
}
export default PhoneInput