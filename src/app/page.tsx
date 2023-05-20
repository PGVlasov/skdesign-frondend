"use client"
import styles from './page.module.css'
import Introduction from '@/components/introduction/introduction'
import MainPage from '@/pages/mainPage'


export default function Home() {
    return (
        <main className={styles.main}>
            <MainPage />
        </main>
    )
}


