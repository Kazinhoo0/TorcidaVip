import { IoHomeOutline } from "react-icons/io5";



export default function FreteeResumo () {

    return ( 

        <div className="container-freteeresumo">

            <div className="container-frete">

                <header className="title-freteandresumocarrinho">
                    <h3>Frete</h3>
                </header>

                <div className="container-inputfrete">
                    <IoHomeOutline style={{position: 'absolute' }}/>
                    <input className="style-inputcep" placeholder="CEP" type="text" />
                    <a style={{marginLeft: '20px'}} href="">Não sei meu CEP</a>
                </div>

            </div>

            <div  className="container-resumopedido">
               
               <header className="title-freteandresumocarrinho">
                    <h3>Resumo pedido</h3>
               </header>
               <small style={{display: 'flex', justifyContent: 'space-between', paddingLeft: 23, paddingRight: 20, borderBottom: '3px solid grey'}}>
                    <small>Subtotal</small>
                    <small>R$190,00</small>
               </small>

               <small style={{display: 'flex', justifyContent: 'space-between', paddingLeft: 23, paddingRight: 20}}>

                    <smal>
                        Total do pedido
                    </smal>

                    <smal>
                        <small>190,00</small><br/>
                    </smal>
               </small>
            </div>
        </div>
    )
}