import Cardcartoes from './CardCartoes';
import './Pagamento.css';
import { Helmet } from 'react-helmet';


export default function OpPagamento () {


    return (

        <div className="container-cartoes">

            <Helmet>
                <title>Torcida Vip | Opcões Pagamento</title>
            </Helmet>

            <div className='container-tittle-cartoes'>
                <h3>Cartões</h3>
            </div>

            <div className='container-rendercarts'>
                <Cardcartoes/>
                <Cardcartoes/>
                <Cardcartoes/>
            </div>
        </div>

    )
}