import '../../Index/Index.css';
import { MdOutlineAddShoppingCart } from "react-icons/md";
import seta from '../../../../imgs/seta-direita.png'
import { useNavigate } from 'react-router-dom';
import { useContext, useState} from 'react';
import ContextProducts from '../../../../context/ContextProduct';
// import { jwtDecode } from "jwt-decode";
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';



export default function Product({ favoriteicon, produto }) {

    const {dadosuserlogon, setProdutosOnCarrinho, fetchProductDetails} = useContext(ContextProducts)
    
    const [selectedSize, setSelectedSize] = useState(null);
        
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

    const handleClicked = () => {
        const id = produto.produto_id;
        fetchProductDetails(id);
        setTimeout(() => {
            navigate(`/viewproduct/${produto.produto_id}`)
        }, 500);
    }

    const HandlefetchAddOnCarrinho = async (e) => {
        e.stopPropagation();
        console.log('produto id:', produto.produto_id)
        console.log('Handleaddoncarrinho disparado!');

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

        try {
            const userid = dadosuserlogon.id;
            const id = produto.produto_id;
            const nomeitem = produto.nome;
            const preco = produto.preco;
            const imagemitem = produto.imagem;
            const tamanhoSelecionado = produto.tamanhos.find(t => t.tamanho === selectedSize);
            const idproduto = tamanhoSelecionado.idproduto
            const codigo = tamanhoSelecionado.codigo
            if (!tamanhoSelecionado) {
            // Opcional: trate o caso em que o tamanho não foi encontrado
            return Toastify({
                text: 'Tamanho selecionado não disponível!',
                position: 'center',
                style: {
                background: '#db2d0e',
                color: '#ffffff'
                }
            }).showToast();
            }

            const marca = tamanhoSelecionado.marca;
            const estoque = tamanhoSelecionado.estoque;

            if (!userid) {
                return Toastify({
                    text: 'Você precisa estar logado!',
                    position: 'center',
                    style: {
                        background: '#db2d0e',
                        color: '#ffffff'
                    }
            }).showToast();
            }

            const response = await fetch(`https://torcidavipoficial-teste.onrender.com/api/post/additemcarrinho`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    userid: userid,
                    itemid: id,
                    nomeitem: nomeitem,
                    preco: preco,
                    thumbnail: imagemitem,
                    tamanho: selectedSize,
                    marca: marca,
                    estoque: estoque,
                    quantidade: 1,
                    idproduto: idproduto,
                    codigo: codigo
                 })
            });

            if (!response.ok) {
                throw new Error('Erro ao buscar dados');
            }

            const data = await response.json();

            console.log('Resposta do backend' , data)

            if (data.success) {
                console.log('retorno do datasuccess',data);
                Toastify({
                    text:  data.message ||'Adicionado ao carrinho!',
                    position: 'center',
                    style: {
                        background: '#33ff00',
                        color: '#ffffff'
                    }
                }).showToast();
                setSelectedSize(null);

                setProdutosOnCarrinho(prev => [...prev, { itemid: id, nomeitem, preco, thumbnail: imagemitem, tamanho: selectedSize, marca: marca, quantidade: 1, estoque:estoque, idproduto: idproduto, codigo: codigo }]);
            } else {
                console.log(data.message);
            }

        } catch (err) {
            console.error(err.message);
            Toastify({
                text: 'O produto já está no carrinho!',
                position: 'center',
                style: {
                    background: '#db2d0e',
                    color: '#ffffff'
                }
        }).showToast();
        }
    };
    

    
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
                            // Adicione sua lógica de favorito/wishlist aqui
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

                    <div onClick={HandlefetchAddOnCarrinho} className='icon-addcart'>
                        <MdOutlineAddShoppingCart className='imgcarrinhocompras-style' style={{ height: 30, width: '50px' }} />
                        <p className='font-addcart'>Adicionar</p>
                    </div>
                </div>
            </div>
          
        </>
    )
}