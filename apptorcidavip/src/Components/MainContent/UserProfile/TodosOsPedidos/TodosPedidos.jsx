import CardPedidos from './CardPedidos';
import './todosospedidos.css';
import { Helmet } from 'react-helmet';


export default function TodosOspedidos () {

    return (

        <div className="container-meuspedidos">
            <Helmet>
                <title>Torcida Vip | Todos os pedidos</title>
            </Helmet>

           <div className='title-meuspedidos'>
                <h3 style={{fontSize: 22}}>Meus pedidos</h3>
           </div>
            
            <div className='render-todospedidos'>
                <CardPedidos/>
            </div>



        </div>
    )
}