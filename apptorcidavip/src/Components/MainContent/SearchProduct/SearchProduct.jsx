import InfoAtendimentos from '../Index/InfoAtendimentos';
import InfoSite from '../Index/InfoSite';
import TopFlap from '../Index/TopFlap';
import './searchproduct.css';
import icon10 from '../../../imgs/Icon (10).png';
// import vector from '../../../imgs/Vector.png';
// import camisa11 from '../../../imgs/image.png';
// import heart from '../../../imgs/heart.png';
import Product from '../Product/Designe/DesigneProduct';
import FilterCategory from './FilterCategory';
import ContextProducts from '../../../context/ContextProduct';
import { useContext } from 'react';
import { Helmet } from 'react-helmet';
import ProductEmpity from '../Product/Designe/DesigneProductEmpity';




export default function SearchProduct() {

    const { allprodutosdb , produtossearched, loading, error } = useContext(ContextProducts)

    // if (loading) return <p>Carregando produtos...</p>;

    if (error) {
        console.log(error)
    }

    const Namesearched = localStorage.getItem('itemsearched')

    const lengthprodsearched = produtossearched.length


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

    const produtosComTamanhos = produtossearched.map((produto) => {
        return {
          ...produto,
          // Usa a função getNomeBase para pegar a parte "limpa" do nome do produto
          tamanhos: tamanhosComEstoque?.[getNomeBase(produto.nome)] || []
        };
    });
      


    return (



        <div className='container-searchproduct'>


            <Helmet>
                <title>Torcida Vip | {Namesearched}</title>
            </Helmet>  

            <TopFlap />

            <div className='aligndiv-searchproduct'>

                {/* <div style={{ paddingLeft: 20, height: '80px', display: 'flex', alignItems: 'end', justifyContent: 'start' }} >
                    <p>Início Femínino</p>
                </div> */}

                <div style={{ height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                    <img style={{ height: '25px', paddingLeft: 20 }} src={icon10} alt="" />
                    <h3 className='font-text-profilepage'>Filtrar por Categoria</h3>
                </div>

            </div>

            <div className='container-resultsearch'>

                <div className='resultsearch' style={{ lineHeight: 3, height: 100, width: 300, display: 'flex', justifyContent: 'center', alignItems: 'start' }}>
                    <p>{Namesearched}</p>
                </div>

                <div className='howmuchresults' style={{ height: 53, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <small>{lengthprodsearched} produto(s) encontrado(s)</small>
                </div>
            </div>

            <div className='sun-searchproduct'>


                <div style={{ width: '250px' }}>
                    <FilterCategory />
                </div>


                <div className='container-renderproducts-searched'>

                    {produtosComTamanhos.slice(0, 10).map((produto) => (
                        produto.tamanhos.every((tamanho) => tamanho.estoque === '' || tamanho.estoque === 0) ? (
                        <ProductEmpity key={produto.produto_id} produto={produto} />
                        ) : (
                        <Product key={produto.produto_id} produto={produto} />
                        )
                    ))} 

                </div>

            </div>

            <InfoSite customTop={2330} />

            <InfoAtendimentos customcopyrightcontainer={2900} customTop={2500} />

        </div>
    )
}