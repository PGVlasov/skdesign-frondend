import { FC } from "react"
import styles from './pagination.module.css'

interface IPagination {
    usersPerPage: number
    totalUsers: number
    paginate: (arg: number) => void
}


const Pagination: FC<IPagination> = ({ usersPerPage, totalUsers, paginate }) => {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
        pageNumbers.push(i)
    }
    return (
        <div className={styles.container}>
            <ul className={styles.pagination}>
                {pageNumbers.map(number => (
                    <li className={styles.page__number} key={number}>
                        <div className={styles.page__link} onClick={() => { paginate(number) }}>
                            {number}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Pagination