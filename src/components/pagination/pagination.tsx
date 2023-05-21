import { FC, useMemo } from "react"
import styles from './pagination.module.css'

interface Pagination {
  usersPerPage: number
  totalUsers: number
  paginate: (arg: number) => void
}

const getPages = (totalUsers: number, usersPerPage: number) => {
  const pageNumbers: number[] = []

  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i)
  }

  return pageNumbers
}

const Pagination: FC<Pagination> = ({ usersPerPage, totalUsers, paginate }) => {

  const pageNumbers = useMemo(() => {
    return getPages(totalUsers, usersPerPage)
  }, [totalUsers, usersPerPage])

  return (
    <div className={styles.container}>
      <ul className={styles.pagination}>
        {pageNumbers.map(pageNumber => (
          <li className={styles.page__number} key={pageNumber}>
            <div className={styles.page__link} onClick={() => { paginate(pageNumber) }}>
              {pageNumber}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Pagination