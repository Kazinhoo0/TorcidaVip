import { Route, Routes } from 'react-router-dom';
import IndexComponent from '../Components/MainContent/Index/PagIndex';



const Rotas = () => {


    return (

        <Routes>

            <Route element={<IndexComponent/>} path='/home' ></Route>
            
        </Routes>
    )
}

export default Rotas