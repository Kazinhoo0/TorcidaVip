import '../TodosOsPedidos/todosospedidos.css';
import Cardenviados from './cardenviados';


export default function Enviados () {


    return (

        <div className="container-meuspedidos">
                
            <div className='title-meuspedidos'>
                <h3 style={{fontSize: 22}}>Meus pedidos</h3>
            </div>
            
            <div className='render-todospedidos'>
                <Cardenviados/>
            </div>
                     
        </div>
    )
}