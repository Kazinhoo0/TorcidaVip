import Product from '../Product/DesigneProduct';
import ContextProducts from '../../../context/ContextProduct';
import { useContext} from 'react';
import './Index.css'



export default function MaisVendidos() {
    

    const { produtosdbImgandProd ,produtosdb, produtosapi, loading, error} = useContext(ContextProducts)

    if (loading) return <p>Carregando produtos...</p>;

    if (error) {
        console.log(error)
    }
         
    console.log("Dados do db no frontend:", produtosdb);
    console.log("Dados da api frontend:", produtosapi);


    // const produtosComImagens = produtosdb.map(produto => {
    //     // Filtrar as imagens relacionadas ao produto
    //     const imagensRelacionadas = produtosdbImgandProd.filter(imagem => imagem.produto_id === produto.id);
    //     return {
    //       ...produto,
    //       imagens: imagensRelacionadas,
    //     };
    //   });


    //    // Criar uma lista de produtos combinando os dados da API com as imagens do BD
    //    const produtosComImagens = produtosapi.map(produto => {
    //     // Encontrar as imagens no produtosdb com base no idprodutopai
    //     const imagensProduto = produtosdb.filter(img => img.idprodutopai === produto.idprodutopai);

    //     return {
    //         ...produto,  // Mantém os dados do produto original
    //         // imagens: imagensProduto.map(img => img.caminho)
    //         caminho: imagensProduto ? imagensProduto.caminho : null, // Adiciona as imagens
    //     };
    // });


    return (

        <>
            <div className="container-maisvendido">
                <div className="maisvendido-style">
                    <h1 className="style-textmaisvendido">MAIS VENDIDOS</h1>
                </div>
            </div>

            <div className="products-maisvendidos">

                
                {produtosdb.slice(0, 10).map((produto) => {
                    // console.log('produtos dentro do api:' , produto); 
                    return <Product key={produto.id} produto={produto} />
                })} 
               
              
            </div>

        </>
    )
}