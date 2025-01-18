import seguro from '../../../imgs/Lock 02.png';
import troca from '../../../imgs/Bag 05.png';
import entrega from '../../../imgs/Delivery.png';
import cartao from '../../../imgs/Card 02.png';



export default function InfoSite ({customTop}) {

    return ( 

        <>

            <div style={{
                display:'flex',
                position: 'absolute',
                width: '1096px',
                height: '100px',
                left: '400px',
                top: customTop
            }} className='infosite'>

                    <div className='container-info'>

                        <img src={troca} alt="" />

                        <div>
                            <h2 className='info-title-style'>TROCAS E DEVOLUÇÕES</h2>
                            <p className='info-subs-style'>15 dias após o recebimento</p>
                        </div>

                    </div>

                    <div className='container-info' >

                        <img src={entrega} alt="" />

                        <div>
                            <h2 className='info-title-style'>RECEBA EM CASA</h2>
                            <p className='info-subs-style'>Enviamos para todo o Brasil</p>
                        </div>

                    </div>

                    <div className='container-info'>

                        <img src={seguro} alt="" />

                        <div>
                            <h2 className='info-title-style'>100% SEGURO</h2>
                            <p className='info-subs-style'>Seus dados estão protegidos</p>
                        </div>

                    </div>

                    <div className='container-info'>  

                        <div>
                            <img src={cartao} alt="" />
                        </div>
                        
                        <div>
                            <h2 className='info-title-style'>PARCELE EM ATÉ 12X</h2>
                            <p className='info-subs-style'>Com seu cartão de crédito</p>
                        </div>

                    </div>

            </div>

                    
        </>

        
    )
}