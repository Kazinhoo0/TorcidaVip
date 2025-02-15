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



export default function SearchProduct() {

    const { produtosdbImgandProd, produtosdb, produtosapi, loading, error } = useContext(ContextProducts)

    // if (loading) return <p>Carregando produtos...</p>;

    if (error) {
        console.log(error)
    }


    const produtosUnicos = Array.from(
        new Map(produtosdb.map((produto) => [produto.produto_id, produto])).values()
    );

    return (



        <div className='container-searchproduct'>


            <Helmet>
                <title>Torcida Vip | 'NAMEPROD'</title>
            </Helmet>  

            <TopFlap />

            <div className='aligndiv-searchproduct'>

                <div style={{ paddingLeft: 20, height: '80px', display: 'flex', alignItems: 'end', justifyContent: 'start' }} >
                    <p>Início Femínino</p>
                </div>

                <div style={{ height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                    <img style={{ height: '25px', paddingLeft: 20 }} src={icon10} alt="" />
                    <h3 className='font-text-profilepage'>Filtrar por Categoria</h3>
                </div>

            </div>

            <div className='container-resultsearch'>

                <div className='resultsearch' style={{ lineHeight: 3, height: 100, width: 300, display: 'flex', justifyContent: 'center', alignItems: 'start' }}>
                    <p>BOTAFOGO</p>
                </div>

                <div className='howmuchresults' style={{ height: 53, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <small>*100 produtos(s) encontrado(s)</small>
                </div>
            </div>

            <div className='sun-searchproduct'>


                <div style={{ width: '250px' }}>
                    <FilterCategory />
                </div>


                <div className='container-renderproducts-searched'>

                    {produtosUnicos.slice(15, 27).map((produto) => (
                        <Product key={produto.produto_id} produto={produto} />
                    ))}

                </div>

            </div>

            <InfoSite customTop={2330} />

            <InfoAtendimentos customcopyrightcontainer={2900} customTop={2500} />

        </div>
    )
}