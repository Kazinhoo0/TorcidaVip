import CardDevolucao from "./carddevolucao";
import { Helmet } from "react-helmet";


export default function Devolução () {


    return (
        <div className="container-meuspedidos">

            <Helmet>
                <title>Torcida Vip | Devolucão</title>
            </Helmet>
                
            <div className='title-meuspedidos'>
                <h3 style={{fontSize: 22}}>Meus pedidos</h3>
            </div>
            
            <div className='render-todospedidos'>
                <CardDevolucao/>
            </div>
            
        </div>
    )
}