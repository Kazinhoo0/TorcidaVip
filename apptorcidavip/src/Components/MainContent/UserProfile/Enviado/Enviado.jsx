import '../TodosOsPedidos/todosospedidos.css';
import Cardenviados from './cardenviados';
import { Helmet } from 'react-helmet';


export default function Enviados () {


    return (

        <div className="container-meuspedidos">

            <Helmet>
                <title>Torcida Vip | Enviados</title>
            </Helmet>
                
            <div className='title-meuspedidos'>
                <h3 style={{fontSize: 22}}>Meus pedidos</h3>
            </div>
            
            <div className='render-todospedidos'>
                <Cardenviados/>
            </div>
                     
        </div>
    )
}