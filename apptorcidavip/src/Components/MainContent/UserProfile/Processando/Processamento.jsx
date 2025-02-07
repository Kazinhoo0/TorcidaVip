import CardProcessando from "./CardProcessando";





export default function Processando () {


    return ( 

        <div className="container-meuspedidos">
        
            <div className='title-meuspedidos'>
                <h3 style={{fontSize: 22}}>Meus pedidos</h3>
            </div>
            
            <div className='render-todospedidos'>
                <CardProcessando/>
            </div>
        
        
        
        </div>
    )
}