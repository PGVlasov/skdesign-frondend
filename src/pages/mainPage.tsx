import MainComponent from "@/components/mainComponent/mainComponent"
import Introduction from "@/components/introduction/introduction"
import { setupStore } from "@/services/redux/store/store"
import { Provider } from "react-redux"

const store = setupStore()


const MainPage = () => {

    return (
        <Provider store={store}>
            <div>
                <Introduction />
                <MainComponent />
            </div>
        </Provider>

    )
}

export default MainPage