import { AddUser } from "../addUser/addUser";
import Arrow from "@/components/ui/arrows";
import styles from "./table.module.css"
import { User } from "@/services/redux/interfaces/usersInterface";
import { FC } from "react";
import SearchInTable from "../searchInTable/searchInTable";
import { Column } from "../mainComponent/mainComponent";

interface Table {
  users: User[]
  setUsersPerPage: (arg: number) => void
  setUser: Function
  addNewUser(id: number, firstName: string, lastName: string, email: string, phone: string): void;
  setSearch: (arg: string) => void
  sortTable: (columnId: number) => void
  columns: Column[]
  sorting: { id: null | number, direction: "asc" | "desc" }
}

const Table: FC<Table> = ({ users,
  setUsersPerPage, setUser, addNewUser,
  setSearch, sortTable, columns, sorting }) => {
  const chengeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUsersPerPage(Number(event.target.value))
  }

  return (
    <div>
      <h1>Таблица пользователей</h1>
      <div>
        <p>выбирите количество пользователей на страницу:</p>
        <select onChange={(event) => chengeSelect(event)}>
          <option value="DEFAULT" disabled>Choose a quality ...</option>
          <option value={10} >10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
      </div>
      <hr />
      <AddUser addNewUser={addNewUser} />
      <SearchInTable setSearch={setSearch} />
      <table className={styles.container}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.id}
                className={styles.col}
                onClick={() => sortTable(col.id)}>< div className={styles.title__wrapper}>{col.title}{col.id === sorting.id &&
                  <Arrow direction={sorting.direction} />}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user: User) => (
            <tr key={user.id} className={styles.row} onClick={() => setUser(user)}>
              {columns.map((col) => (
                <td key={col.id} className={styles.cell}>{user[col.title]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table