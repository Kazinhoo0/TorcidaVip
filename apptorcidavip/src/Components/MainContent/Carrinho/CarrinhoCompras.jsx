import InfoAtendimentos from "../Index/InfoAtendimentos";
import TopFlap from "../Index/TopFlap";
import CardItemCarrinho from "./CardItemCarrinho";
import './carrinho.css';
import FreteeResumo from "./FreteeResumo";



export default function CarrinhoCompras () {


    return (
        
        <div className="container-carrinhocompras">

            <TopFlap/>

            <div className="sun-carrinhocompras">

                <header className="container-headermeucarrinho">
                   
                    <h3>Meu carrinho</h3>

                    <button className="style-buttoncontinuar">Continuar</button>
                   
                </header>
                <CardItemCarrinho/>

                <FreteeResumo/>

                <div style={{display: 'flex', justifyContent: 'space-between', width: '1260px', paddingLeft: 25, paddingRight: 25, paddingTop
                    : 20}}>
                    <button style={{background: 'grey'}} className="style-buttoncontinuar">Escolher mais produtos</button>
                    <button className="style-buttoncontinuar">Continuar</button>
                </div>

            </div>

            <InfoAtendimentos customcopyrightcontainer={1500} customTop={1100}/>

        </div>
    )
}