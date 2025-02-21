import '../../Index/Index.css';
import { MdOutlineAddShoppingCart } from "react-icons/md";
import seta from '../../../../imgs/seta-direita.png'
import { useNavigate } from 'react-router-dom';
import { useContext} from 'react';
import ContextProducts from '../../../../context/ContextProduct';
// import { jwtDecode } from "jwt-decode";
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';


export default function Product({ favoriteicon, produto }) {

    const {setProductDetails, dadosuserlogon, produtosoncarrinho , setProdutosOnCarrinho } = useContext(ContextProducts)


    const navigate = useNavigate();

    const handleClicked = () => {
            const fetchproductsDetails = async () => {
                try {
                    const id = produto.produto_id;
                    // console.log('id a ser enviado pro backend: ',id)
                    const response = await fetch(`http://localhost:3000/viewproduct/${id}`, {
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
                        console.log('produtos do db no provider', data);
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
        }, 1000);
    }

    


    const HandlefetchAddOnCarrinho = async (e) => {
        e.stopPropagation();

        console.log('produto id:', produto.produto_id)

        console.log('Handleaddoncarrinho disparado!');

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

            const response = await fetch(`/api/post/additemcarrinho`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    userid: userid,
                    itemid: id,
                    nomeitem: nomeitem,
                    preco: preco,
                    thumbnail: imagemitem
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

                    <img className='shirt-image' src={produto.imagem} alt="" />

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
                                <li className='sun-sizes'>
                                    <h4>P</h4>
                                </li>
                                <li className='sun-sizes'>
                                    <h4>M</h4>
                                </li>
                                <li className='sun-sizes'>
                                    <h4>G</h4>
                                </li>
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