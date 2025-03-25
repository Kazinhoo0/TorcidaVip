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

    const {setProductDetails, dadosuserlogon, setIdProductView, setProdutosOnCarrinho } = useContext(ContextProducts)
    
    const [selectedSize, setSelectedSize] = useState(null);
        
    const navigate = useNavigate();

    const handleClicked = () => {
            const fetchproductsDetails = async () => {
                try {
                    const id = produto.produto_id;
                    // console.log('id a ser enviado pro backend: ',id)
                    const response = await fetch(`https://torcidavipoficial-teste.onrender.com/viewproduct/${id}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ id })
                    });
    
                    if (!response.ok) {
                        throw new Error('Erro ao buscar dados');
                    }
    
                    const data = await response.json();
    
                    if (data.success) {
                        setProductDetails(data.data);
                        setIdProductView(produto.produto_id);
                        console.log('detalhe do produto no data:', data);
                    } else {
                        console.log(data.message);
                    }
    
                } catch (err) {
                    console.error(err.message);
                }
            };
    
            fetchproductsDetails();
    
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
                    tamanho: selectedSize
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

                setProdutosOnCarrinho(prev => [...prev, { itemid: id, nomeitem, preco, thumbnail: imagemitem, tamanho: selectedSize }]);
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
                
                <div>

                    <img className='shirt-image' src={produto.imagem} alt={produto.nome} />

                    <img className='favorite-icon' src={favoriteicon} alt="" />

                    <p className='itensname-style' style={{ display: 'flex', justifyContent: 'start' }}>
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
                            <ul style={{ paddingRight: 40, listStyle: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '180px' }}>

                                {produto.tamanhos?.map((item,index) => {
                                    
                                    return item.estoque === 0 || item.estoque === '0' ? (
                                            <li style={{backgroundColor: 'rgba(128, 128, 128, 0.438'}} key={index} className='sun-sizes'>
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