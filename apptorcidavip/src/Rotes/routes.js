import { Route, Routes } from 'react-router-dom';
import IndexComponent from '../Components/MainContent/Index/PagIndex';
import PagLogin from '../Components/MainContent/Login/PagLogin'
import UserProfile from '../Components/MainContent/UserProfile/UserProfile';
import SearchProduct from '../Components/MainContent/SearchProduct/SearchProduct';
import ViewProduct from '../Components/MainContent/Product/ViewProduct';


const Rotas = () => {


    return (

        <Routes>

            <Route element={<IndexComponent/>} path='/' ></Route>
            <Route element={<PagLogin/>}  path='/Login'></Route>
            <Route element={<UserProfile/>} path='/Profile'></Route>
            <Route element={<SearchProduct/>} path='/searchproduct'></Route>
            <Route element={<ViewProduct/>} path='/viewproduct/id:'></Route>
        </Routes>
    )
}

export default Rotas