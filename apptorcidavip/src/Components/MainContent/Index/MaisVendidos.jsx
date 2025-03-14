import Product from '../Product/Designe/DesigneProduct';
import ContextProducts from '../../../context/ContextProduct';
import { useContext } from 'react';
import './Index.css'
import ProductEmpity from '../Product/Designe/DesigneProductEmpity';



export default function MaisVendidos() {
    

    const { produtosdb, loading, error} = useContext(ContextProducts)

    if (loading) return <div class="wrapper">
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="shadow"></div>
    <div class="shadow"></div>
    <div class="shadow"></div>
</div>;

    if (error) {
        console.log(error)
    }
         
    console.log("Dados do db no frontend:", produtosdb);
    // console.log("Dados da api frontend:", produtosapi);

    const produtosUnicos = Array.from(
        new Map(produtosdb.map((produto) => [produto.produto_id, produto])).values()
    );


    return (

        <>
            <div className="container-maisvendido">
                <div className="maisvendido-style">
                    <h1 className="style-textmaisvendido">MAIS VENDIDOS</h1>
                </div>
            </div>

            <div className="products-maisvendidos">

                {produtosUnicos.slice(0, 10).map((produto) => (
                    produto.estoque === "0" || produto.estoque === 0 ? (
                    <ProductEmpity key={produto.produto_id} produto={produto} />
                    ) : (
                    <Product key={produto.produto_id} produto={produto} />
                    )
                ))} 


                {/* {produtosUnicos.slice(0, 10).map((produto) => 
                    (
                        <ProductEmpity key={produto.produto_id} produto={produto} />
                    )
                )}  */}

            </div>

        </>
    )
}