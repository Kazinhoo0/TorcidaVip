import '../../Index/Index.css';
import { MdOutlineAddShoppingCart } from "react-icons/md";
import seta from '../../../../imgs/seta-direita.png'
import { useNavigate } from 'react-router-dom';
import { useContext} from 'react';
import ContextProducts from '../../../../context/ContextProduct';
// import { jwtDecode } from "jwt-decode";
// import Toastify from 'toastify-js';
// import 'toastify-js/src/toastify.css';
// import imgteste from '../../../../imgs/15195641246_15170945177_D40-1332-014_zoom1-2.png'



export default function ProductEmpity ({ favoriteicon, produto }) {

    const {setProductDetails, refreshviewproduct } = useContext(ContextProducts)

 
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
                        // console.log('produtos do db no provider', data);
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

    console.log('id do produto:', refreshviewproduct)
    
    return (
        <>

            <div onClick={handleClicked} className="products-opcoes">
                
                    <div>

                        <div className='shirt-image-empity'>
                            <img className='shirt-image' src={produto.imagem} alt={produto.nome} />
                            <p>Esgotado</p>
                        </div>
                        

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
                                {produto.tamanhos?.map((item,index) => (
                                
                                    <li key={index} className='sun-sizes'>
                                        <h4>{item.tamanho}</h4>
                                    </li>
                               
                                ))}
                            </ul>
                        </div>

                        <div style={{ width: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img style={{ height: 12 }} src={seta} alt="" />
                        </div>

                    </div>

                    <div className='icon-addcart-empity'>

                        <MdOutlineAddShoppingCart className='imgcarrinhocompras-style' style={{ height: 30, width: '50px' }} />
                        <p className='font-addcart'>Adicionar</p>

                    </div>

                </div>

            </div>
          
        </>
    )
}