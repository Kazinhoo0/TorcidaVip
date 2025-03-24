import { useNavigate } from 'react-router-dom'
import ComponentProductpedido from '../ComponentProdutospedido/ComponentProductspedido'
import '../pagamento.css';
import { useContext, useEffect } from 'react';
import ContextProducts from '../../../../../context/ContextProduct';



export default function Resumopedido ({produtosoncarrinho}) {

    const {resumopedido, freteSelecionado} = useContext(ContextProducts)

    const navigate = useNavigate();

    const handlenavigatecarrinho = () => {
        navigate('/carrinhocompras')
    }

    const totalpedido = resumopedido.totalpedido + Number(freteSelecionado);


    return (


        <>
            <div className='container-etapaspagamento'>

                <div className='title-resumopedido'>
                    <h3>Resumo do pedido</h3>
                </div>

                {produtosoncarrinho.map((produto) => {
                    return <ComponentProductpedido key={produto.id} infoproduto= {produto}/>
                })}

                <div style={{textAlign: 'end'}}>
                    <a onClick={handlenavigatecarrinho} href="">Voltar ao carrinho</a> 
                </div>
            
                <div>
                    <div style={{textAlign: 'start'}}>
                        <span>Observações</span>
                    </div>
                   

                    <textarea style={{maxWidth: 350, width: 340,height:200, maxHeight: 500}} placeholder='Adicione informações relacionadas ao seu pedido.' name="" id="observacoes"></textarea>
                </div>

                <span></span>

                <div className='totalsubtotalprod'> 
                    <ul>
                        <li>
                            <div className='div-subtotal'>
                                <span>Subtotal</span> 
                            </div>
                           <span>R${resumopedido.totalpedido}</span>
                        </li>

                        <li>
                            <div className='div-subtotal'>
                                <span>Frete</span>    
                            </div>
                            
                            <span>R${freteSelecionado}</span>
                        </li>

                        <li>
                            <div className='div-subtotal'>
                                <span style={{fontWeight: 700}}>Total do pedido</span>
                            </div>
                        
                            <span>R${(totalpedido).toFixed(2)}</span>
                        </li>

                    </ul>
                </div>


            </div>
        </>
    )
}