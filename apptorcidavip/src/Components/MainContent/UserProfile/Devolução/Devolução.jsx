import CardDevolucao from "./carddevolucao";


export default function Devolução () {


    return (
        <div className="container-meuspedidos">
                
            <div className='title-meuspedidos'>
                <h3 style={{fontSize: 22}}>Meus pedidos</h3>
            </div>
            
            <div className='render-todospedidos'>
                <CardDevolucao/>
            </div>
            
        </div>
    )
}