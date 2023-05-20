import { FC, useState } from "react"
import styles from "./addUser.module.css"
import { useFormWithValidation } from "@/services/hooks/form-validation"
import FirstNameInput from "../inputs/firstNameInput"
import LasttNameInput from "../inputs/lastNameInput"
import EmailInput from "../inputs/emailInput"
import PhoneInput from "../inputs/phoneInput"

interface IAddUser {
    addNewUser(firstName: string, lastName: string, email: string, phone: string): void;
}

export const AddUser: FC<IAddUser> = ({ addNewUser }) => {
    const { values, handleChange, setValues } =
        useFormWithValidation()
    const [showForm, setShowForm] = useState<boolean>(false)
    const [validPhoneInput, setValidPhoneInput] = useState<boolean>(true)

    const handleShowForm = () => {
        setShowForm(!showForm)
    }

    const handleAddUser = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        setValues({ ...values })
        addNewUser(values.firstName, values.lastName, values.email, values.phone)
    }

    if (!showForm) {
        return <div>
            <button onClick={handleShowForm}>Добавить</button>
            <hr />
        </div>
    }
    return <div>
        <form className={styles.form}>
            <span>Введите Ваши данные</span>
            <div className={styles.inputs__container}>
                <FirstNameInput value={values.firstName} handleChange={handleChange} />
                <LasttNameInput value={values.lastName} handleChange={handleChange} />
                <EmailInput value={values.email} handleChange={handleChange} />
                <PhoneInput value={values.phone} setValidPhoneInput={setValidPhoneInput} validPhoneInput={validPhoneInput} handleChange={handleChange} />
            </div>
            <button
                disabled={!values.firstName || !values.lastName || !values.email || !values.phone || !validPhoneInput}
                className={styles.btn}
                type="submit"
                onClick={(event) => {
                    handleAddUser(event)
                }}>
                Добавить в таблицу
            </button>
            <button className={styles.btn__cancel} onClick={handleShowForm}>Закрыть без добавления</button>
        </form>
        <hr />
    </div>
}