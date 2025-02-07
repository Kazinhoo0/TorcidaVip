import '../TodosOsPedidos/todosospedidos.css';
import camisateste from '../../../../imgs/15195641246_15170945177_D40-1332-014_zoom1-2.png';


export default function CardProcessando () {

    return ( 

        <div>
            <div className="container-cardpedidos">
        
                <div className="title-cardpedidos">
                        <h4 style={{fontSize: 15}}> 27 de Janeiro de 2025</h4>
                        <h4 style={{paddingLeft: 15}}>Total: R$199,00</h4>
                </div>
                    
                    <div className='infos-cardpedidos'>
        
                        <div className='itemphoto'>
                            <div style={{borderRadius: '5px', border: '1px solid grey', width: 100, height: 100, padding: 5}}>
                                <img  style={{width: 100, height: 100}} src={camisateste} alt="" />
                            </div>
                        </div>
        
                        <div className='date-entregue'>
                            <small>
                                <small style={{color: 'grey', fontSize: 17, fontWeight: 500}}>Em Análise</small>
                            </small>
        
                            <small style={{color: 'black', fontWeight: 700, fontSize: 15}}>
                                Chegou no dia 21 de novembro
                            </small>
        
                            <br/>
        
                            <small style={{color: 'grey'}}>Camiseta feminina vasco da gama</small>
                            <small style={{color: 'grey'}}>1 unidade</small>
                        </div>
        
                        <div className='enviarmensagem'>
                            
                            <small>
                                TORCIDAVIP
                            </small>
        
                            <small>
                                Enviar mensagem
                            </small>
                            
                        </div>
        
                        <div className='btn-vercompra-comprarnovamente'>
                            <button>Rastrear pedido</button>
                            <button>Ver compra</button>
                        </div>
        
                    </div>
            </div>
        </div>
    )
}