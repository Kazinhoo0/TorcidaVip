import { Route, Routes } from 'react-router-dom';
import IndexComponent from '../Components/MainContent/Index/PagIndex';
import PagLogin from '../Components/MainContent/Login/PagLogin'
import UserProfile from '../Components/MainContent/UserProfile/UserProfile';
import SearchProduct from '../Components/MainContent/SearchProduct/SearchProduct';
import ViewProduct from '../Components/MainContent/Product/ProductDetail/ViewProduct';
import CarrinhoCompras from '../Components/MainContent/Carrinho/CarrinhoCompras';
import Register from '../Components/MainContent/Register/UserRegister/Registe';
import Novoendereco from '../Components/MainContent/UserProfile/Endereços/Novoendereco';
import MaisVendidos from '../Components/MainContent/Index/MaisVendidos';
import AddNewImgProduct from '../Components/MainContent/ConfidenceContent/AddNewImg/AddNewImgProduct';
import CardVazio from '../Components/MainContent/Carrinho/CardVazio';
import ConfigItens from '../Components/MainContent/ConfidenceContent/ConfigItens/ConfigItens';
import CardPagamento from '../Components/MainContent/Carrinho/PaymentComp/Pagamento';
import Politics from '../Components/MainContent/PoliticasERegulamentos/Politics';
import TestePoliticas from '../Components/MainContent/PoliticasERegulamentos/Politicas';



const Rotas = () => {


    return (

        <Routes>

            <Route element={<IndexComponent/>} path='/' ></Route>
            <Route element={<PagLogin/>}  path='/Login'></Route>
            <Route element={<UserProfile/>} path='/Profile'></Route>
            <Route element={<SearchProduct/>} path='/searchproduct'></Route>
            <Route element={<ViewProduct/>} path='/viewproduct/:id'></Route>
            <Route element={<CardVazio/>} path='/carrinhocomprasvazio' ></Route>
            <Route element={<CarrinhoCompras/>} path='/carrinhocompras' ></Route>
            <Route element={<Register/>} path='/register'></Route>
            <Route element={<Novoendereco/>} path='/novoendereco'  ></Route>
            <Route element={<MaisVendidos/>} path='/api/produtoss'></Route>
            <Route element={<AddNewImgProduct/>} path='/api/addnewimageprod'></Route>
            <Route element={<ConfigItens/>} path='/configitens'></Route>
            <Route element={<CardPagamento/>} path='/paymentpage'></Route>
            <Route element={<Politics/>} path='./politicas-de-privacidade/devolucoes-trocas/entregas-prazos'></Route>
            <Route element={<TestePoliticas/>} path='./testepoliticas'></Route>

        </Routes>
    )
}


export default Rotas