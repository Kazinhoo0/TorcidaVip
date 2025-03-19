import { useNavigate } from 'react-router-dom'
import ComponentProductpedido from '../ComponentProdutospedido/ComponentProductspedido'
import '../pagamento.css';



export default function Resumopedido ({produtosoncarrinho}) {

    const navigate = useNavigate();

    const handlenavigatecarrinho = () => {
        navigate('/carrinhocompras')
    }
    
    return (


        <>
            <div className='container-etapaspagamento'>

                <div className='title-resumopedido'>
                    <h3>Resumo do pedido</h3>
                </div>

                {produtosoncarrinho.map((produto) => {
                    return <ComponentProductpedido key={produto.id} infoproduto= {produto}/>
                })}

                <a onClick={handlenavigatecarrinho} href="">Voltar ao carrinho</a>

                <div>
                    <span>Observações</span>

                    <textarea style={{maxWidth: 350, width: 340,height:200, maxHeight: 500}} placeholder='Adicione informações relacionadas ao seu pedido.' name="" id="observacoes"></textarea>
                </div>

                <span></span>

                <div>

                </div>
            </div>
        </>
    )
}