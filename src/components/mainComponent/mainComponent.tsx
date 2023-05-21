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
var _ = require("lodash");

const columns = [
  { id: 0, title: "id", accessor: "id" },
  { id: 1, title: "firstName", accessor: "firstName" },
  { id: 2, title: "lastName", accessor: "lastName" },
  { id: 3, title: "email", accessor: "email" },
  { id: 4, title: "phone", accessor: "phone" },
];

const MainComponent = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [usersPerPage, setUsersPerPage] = useState<number>(10)
  const [isUserClicked, setUserClicked] = useState<boolean>(false)
  const [userSearch, setSearch] = useState<any>();
  const [user, setUser] = useState<User>()
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

  const searchUsers = (arr: User[], userSearch: any) => {
    if (userSearch) {
      const data = {
        nodes: arr.filter((item) =>
          item.firstName.toLowerCase().includes(userSearch.toLowerCase()) ||
          item.lastName.toLowerCase().includes(userSearch.toLowerCase()) ||
          item.phone.includes(userSearch.toLowerCase()) ||
          item.email.includes(userSearch) ||
          item.id == userSearch
        ),
      };
      return data.nodes
    }
  }

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
    console.log(sortingParam, sorting.direction)
    return sorting.id !== null && sortingParam ? _.orderBy(filteredArray, [sortingParam], [sorting.direction]) : filteredArray
  }, [filteredArray, userSearch, sorting])

  const lastUserIndex = usersPerPage * currentPage
  const firstUserIndex = lastUserIndex - usersPerPage
  const currentUser = sortedArray?.slice(firstUserIndex, lastUserIndex)
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
  if (error) return <h1>{error}</h1>
  return (
    <div className={styles.container}>
      <Table
        addNewUser={addNewUser}
        users={currentUser || []}
        setUsersPerPage={setUsersPerPage}
        setUser={setUser}
        setUserClicked={setUserClicked}
        setSearch={setSearch}
        searchUsers={searchUsers}
        sortTable={sortTable}
        columns={columns}
        sorting={sorting}
      />
      {user ? <UserDetails setUserClicked={setUserClicked} user={user || null} /> : null}
      <Pagination
        usersPerPage={usersPerPage}
        totalUsers={users.length}
        paginate={paginate}
      />
    </div>)
}

export default MainComponent