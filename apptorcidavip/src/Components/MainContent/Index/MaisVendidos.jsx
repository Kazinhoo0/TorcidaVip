import Product from '../Product/Designe/DesigneProduct';
import ContextProducts from '../../../context/ContextProduct';
import { useContext } from 'react';
import './Index.css'



export default function MaisVendidos() {
    

    const { produtosdb, produtosapi, loading, error} = useContext(ContextProducts)

    if (loading) return <p>Carregando produtos...</p>;

    if (error) {
        console.log(error)
    }
         
    // console.log("Dados do db no frontend:", produtosdb);
    // console.log("Dados da api frontend:", produtosapi);

    const produtosUnicos = Array.from(
        new Map(produtosdb.map((produto) => [produto.produto_id, produto])).values()
    );


    // const produtosComImagens = produtosdb.map(produto => {
    //     // Filtrar as imagens relacionadas ao produto
    //     const imagensRelacionadas = produtosdbImgandProd.filter(imagem => imagem.produto_id === produto.id);
    //     return {
    //       ...produto,
    //       imagens: imagensRelacionadas,
    //     };
    //   });
    


    return (

        <>
            <div className="container-maisvendido">
                <div className="maisvendido-style">
                    <h1 className="style-textmaisvendido">MAIS VENDIDOS</h1>
                </div>
            </div>

            <div className="products-maisvendidos">

                
            {produtosUnicos.slice(0, 10).map((produto) => (
                <Product key={produto.produto_id} produto={produto} />
            ))}
               
              
            </div>

        </>
    )
}