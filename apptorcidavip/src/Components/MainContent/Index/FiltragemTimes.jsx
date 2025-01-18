
import camisa2 from '../../../imgs/Bull-Bot.png';
import gorro from '../../../imgs/Change-Flu.png';
import camisafluminense from '../../../imgs/image (1).png';
import casacovasco from '../../../imgs/15195639859_15186736348_imagem_2023-04-17_115903763.png';






export default function FiltragemTimes () {


    return ( 

        <>
            <div className="container_filtrartimes">
                <div className="maisfiltrartime-style">
                </div>
                <h1 className="style-textfiltraportime">FILTRAR POR TIMES</h1>
            </div>


                <div className='container-productsfiltrartimes'>

                    <div className='products-filtrartimes'>

                        <img src={camisa2} alt="" />
                        <h2 className='textfiltrartime'>
                            PARA VOCÊ, <br/>BOTAFOGUENSE
                        </h2>
                            
                    </div>

                    <div className='products-filtrartimes'>

                        <img src={gorro} alt="" />
                        
                        <h2 className='textfiltrartime'>
                            PARA VOCÊ,  <br/>FLAMENGUISTA
                        </h2>
                            
                    </div>

                    <div className='products-filtrartimes'>

                        <img src={camisafluminense} alt="" />
                        <h2 className='textfiltrartime'>
                            PARA VOCÊ, <br/>TRICOLOR
                        </h2>
                 
                    </div>

                    <div className='products-filtrartimes'>

                        <img src={casacovasco} alt="" />
                        <h2 className='textfiltrartime'>
                            PARA VOCÊ, <br/>VASCAINO
                        </h2>
                            
                    </div>

                </div>
                
        </>

    )
}