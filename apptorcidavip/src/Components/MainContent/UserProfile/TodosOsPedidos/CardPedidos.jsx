import './todosospedidos.css';
import camisateste from '../../../../imgs/15195641246_15170945177_D40-1332-014_zoom1-2.png'

export default function CardPedidos ({nomeitem, thumbnail, preco}) {

    return (

        <div className="container-cardpedidos">

            <div className='infos-cardpedidos'>

                <div className='itemphoto'>
                    <div style={{borderRadius: '5px', border: '1px solid grey', width: 100, height: 100, padding: 5}}>
                        <img  style={{width: 100, height: 100}} src={thumbnail} alt="" />
                    </div>
                </div>

                <div className='date-entregue'>
                    <small>
                        <small style={{color: 'green', fontSize: 17, fontWeight: 500}}>Entregue</small>
                    </small>

                    <small style={{color: 'black', fontWeight: 700, fontSize: 15}}>
                        Chegou no dia 21 de novembro
                    </small>

                    <br/>

                    <small style={{color: 'grey'}}>{nomeitem}</small>
                    <small style={{color: 'grey'}}>preco: R${preco}</small>
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
                    <button>Ver compra</button>
                    <button>Comprar novamente</button>
                </div>

            </div>

        </div>
    )
}