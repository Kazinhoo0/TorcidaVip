import InfoAtendimentos from '../Index/InfoAtendimentos';
import InfoSite from '../Index/InfoSite';
import TopFlap from '../Index/TopFlap';
import './searchproduct.css';
import icon10 from '../../../imgs/Icon (10).png';
// import vector from '../../../imgs/Vector.png';
// import camisa11 from '../../../imgs/image.png';
// import heart from '../../../imgs/heart.png';
import Product from '../Product/DesigneProduct';
import FilterCategory from './FilterCategory';
import ContextProducts from '../../../context/ContextProduct';
import { useContext } from 'react';



export default function SearchProduct() {

    const { produtos, loading, error} = useContext(ContextProducts)

    if (loading) return <p>Carregando produtos...</p>;
    if (error) return <p>Erro ao carregar os produtos: {error}</p>;
    
    return (



        <div className='container-searchproduct'>

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

                <div className='resultsearch' style={{lineHeight: 3, height: 100,width: 300,display: 'flex', justifyContent:'center', alignItems: 'start'}}>
                    <p>BOTAFOGO</p> 
                </div>

                <div className='howmuchresults' style={{height: 53,display: 'flex', justifyContent:'center', alignItems: 'center'}}>
                    <small>*100 produtos(s) encontrado(s)</small>
                </div>
            </div>

            <div className='sun-searchproduct'>

                <FilterCategory/>
    

                <div className='container-renderproducts-searched'>

                    {produtos.slice(0,15).map((produto) => (
                                   <Product key={produto.id} produto={produto} />
                    ))}  
                
                </div>

            </div>

            <InfoSite customTop={2330} />

            <InfoAtendimentos customcopyrightcontainer={2900} customTop={2500} />

        </div>
    )
}