
import casacodestaque from '../../../imgs/casacovascodestaque.png';
import heart from '../../../imgs/heart.png';
import Product from '../Product/DesigneProduct';
import { useContext } from 'react';
import ContextProducts from '../../../context/ContextProduct';

export default function NovidadesLoja ( ) {

    const { produtosdbImgandProd ,produtosdb, produtosapi, loading, error} = useContext(ContextProducts)

    if (loading) return <p>Carregando produtos...</p>;

    if (error) {
        console.log(error)
    }


    const produtosUnicos = Array.from(
        new Map(produtosdb.map((produto) => [produto.produto_id, produto])).values()
    );

    return ( 
        <>
            <div className="container_destaques">
                <div className="maisnovidadeloja-style">
                    <h1 className="style-textnovidadesloja">NOVIDADES NA LOJA</h1>
                </div>
            </div>


            <div className="produtos-destaque">

                <div style={{display: 'grid', padding: 0}}>

                    {produtosUnicos.slice(11, 13).map((produto) => (
                        <Product key={produto.produto_id} produto={produto} />
                    ))}
                    

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