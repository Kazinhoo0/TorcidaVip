
import casacodestaque from '../../../imgs/casacovascodestaque.png';
import camisa1 from '../../../imgs/15195641246_15170945177_D40-1332-014_zoom1-2.png';
import camisa2 from '../../../imgs/Bull-Bot.png';
import heart from '../../../imgs/heart.png';

export default function NovidadesLoja ( ) {



    return ( 
        <>
            <div className="container_destaques">
                <div className="maisnovidadeloja-style">
                </div>
                <h1 className="style-textnovidadesloja">NOVIDADES NA LOJA</h1>
            </div>


            <div className="produtos-destaque">
                <div style={{display: 'grid', padding: 0}}>

                    <div className="products-opcoes">
                        
                        <div>
                            <img src={camisa1} alt="" />

                            <img className='favorite-icon' src={heart} alt="" />
                            
                            <p className='itensname-style'  style={{display: 'flex', justifyContent: 'start', height: 10}}>
                                Regata Fluminense Left Feminina
                            </p>
                            <h3 style={{display: 'flex', justifyContent: 'start', fontWeight: 'bold'}}>R$ 59,90</h3>
                        </div>
                    
                    </div>


                    <div className="products-opcoes">
                    
                        <div>
                            <img src={camisa2} alt="" />
    
                            <img className='favorite-icon' src={heart} alt="" />
                            
                            <p className='itensname-style'  style={{display: 'flex', justifyContent: 'start', height: 10}}>
                                Regata Fluminense Left Feminina
                            </p>
                            <h3 style={{display: 'flex', justifyContent: 'start', fontWeight: 'bold'}}>R$ 59,90</h3>
                        </div>
                    
                    </div>
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