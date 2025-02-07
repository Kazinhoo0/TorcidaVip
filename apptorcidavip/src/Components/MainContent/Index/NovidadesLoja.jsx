
import casacodestaque from '../../../imgs/casacovascodestaque.png';
import heart from '../../../imgs/heart.png';
import Product from '../Product/DesigneProduct';
import { useContext } from 'react';
import ContextProducts from '../../../context/ContextProduct';

export default function NovidadesLoja ( ) {

    // const {produtos} = useContext(ContextProducts)

    return ( 
        <>
            <div className="container_destaques">
                <div className="maisnovidadeloja-style">
                    <h1 className="style-textnovidadesloja">NOVIDADES NA LOJA</h1>
                </div>
            </div>


            <div className="produtos-destaque">

                <div style={{display: 'grid', padding: 0}}>

                    {/* {produtos.slice(0,2).map((produto) => (
                        <Product key={produto.id} produto={produto} />
                    )) } */}
                    

                </div>  

                <div className='container-bigproductdestaque'>

                    <div>
                        <img src={casacodestaque} alt="" />
                    </div>

                </div>

            </div>
        </>
           
        
    )
}