import InfoAtendimentos from '../Index/InfoAtendimentos';
import InfoSite from '../Index/InfoSite';
import TopFlap from '../Index/TopFlap';
import './viewproduct.css';
import iconmercadopago from '../../../imgs/Mercado Pago.png';
import iconestrela from '../../../imgs/Icon (11).png'

export default function ViewProduct () {


    return (

        <div className="container-viewprod">

            <TopFlap />

            <div className='sun-viewprod'>

                <div className='aligndiv-viewprod'>

                    <div style={{ paddingLeft: 20, height: '80px', display: 'flex', alignItems: 'end', justifyContent: 'start' }} >
                        <p>Início - Femínino - Camisas - Regata Fluminense Left Feminino</p>
                    </div>

                    <div style={{height: '700px', display:'flex', justifyContent: 'center'}}>

                        <div className='container-info-prod'>
                            <h2 className='h2-product-style'>Regata fluminense <br/> Left feminina</h2>
                            <h3 className='text-price-product-style'>R$ 89,90</h3>

                            <p style={{display: 'flex', alignItems: 'center', justifyContent: 'start', width: '500px'}}>
                                <img src={iconmercadopago} alt="" />
                                <small style={{fontFamily:'Montserrat Alternates', fontWeight: '500', marginLeft: 10}} ><small style={{fontWeight: '800'}}>Até 12x sem cartão</small> com a linha de Crédito</small>
                            </p>
                            
                            <ul style={{listStyle: 'none', display: 'flex', alignItems: 'center', justifyContent: 'start' ,border: '1px solid red'}}>
1
                                <li>
                                    <button className='style-feedback-start'><img src={iconestrela} alt="" /></button>
                                </li>

                                <li>
                                    <button className='style-feedback-start'><img src={iconestrela} alt="" /></button>
                                </li>

                                <li >
                                    <button className='style-feedback-start'><img src={iconestrela} alt="" /></button>
                                </li>

                                <li>
                                    <button className='style-feedback-start'><img src={iconestrela} alt="" /></button>
                                </li>

                                <li>
                                    <button className='style-feedback-start'><img src={iconestrela} alt="" /></button>
                                </li>

                            </ul>
                        </div>

                        <div className='container-info-prod'>

                        </div>

                    </div>

                </div>

                
            </div>

            <InfoSite customTop={1760} />
                
            <InfoAtendimentos customcopyrightcontainer={2300} customTop={1900} />


        </div>  
    )
}       