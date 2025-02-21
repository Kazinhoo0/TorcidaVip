import carrinhovazio from '../../../imgs/abandoned-cart.png'
import { Helmet } from "react-helmet";
import TopFlap from '../Index/TopFlap';
import InfoAtendimentos from '../Index/InfoAtendimentos';

export default function CardVazio () {


    return ( 

        <div className="container-carrinhocompras">

        <Helmet>
            <title>Torcida Vip | Carrinho compras</title>
        </Helmet>   

        <TopFlap/>

        <div className="sun-carrinhocompras">

            <header className="container-headermeucarrinho">
               
                <h3>Meu carrinho</h3>

                <button className="style-buttoncontinuar">Continuar</button>
               
            </header>

            <div className="Imagem-carrinhovazio">
                <img style={{width: 150}} src={carrinhovazio} alt="" />
                <span>seu carrinho esta vazio!</span>
                <button className='btn-carrinhovazio'>Ir as compras</button>
           </div>

        </div>

        

        <InfoAtendimentos customcopyrightcontainer={1500} customTop={1100}/>

    </div>
    )
}