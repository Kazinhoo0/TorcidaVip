
import casacodestaque from '../../../imgs/casacovascodestaque.png';
import camisa1 from '../../../imgs/15195641246_15170945177_D40-1332-014_zoom1-2.png';
import camisa2 from '../../../imgs/Bull-Bot.png';
import heart from '../../../imgs/heart.png';
import Product from '../Product/DesigneProduct';

export default function NovidadesLoja ( ) {



    return ( 
        <>
            <div className="container_destaques">
                <div className="maisnovidadeloja-style">
                    <h1 className="style-textnovidadesloja">NOVIDADES NA LOJA</h1>
                </div>
            </div>


            <div className="produtos-destaque">

                <div style={{display: 'grid', padding: 0}}>

                    <Product linkimg={camisa1} nomeitem={'Regata Fluminense Left Feminina'} />

                    <Product linkimg={camisa2} nomeitem={'Regata Fluminense Left Feminina'} />
                    
                    
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