import CardPedidos from './CardPedidos'
import './todosospedidos.css'


export default function TodosOspedidos () {

    return (

        <div className="container-meuspedidos">

           <div className='title-meuspedidos'>
                <h3 style={{fontSize: 22}}>Meus pedidos</h3>
           </div>
            
            <div className='render-todospedidos'>
                <CardPedidos/>
            </div>



        </div>
    )
}