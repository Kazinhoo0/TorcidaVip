import '../pagamento.css';
import { FaCreditCard } from "react-icons/fa";
import { FaPix } from "react-icons/fa6";
import { useState } from 'react';
import CardCartao from '../Tipospagamentos/CardCartão';
import CardPix from '../Tipospagamentos/CardPix';


export default function EtapasPagamento () {


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

                                {clickedformpayment.cartaocredito &&  (
                                    <CardCartao/>
                                )} 
                                

                                <li onClick={ () =>openpaymentmethod('pix')}>
                                    <div style={{width: 30, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><FaPix/></div>
                                    <div>Pix</div>
                                    <div style={{width: 120}}>Á vista</div>
                                </li>


                                {clickedformpayment.pix &&  (
                                    <CardPix/>
                                )} 

                            </ul>

                        </div>

                    </div>
                </div>


            </div>

        </>            

    )
}