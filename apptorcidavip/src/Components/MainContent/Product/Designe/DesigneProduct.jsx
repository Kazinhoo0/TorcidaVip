import '../../Index/Index.css';
import { MdOutlineAddShoppingCart } from "react-icons/md";
import seta from '../../../../imgs/seta-direita.png'
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState} from 'react';
import ContextProducts from '../../../../context/ContextProduct';
// import { jwtDecode } from "jwt-decode";
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';



export default function Product({ allprodwithsizes , produto }) {

    const {dadosuserlogon, setProdutosOnCarrinho, fetchProductDetails, fetchaddfavoriteprod, handleAddOnCarrinho, selectedSize, setSelectedSize} = useContext(ContextProducts);
    
    const navigate = useNavigate();

    const handleNoStockReserved = () => {
       return Toastify({
            text: 'Tamanho não disponível!',
            position: 'center',
            style: {
                background: '#db2d0e',
                color: '#ffffff'
            }
    }).showToast();
    }

    const handlepassAttributescarditens = async (e) => {
        e.stopPropagation();

        const userid = dadosuserlogon.id;
        const quantidade = 1
        const id = produto.produto_id;
        const nomeitem = produto.nome;
        const preco = produto.preco;
        const imagemitem = produto.imagem;
        const tamanhoSelecionado = produto.tamanhos.find(t => t.tamanho === selectedSize);
        const tamanho = tamanhoSelecionado.tamanho
        const marca = tamanhoSelecionado.marca;
        const estoque = tamanhoSelecionado.estoque;
        const idproduto = tamanhoSelecionado.idproduto
        const codigo = tamanhoSelecionado.codigo

        if (!tamanhoSelecionado) {
        // Opcional: trata o caso em que o tamanho não for encontrado
        return Toastify({
            text: 'Tamanho selecionado não disponível!',
            position: 'center',
            style: {
            background: '#db2d0e',
            color: '#ffffff'
            }
        }).showToast();
        }

        if(!selectedSize) {
            return Toastify({
                text: 'Selecione um tamanho',
                position: 'center',
                style: {
                    background: '#db2d0e',
                    color: '#ffffff'
                }
        }).showToast();
        }

        handleAddOnCarrinho(userid,id,nomeitem,preco,imagemitem,tamanho,marca,estoque,quantidade,idproduto,codigo);  

    };


    const handleClicked = () => {
        const id = produto.produto_id;
        const handleTamanhoProduct = allprodwithsizes.find(produto => produto.produto_id === id)
        fetchProductDetails(id);
        navigate(`/viewproduct/${produto.produto_id}`, {state: { infosprod: handleTamanhoProduct}})
    }

    return (
        <>

            <div onClick={handleClicked} className="products-opcoes">
                <div style={{ position: 'relative' }}>
                    <img className='shirt-image' src={produto.imagem} alt={produto.nome} />

                    {/* Heart Button - Agora usando a classe CSS para responsividade */}
                    <div 
                        className='favorite-icon'
                        onClick={(e) => {
                            e.stopPropagation();
                            fetchaddfavoriteprod(produto.produto_id,produto.imagem,produto.nome);
                            
                        }}
                    >
                        <svg 
                            width="22" 
                            height="20" 
                            viewBox="0 0 22 20" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path 
                                d="M11 19.25L9.55 17.9C4.4 13.36 1 10.28 1 6.5C1 3.42 3.42 1 6.5 1C8.24 1 9.91 1.81 11 3.09C12.09 1.81 13.76 1 15.5 1C18.58 1 21 3.42 21 6.5C21 10.28 17.6 13.36 12.45 17.9L11 19.25Z" 
                                stroke="black" 
                                strokeWidth="2" 
                                fill="none"
                            />
                        </svg>
                    </div>

                    <p className='itensname-style'>
                        {produto.nome}
                    </p>
                    <h3 style={{ display: 'flex', justifyContent: 'start', fontWeight: 'bold', fontSize: '30px' }}>R${produto.preco}</h3>
                </div>

                <div className='container-adicionarcarrinho'>
                    <div className='container-choose-size'>
                        <div style={{ width: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img style={{ height: 12, transform: 'rotate(176deg)' }} src={seta} alt="" />
                        </div>

                        <div className='container-roll-sizes'>
                            <ul>
                                {produto.tamanhos?.map((item, index) => {
                                    return item.estoque === 0 || item.estoque === '0' ? (
                                        <li 
                                            onClick={(e) => {
                                                handleNoStockReserved();
                                                e.stopPropagation();
                                            }} 
                                            style={{backgroundColor: 'rgba(128, 128, 128, 0.438'}} 
                                            key={index} 
                                            className='sun-sizes'
                                        >
                                            <h4>{item.tamanho}</h4>
                                        </li>
                                    ) : (
                                        <li 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedSize(item.tamanho)
                                            }} 
                                            key={index} 
                                            className='sun-sizes'
                                            style={{
                                                cursor: 'pointer',
                                                border: selectedSize === item.tamanho ? '2px solid blue' : 'none'
                                            }}
                                        >
                                            <h4>{item.tamanho}</h4>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>

                        <div style={{ width: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img style={{ height: 12 }} src={seta} alt="" />
                        </div>
                    </div>

                    <div onClick={handlepassAttributescarditens} className='icon-addcart'>
                        <MdOutlineAddShoppingCart className='imgcarrinhocompras-style' style={{ height: 30, width: '50px' }} />
                        <p className='font-addcart'>Adicionar</p>
                    </div>
                </div>
            </div>
          
        </>
    )
}