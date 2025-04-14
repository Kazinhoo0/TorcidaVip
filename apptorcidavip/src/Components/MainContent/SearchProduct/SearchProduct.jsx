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
import { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import ProductEmpity from '../Product/Designe/DesigneProductEmpity';
import IndexComponent from '../Index/PagIndex';




export default function SearchProduct() {

    const { allprodutosdb , produtossearched, filterstate , productsfiltred , loading, error } = useContext(ContextProducts);

    // if (loading) {
    //     return  <div style={{width:'100%', height: '1000px', justifyContent: 'center', display: 'flex', alignItems: 'center'}}>
    //                 <div className="spinner"></div>
    //             </div>
    // } 
    
    if (error) {
        console.log(error)
    }

    const isFilterMarked = () => {
        return (
            filterstate.tamanho.length > 0 ||
            filterstate.marca.length > 0 || 
            filterstate.cor.length > 0 ||
            filterstate.genero.length > 0
        )
    }

    const Namesearched = localStorage.getItem('itemsearched');

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


    const productsFiltredWithSize = productsfiltred.map((produto) => {
        return {
          ...produto,
          // Usa a função getNomeBase para pegar a parte "limpa" do nome do produto
          tamanhos: tamanhosComEstoque?.[getNomeBase(produto.nome)] || []
        };
    });





    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const indexOfLastItem = currentPage + itemsPerPage;
    const IndexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = produtosComTamanhos.slice(IndexOfFirstItem, indexOfLastItem)


    const totalPages = Math.ceil(produtosComTamanhos.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

    return (



        <div className='container-searchproduct'>
        <Helmet>
            <title>Torcida Vip | {Namesearched}</title>
        </Helmet>  
    
        <TopFlap />
    
        <div className='aligndiv-searchproduct'>
            <div style={{ height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                <img style={{ height: '25px', padding: '0 20px' }} src={icon10} alt="" />
                <h3 className='font-text-profilepage'>Filtrar por Categoria</h3>
            </div>
        </div>
    
        <div className='container-resultsearch'>
            <div className='resultsearch'>
                <p>{Namesearched}</p>
            </div>
    
            <div className='howmuchresults'>
                <small>{lengthprodsearched} produto(s) encontrado(s)</small>
            </div>
        </div>
    
        <div className='sun-searchproduct'>
            <div className='container-filtercategory'>
                <FilterCategory nameitem={Namesearched} />
            </div> 
            
            <div style={{ width: '100%' }}>
                <div className='container-renderproducts-searched'>
                    {isFilterMarked() ? (
                    productsFiltredWithSize && productsFiltredWithSize.length > 0 ? (
                        productsFiltredWithSize.map((produto) =>
                        produto.tamanhos.length === 0 || produto.tamanhos.every(t => t.estoque === 0) ? (
                            <ProductEmpity key={produto.produto_id} produto={produto} />
                        ) : (
                            <Product key={produto.produto_id} produto={produto} />
                        )
                        )
                    ) : (
                        <div>Nenhum produto foi encontrado com os filtros selecionados.</div>
                    )
                    ) : (
                    currentProducts && currentProducts.length > 0 ? (
                        currentProducts.map((produto) =>
                        produto.tamanhos.length === 0 || produto.tamanhos.every(t => t.estoque <= 0) ? (
                            <ProductEmpity key={produto.produto_id} produto={produto} />
                        ) : (
                            <Product key={produto.produto_id} produto={produto} />
                        )
                        )
                    ) : (
                        <div>Nenhum produto foi encontrado.</div>
                    )
                    )}

                </div>
    
                <div className="pagination">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            style={{
                                background: currentPage === index + 1 ? '#47B868' : '#ccc',
                            }}
                            disabled={currentPage === index + 1}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    </div>
    )
}