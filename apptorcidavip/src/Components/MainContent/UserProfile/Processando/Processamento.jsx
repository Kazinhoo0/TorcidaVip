import CardProcessando from "./CardProcessando";
import { Helmet } from "react-helmet";





export default function Processando () {


    return ( 

        <div className="container-meuspedidos">

            <Helmet>
                <title>Torcida Vip | Processando</title>
            </Helmet>
        
            <div className='title-meuspedidos'>
                <h3 style={{fontSize: 22}}>Meus pedidos</h3>
            </div>
            
            <div className='render-todospedidos'>
                <CardProcessando/>
            </div>
        
        
        
        </div>
    )
}