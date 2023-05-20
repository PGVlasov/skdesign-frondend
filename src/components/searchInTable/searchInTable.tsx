import { useFormWithValidation } from "@/services/hooks/form-validation"
import SearchInput from "../inputs/searchInput"
import styles from "./searchInTable.module.css"
import { FC, useState } from "react"

interface ISearch {
    setSearch(search: any): void;
    searchUsers: Function
}


const SearchInTable: FC<ISearch> = ({ setSearch, searchUsers }) => {
    const { values, handleChange, setValues } = useFormWithValidation()


    const handleSearchUser = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        setValues({ ...values })
        setSearch(values.search);
        searchUsers(values.search)
    }
    return (<div className={styles.search}>

        <form className={styles.form}>
            <h3>Поиск</h3>
            <div className={styles.inputs__container}>
                <SearchInput value={values.search} handleChange={handleChange} />
            </div>
            <button type="submit" onClick={(event) => { handleSearchUser(event) }}>найти</button>
        </form>
        <hr />
    </div>)
}

export default SearchInTable