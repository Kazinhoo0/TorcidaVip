import '../Index/Index.css';
import { MdOutlineAddShoppingCart } from "react-icons/md";
import seta from '../../../imgs/seta-direita.png'
// import { useContext } from 'react';
// import ContextProducts from '../../../context/ContextProduct';
// import { useEffect } from 'react';


export default function Product({ favoriteicon, produto }) {



    
    return (
        <>

            <div className="products-opcoes">
            
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

                <div className='icon-addcart'>

                    <MdOutlineAddShoppingCart className='imgcarrinhocompras-style' style={{ height: 30, width: '50px' }} />
                    <p className='font-addcart'>Adicionar</p>

                </div>

            </div>

        </div>
          
        </>
    )
}