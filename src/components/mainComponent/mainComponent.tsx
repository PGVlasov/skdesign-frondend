import Table from "@/components/table/table"
import { useEffect, useMemo, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/services/redux/hooks/redux";
import { fetchUsers, updateUsers } from "@/services/redux/store/reducers/user/actionCreators";
import { Spinner } from "@/components/spinner/spinner";
import Pagination from "@/components/pagination/pagination";
import styles from "./mainComponent.module.css"
import { IUser } from "@/services/redux/interfaces/usersInterface";
import UserDetails from "../userDetails/userDetails";
import { bigVolume, smallVolume } from "@/services/consts";
var _ = require("lodash");


const MainComponent = () => {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [usersPerPage, setUsersPerPage] = useState<number>(10)
    const [isUserClicked, setUserClicked] = useState<boolean>(false)
    const [userSearch, setSearch] = useState<any>();
    const [user, setUser] = useState<IUser>()
    const [url, setUrl] = useState<string>(smallVolume)
    const [sortingParam, setSortingParam] = useState<string>("")
    const [isAscending, setAscending] = useState<boolean>(true)
    const { users, isLoading, error } = useAppSelector(state => state.userReducer)
    const isDataSizeBig = useAppSelector(state => state.dataReducer)

    const dispatch = useAppDispatch()

    useEffect(() => {
        isDataSizeBig.loadBigBata ? setUrl(bigVolume) : setUrl(smallVolume)
    }, [isDataSizeBig.loadBigBata]);


    useEffect(() => {
        dispatch(fetchUsers(url))
    }, [url]);


    const searchUsers = (arr: IUser[], userSearch: any) => {
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

    const sortUsers = (arr: IUser[], sortingParam: string) => {
        let direction = ""
        isAscending ? direction = 'asc' : direction = "desc"
        return _.orderBy(arr, [sortingParam], [direction])

    }

    const filteredArray = useMemo(() => {
        if (!userSearch) return users
        if (sortingParam)
            return searchUsers(users, userSearch)

    }, [users, userSearch,])

    const sortedArray = useMemo(() => {
        if (userSearch) return sortUsers(filteredArray || [], sortingParam)
        if (!sortingParam) return users
        return sortUsers(users, sortingParam)

    }, [users, sortingParam, isAscending, userSearch])


    const finalArray = useMemo(() => {
        if (!filteredArray && !sortedArray) return users

        if (sortedArray) return sortedArray
        if (filteredArray) return filteredArray

    }, [filteredArray, sortedArray])


    const lastUserIndex = usersPerPage * currentPage
    const firstUserIndex = lastUserIndex - usersPerPage
    const currentUser = finalArray?.slice(firstUserIndex, lastUserIndex)
    const paginate = (number: number) => {
        setCurrentPage(number)
    }

    const addNewUser = (firstName: string, lastName: string, email: string, phone: string) => {
        const newItem: IUser = {
            id: Math.floor(Math.random() * 2000) + 1000,
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
                // sortUsers={sortUsers}
                setAscending={setAscending}
                isAscending={isAscending}
                setSortingParam={setSortingParam}
            />
            {isUserClicked ? <UserDetails setUserClicked={setUserClicked} user={user || null} /> : null}
            <Pagination
                usersPerPage={usersPerPage}
                totalUsers={users.length}
                paginate={paginate}
            />
        </div>)


}

export default MainComponent