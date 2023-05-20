import { AddUser } from "../addUser/addUser";
import Arrow from "@/components/ui/arrows";
import styles from "./table.module.css"
import { IUser } from "@/services/redux/interfaces/usersInterface";
import { FC, } from "react";
import SearchInTable from "../searchInTable/searchInTable";


interface ITable {
    users: IUser[]
    setUsersPerPage: Function
    setUser: Function
    setUserClicked: Function
    addNewUser(firstName: string, lastName: string, email: string, phone: string): void;
    setSearch: (arg: string) => void
    searchUsers(arr: any[], search: any): void;
    // sortUsers: Function
    isAscending: boolean
    setAscending: Function
    setSortingParam: Function
}

const Table: FC<ITable> = ({ users,
    setUsersPerPage, setUser, setUserClicked, addNewUser,
    setSearch, searchUsers, setAscending, isAscending, setSortingParam }) => {
    const columns = [
        { id: 0, title: "id", accessor: "id" },
        { id: 1, title: "firstName", accessor: "firstName" },
        { id: 2, title: "lastName", accessor: "lastName" },
        { id: 3, title: "email", accessor: "email" },
        { id: 4, title: "phone", accessor: "phone" },
    ];

    const chengeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setUsersPerPage(event.target.value)
    }

    const search = (nameKey: string, arr: IUser[]) => {
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

    const HandleClickSort = (event: any) => {
        setSortingParam(event.target.innerText.split("\n")[0])
        setAscending(!isAscending)
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
                            <th key={col.id} className={styles.col} onClick={(event) => HandleClickSort(event)}>{col.title}<Arrow /></th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {users.map((user: any, i) => (//todo
                        <tr key={i} className={styles.row} onClick={(event) => { showUser(event) }}>
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