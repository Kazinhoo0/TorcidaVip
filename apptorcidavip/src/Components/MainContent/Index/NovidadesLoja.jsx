
import casacodestaque from '../../../imgs/casacovascodestaque.png';
import heart from '../../../imgs/heart.png';
import Product from '../Product/Designe/DesigneProduct';
import { useContext } from 'react';
import ContextProducts from '../../../context/ContextProduct';
import ProductEmpity from '../Product/Designe/DesigneProductEmpity';

export default function NovidadesLoja() {

    const { allprodutosdb, produtosdb, loading, error } = useContext(ContextProducts)

    if (loading) return <p>Carregando produtos...</p>;

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
            estoque: item.estoque
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
      

    return (
        <>
            <div className="container_destaques">
                <div className="maisnovidadeloja-style">
                    <h1 className="style-textnovidadesloja">NOVIDADES NA LOJA</h1>
                </div>
            </div>


            <div className="produtos-destaque">

                <div style={{ display: 'grid', padding: 0 }}>

                    {produtosComTamanhos.slice(11, 13).map((produto) => (
                        produto.tamanhos.every((tamanho) => tamanho.estoque === '' || tamanho.estoque === 0) ? (
                        <ProductEmpity key={produto.produto_id} produto={produto} />
                        ) : (
                        <Product key={produto.produto_id} produto={produto} />
                        )
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