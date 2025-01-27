import { Route, Routes } from 'react-router-dom';
import IndexComponent from '../Components/MainContent/Index/PagIndex';
import PagLogin from '../Components/MainContent/Login/PagLogin'
import UserProfile from '../Components/MainContent/UserProfile/UserProfile';
import SearchProduct from '../Components/MainContent/SearchProduct/SearchProduct';
import ViewProduct from '../Components/MainContent/Product/ViewProduct';
import CarrinhoCompras from '../Components/MainContent/Carrinho/CarrinhoCompras';
import Register from '../Components/MainContent/UserRegister/Registe';
import Novoendereco from '../Components/MainContent/UserProfile/Endereços/Novoendereco';


const Rotas = () => {


    return (

        <Routes>

            <Route element={<IndexComponent/>} path='/' ></Route>
            <Route element={<PagLogin/>}  path='/Login'></Route>
            <Route element={<UserProfile/>} path='/Profile'></Route>
            <Route element={<SearchProduct/>} path='/searchproduct'></Route>
            <Route element={<ViewProduct/>} path='/viewproduct/id:'></Route>
            <Route element={<CarrinhoCompras/>} path='/carrinhocompras' ></Route>
            <Route element={<Register/>} path='/register'></Route>
            <Route element={<Novoendereco/>} path='/novoendereco'  ></Route>
        </Routes>
    )
}

export default Rotas