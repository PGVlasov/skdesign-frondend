import { loadBigBata, loadSmallBata } from "@/services/redux/store/reducers/data/actionCreator";
import styles from "./introduction.module.css"
import { useRouter } from 'next/navigation';
import { useAppDispatch } from "@/services/redux/hooks/redux";

const Introduction = () => {
    const dispatch = useAppDispatch()
    const router = useRouter();

    const smallDataClickHandler = () => {
        dispatch(loadSmallBata())

    }

    const BigDataClickHandler = () => {
        dispatch(loadBigBata())

    }

    return <div>
        <div className={styles.content}>
            <p className={styles.modal__text}>Пожалуйста выберите объем данных</p>
            <div>
                <button className={styles.button} onClick={() => smallDataClickHandler()}>Маленький объем</button>
                <button className={styles.button} onClick={() => BigDataClickHandler()}>Большой объем</button>
            </div>
        </div>
    </div>
}

export default Introduction