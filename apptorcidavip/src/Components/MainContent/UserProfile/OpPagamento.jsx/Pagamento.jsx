import Cardcartoes from './CardCartoes'
import './Pagamento.css'


export default function OpPagamento () {


    return (

        <div className="container-cartoes">

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