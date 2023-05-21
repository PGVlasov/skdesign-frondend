import { AddUser } from "../addUser/addUser";
import Arrow from "@/components/ui/arrows";
import styles from "./table.module.css"
import { User } from "@/services/redux/interfaces/usersInterface";
import { FC } from "react";
import SearchInTable from "../searchInTable/searchInTable";

interface Table {
  users: User[]
  setUsersPerPage: Function
  setUser: Function
  setUserClicked: Function
  addNewUser(id: number, firstName: string, lastName: string, email: string, phone: string): void;
  setSearch: (arg: string) => void
  searchUsers(arr: any[], search: any): void;
  sortTable: (columnId: number) => void
  columns: any[]
  sorting: { id: null | number, direction: "asc" | "desc" }
}

const Table: FC<Table> = ({ users,
  setUsersPerPage, setUser, setUserClicked, addNewUser,
  setSearch, searchUsers, sortTable, columns, sorting }) => {
  const chengeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUsersPerPage(event.target.value)
  }

  const search = (nameKey: string, arr: User[]) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].firstName === nameKey) {
        return arr[i];
      }
      else if (arr[i].lastName === nameKey) {
        return arr[i];
      }
      else if (arr[i].id.toString() === nameKey) {
        return arr[i];
      }
      else if (arr[i].email === nameKey) {
        return arr[i];
      }
      else if (arr[i].phone === nameKey) {
        return arr[i];
      }
    }
  }

  const showUser = (event: any) => {
    setUserClicked(true)
    const user = search(event.target.innerText, users);
    setUser(user)
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
      <SearchInTable setSearch={setSearch} searchUsers={searchUsers} />
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
          {users.map((user: any, i) => (
            <tr key={i} className={styles.row} onClick={showUser}>
              {columns.map((col) => (
                <td key={col.id} className={styles.cell}>{user[col.accessor]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table