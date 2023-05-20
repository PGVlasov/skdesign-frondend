import { IUser } from '@/services/redux/interfaces/usersInterface'
import styles from './userDetails.module.css'
import { FC } from 'react'

interface IUserDetails {
    user: IUser | null
    setUserClicked: Function
}

const UserDetails: FC<IUserDetails> = ({ user, setUserClicked }) => {
    return (
        <div className={styles.userDetails}>
            <span>Выбран пользователь: <b>{user?.firstName} {user?.lastName}</b></span>
            Описание:
            <textarea value={user?.description} readOnly />
            <span><>Адрес проживания:</> <b>{user?.address?.streetAddress}</b></span>
            <span> Город: <b>{user?.address?.city}</b></span>
            <span> Провинция/штат: <b>{user?.address?.state}</b></span>
            <span> Индекс: <b>{user?.address?.zip}</b></span>
            <button onClick={() => { setUserClicked(false) }}>Закрыть детализацию</button>
        </div>)
}

export default UserDetails