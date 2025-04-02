import Product from '../Product/Designe/DesigneProduct';
import ContextProducts from '../../../context/ContextProduct';
import { useContext } from 'react';
import './Index.css'
import ProductEmpity from '../Product/Designe/DesigneProductEmpity';



export default function MaisVendidos() {
    

    const { produtosdb, loading, error, allprodutosdb} = useContext(ContextProducts)

    // if (loading) return <div class="wrapper">
    // <div class="circle"></div>
    // <div class="circle"></div>
    // <div class="circle"></div>
    // <div class="shadow"></div>
    // <div class="shadow"></div>
    // <div class="shadow"></div>
    // </div>;

    if (error) {
        console.log(error)
    }
        

    const getNomeBase = (nomeCompleto) => {
        if (nomeCompleto.includes('Tamanho:')) {
          return nomeCompleto.split('Tamanho:')[0].trim();
        }
        return nomeCompleto.trim();
      };
      
      // Função para agrupar os tamanhos com seus respectivos estoques
    const agruparTamanhosComEstoque = (produtos) => {
    return produtos.reduce((acc, item) => {
        // Extrai o nome base para agrupar o produto
        const nomeBase = getNomeBase(item.nome);
        if (item.tamanho) {
        if (!acc[nomeBase]) {
            acc[nomeBase] = [];
        }
        // Adiciona o objeto com tamanho e estoque
        acc[nomeBase].push({
            tamanho: item.tamanho,
            estoque: item.estoque,
            marca: item.marca,
            idproduto: item.idproduto,
            codigo: item.codigo
        });
        }
        return acc;
    }, {});
    };

    // Exemplo de uso com o array allprodutosdb:
    const tamanhosComEstoque = agruparTamanhosComEstoque(allprodutosdb);

    const produtosUnicos = Array.from(
        new Map(produtosdb.map((produto) => [produto.produto_id, produto])).values()
    );


    const produtosComTamanhos = produtosUnicos.map((produto) => {
        return {
          ...produto,
          // Usa a função getNomeBase para pegar a parte "limpa" do nome do produto
          tamanhos: tamanhosComEstoque?.[getNomeBase(produto.nome)] || []
        };
    });
      
    
   
    // console.log("Dados do db no frontend:", produtosdb);
    // console.log('AllprodDb:' , allprodutosdb)
    // console.log('TamanhosAgrupados:' ,tamanhosComEstoque);
    console.log('produtosComTamanhos: ', produtosComTamanhos)

    return (

        <>
            <div className="container-maisvendido">
                <div className="maisvendido-style">
                    <h1 className="style-textmaisvendido">MAIS VENDIDOS</h1>
                </div>
            </div>

            <div className="products-maisvendidos">

                {produtosComTamanhos.slice(15, 25).map((produto) => (
                    produto.tamanhos.length === 0 || produto.tamanhos.every(t => t.estoque <= 0) ? (
                    <ProductEmpity key={produto.produto_id} produto={produto} />
                    ) : (
                    <Product key={produto.produto_id} produto={produto} />
                    )
                ))} 


            </div>

        </>
    )
}