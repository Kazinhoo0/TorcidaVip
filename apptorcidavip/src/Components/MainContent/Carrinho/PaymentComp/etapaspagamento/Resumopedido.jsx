import { useNavigate } from 'react-router-dom';
import ComponentProductpedido from '../ComponentProdutospedido/ComponentProductspedido';
import '../pagamento.css';
import { useContext, useEffect, useState } from 'react';
import ContextProducts from '../../../../../context/ContextProduct';

export default function Resumopedido({produtosoncarrinho}) {
  const {resumopedido, freteSelecionado, setObservacoesPedido} = useContext(ContextProducts);
  const navigate = useNavigate();
  
  const handlenavigatecarrinho = () => {
    navigate('/carrinhocompras');
  }
  
  const totalpedido = resumopedido.totalpedido + Number(freteSelecionado);
  
  return (
    <>
      <div className="resumo-pedido-container">
        <h2 className="resumo-pedido-title">Resumo do pedido</h2>
        
      
            {produtosoncarrinho.map((produto) => {
                return <ComponentProductpedido key={produto.id} infoproduto= {produto}/>
            })}
            

        <button 
          className="voltar-carrinho-btn btn-payment"
          onClick={handlenavigatecarrinho}
        >
          Voltar ao carrinho
        </button>
        
        <div className="observacoes-container">
          <h3 className="observacoes-title">Observações</h3>
          <textarea
            className="observacoes-input"
            onChange={(e) => setObservacoesPedido(e.target.value)}
          ></textarea>
        </div>
        
        <div className="resumo-valores">
          <div className="resumo-item">
            <span className="resumo-label">Subtotal</span>
            <span className="resumo-valor">
              R${resumopedido.totalpedido.toFixed(2)}
            </span>
          </div>
          
          <div className="resumo-item">
            <span className="resumo-label">Frete</span>
            <span className="resumo-valor">
              R${Number(freteSelecionado).toFixed(2)}
            </span>
          </div>
          
          <div className="resumo-item">
            <span className="resumo-label">Total do pedido</span>
            <span className="resumo-valor">
              R${totalpedido.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}