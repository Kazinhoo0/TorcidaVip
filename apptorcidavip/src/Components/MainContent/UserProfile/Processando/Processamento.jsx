import CardProcessando from "./CardProcessando";
import { Helmet } from "react-helmet";





export default function Processando ({userpedidos}) {


    return ( 

        <div className="container-meuspedidos">

            <Helmet>
                <title>Torcida Vip | Processando</title>
            </Helmet>
        
            <div className='title-meuspedidos'>
                <h3 style={{fontSize: 22}}>Meus pedidos</h3>
            </div>
            
            <div className='render-todospedidos'>
                {userpedidos.map((pedido) => (
                    <div key={pedido.id} className="pedido">
                        <h3>Pedido realizado em: {new Date(pedido.data_compra).toLocaleString()}</h3>
                        <h4 style={{paddingLeft: 15}}>Total: R${pedido.totalpedido}</h4>
                        {/* Para cada produto dentro do pedido, renderize o CardPedidos */}
                        <CardProcessando infospedido={pedido}/>      
                    </div>
                ))}
            </div>
        
        
        
        </div>
    )
}