import '../pagamento.css';
import { FaCreditCard } from "react-icons/fa";
import { FaPix } from "react-icons/fa6";
import { useContext, useState } from 'react';
import CardCartao from '../Tipospagamentos/CardCartão';
import CardPix from '../Tipospagamentos/CardPix';
import ContextProducts from '../../../../../context/ContextProduct';


export default function EtapasPagamento () {

    const {resumopedido} = useContext(ContextProducts);

    // console.log('resumo pedido na paginad e pagamento', resumopedido)

    const [clickedformpayment, setClickedFormpayment] = useState({
        cartaocredito : false,
        pix: false
    });

    const openpaymentmethod = (filtername) => {
        setClickedFormpayment((prevFilters) => ({
            ...prevFilters,
            [filtername]: !prevFilters[filtername],
        }))
    }

    return (

        <>
        
            <div className='container-etapaspagamento'>

                <div className="container-infosetapaspagamento">

                    <div className='title'>

                        <span>
                            <span className='circlespan'>4</span> 
                            <span style={{paddingLeft: 10}}>Forma de pagamento</span>
                        </span>

                    </div>

                    <div className='formapagamento'>

                        <p style={{textAlign: 'start', paddingLeft: 10}}>Selecione uma forma de pagamento para finalizar seu pedido:</p>

                        <div className='formas'>

                            <ul>

                                <li  onClick={() =>openpaymentmethod('cartaocredito')}>
                                    <div style={{width: 30, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><FaCreditCard/></div>
                                    <div>Cartão de Crédito</div>
                                    <div style={{width: 150}} >Até 10x sem juros</div>
                                </li>

                                <div>
                                    {clickedformpayment.cartaocredito &&  (
                                        <CardCartao totalpedido={resumopedido.totalpedidowithfrete}/>
                                    )} 
                                </div>

                                

                                <li onClick={ () =>openpaymentmethod('pix')}>
                                    <div style={{width: 30, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><FaPix/></div>
                                    <div>Pix</div>
                                    <div style={{width: 120}}>Á vista</div>
                                </li>

                                <div>
                                    {clickedformpayment.pix &&  (
                                        <CardPix totalpedido={resumopedido.totalpedidowithfrete}/>
                                    )} 
                                </div>
                                

                            </ul>

                        </div>

                    </div>
                </div>


            </div>

        </>            

    )
}