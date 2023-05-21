import Table from "@/components/table/table"
import { useEffect, useMemo, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/services/redux/hooks/redux";
import { fetchUsers, updateUsers } from "@/services/redux/store/reducers/user/actionCreators";
import { Spinner } from "@/components/spinner/spinner";
import Pagination from "@/components/pagination/pagination";
import styles from "./mainComponent.module.css"
import { User } from "@/services/redux/interfaces/usersInterface";
import UserDetails from "../userDetails/userDetails";
import { bigVolume, smallVolume } from "@/services/consts";
import _ from "lodash"

export type Column = {
  id: number
  title: keyof Omit<User, "address" | "description">
}
const columns: Column[] = [
  { id: 0, title: "id", },
  { id: 1, title: "firstName" },
  { id: 2, title: "lastName" },
  { id: 3, title: "email" },
  { id: 4, title: "phone" },
];

const searchUsers = (arr: User[], userSearch: string) => {
  const data = {
    nodes: arr.filter((item) =>
      item.firstName.toLowerCase().includes(userSearch.toLowerCase()) ||
      item.lastName.toLowerCase().includes(userSearch.toLowerCase()) ||
      item.phone.includes(userSearch.toLowerCase()) ||
      item.email.includes(userSearch) ||
      item.id.toString() === userSearch
    ),
  };
  return data.nodes
}

const MainComponent = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [usersPerPage, setUsersPerPage] = useState<number>(10)
  const [userSearch, setSearch] = useState<string>();
  const [user, setUser] = useState<User | null>(null)
  const [url, setUrl] = useState<string>(smallVolume)
  const [sorting, setSorting] = useState<{ id: null | number, direction: "asc" | "desc" }>({ id: null, direction: "asc" })
  const { users, isLoading, error } = useAppSelector(state => state.userReducer)
  const isDataSizeBig = useAppSelector(state => state.dataReducer)

  const dispatch = useAppDispatch()

  useEffect(() => {
    isDataSizeBig.loadBigBata ? setUrl(bigVolume) : setUrl(smallVolume)
  }, [isDataSizeBig.loadBigBata]);


  useEffect(() => {
    dispatch(fetchUsers(url))
  }, [url]);

  const sortTable = (columnId: number) => {
    if (columnId === sorting.id) {
      setSorting(prev => ({ id: columnId, direction: prev.direction === "asc" ? "desc" : 'asc' }))
    } else {
      setSorting({ id: columnId, direction: "asc" })
    }
  }

  const filteredArray = useMemo(() => {
    if (!userSearch) return users
    return searchUsers(users, userSearch)
  }, [users, userSearch,])

  const sortedArray = useMemo(() => {
    const sortingParam = columns.find(column => column.id === sorting.id)?.title
    return sorting.id !== null && sortingParam ? _.orderBy(filteredArray, [sortingParam], [sorting.direction]) : filteredArray
  }, [filteredArray, userSearch, sorting])

  const totalRows = usersPerPage * currentPage
  const firstUserIndex = totalRows - usersPerPage
  const currentPageRows = sortedArray?.slice(firstUserIndex, totalRows)
  const paginate = (number: number) => {
    setCurrentPage(number)
  }

  const addNewUser = (id: number, firstName: string, lastName: string, email: string, phone: string) => {
    const newItem: User = {
      id: id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone
    };
    dispatch(updateUsers(newItem))
  };

  if (isLoading) return <Spinner />
  if (error) return <span>{error}</span>
  return (
    <div className={styles.container}>
      <Table
        addNewUser={addNewUser}
        users={currentPageRows || []}
        setUsersPerPage={setUsersPerPage}
        setUser={setUser}
        setSearch={setSearch}
        sortTable={sortTable}
        columns={columns}
        sorting={sorting}
      />
      {user ? <UserDetails setUser={setUser} user={user} /> : null}
      <Pagination
        usersPerPage={usersPerPage}
        totalUsers={users.length}
        paginate={paginate}
      />
    </div>)
}

export default MainComponent