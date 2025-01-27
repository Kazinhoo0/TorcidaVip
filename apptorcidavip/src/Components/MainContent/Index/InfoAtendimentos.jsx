import phone from '../../../imgs/Icon (12).png';
import mensagem from '../../../imgs/Icon (13).png';
import ellipse from '../../../imgs/Ellipse 9.png';
import iconmercadopago from '../../../imgs/icons8-pagamento-de-mercado-48.png';
import iconboleto from '../../../imgs/icons8-boleto-48.png';
import iconmastercard from '../../../imgs/icons8-mastercard-64.png';
import iconvisa from '../../../imgs/icons8-visa-50.png';
import iconseguranca from '../../../imgs/icons8-segurança-verificada-96.png';
import instagram from '../../../imgs/instagram (1).png'
import facebook from '../../../imgs/facebook.png'
import whatsapp from '../../../imgs/whatsapp.png'


export default function InfoAtendimentos ({customTop,customcopyrightcontainer}) {

    return (

        <>
         <div style={{
            display: 'flex',
            justifycontent: 'center',
            position: 'absolute',
            width: 1903,
            height: 400,
            top: customTop, /* Limita o valor de top */
            backgroundColor: '#363537'
         }} >

            <div className="cont-sun-atendimento">

                <div className="infos-atendimentos">

                    <div className='container-sun-infos'>
                        <div>
                            <h2 className="style-infos-title-atendimento">Atendimento</h2>
                            <p className="style-infos-atendimento">Horário de Funcionamento</p>
                        </div>
                       

                        <div style={{display: 'grid'}}>
                            <small className="style-infos-atendimento" >Segunda a Sexta - 08:00 ás 20:00</small>
                            <small className="style-infos-atendimento" >Domingo e Feriados: 10:00 ás 18:00</small>
                        </div>
                        
                        <div style={{display: 'grid'}}>
                            <small className="style-infos-atendimento">
                                <img style={{paddingRight: '5px'}} src={phone} alt="" />
                                (21) 99613-4701
                            </small>

                            <small className="style-infos-atendimento">
                                <img style={{paddingRight: '5px'}} src={mensagem} alt="" />
                                (21) 99613-4701
                            </small>
                        </div>
                       

                    </div>

                </div>

                <div className="infos-atendimentos">

                    <div className='container-sun-infos' >

                        <div>

                            <h2 className='style-infos-title-atendimento'>Nos Acompanhe</h2>

                            <img className='style-imgs-nosacompanhe' src={facebook} alt="" />
                            <img className='style-imgs-nosacompanhe' src={instagram} alt="" />
                            <img className='style-imgs-nosacompanhe' src={whatsapp} alt="" />

                        </div>
                        
                    </div>

                </div>

                <div className="infos-atendimentos">

                    <div style={{display: 'grid', height: '220px'}}>

                        <div style={{ display: 'grid', gap: 0, padding: 0, margin: 0}}>

                            <h2 className='style-infos-title-atendimento'>Ajuda</h2>
                            <small className="style-infos-atendimento" >Políticas de devoluções e Trocas</small>
                            <small className="style-infos-atendimento" >Políticas de Privacidade</small>
                            <small className="style-infos-atendimento" >Entregas e Prazos</small>

                        </div>
                        
                        <div style={{display: 'grid' }}>
                            <h2 className='style-infos-title-atendimento'>Meus Pedidos</h2>
                            <small className="style-infos-atendimento" >Acompanhe Seus Pedidos</small>
                            <small className="style-infos-atendimento" >Editar Cadastro</small>
                        </div>
                       
                    </div>
                    
                </div>

                <div className="infos-atendimentos">


                    <div style={{display: 'grid', height: '220px'}}>

                        <div style={{gap: 0, padding: 0, margin: 0}}>

                            <h2 className='style-infos-title-atendimento'>Formas de Pagamento</h2>
                            <img src={iconmercadopago} alt="" />
                            <img src={iconmastercard} alt="" />
                            <img src={iconboleto} alt="" />
                            <img src={iconvisa} alt="" />

                        </div>

                        <div style={{display: 'grid' }}>
                            <h2 className='style-infos-title-atendimento'>Site Seguro</h2>
                            <img src={iconseguranca} alt="" />
                        </div>

                    </div>


                </div>


            </div>
        </div>

        <div style={{top: customcopyrightcontainer}} className='copyright-container'>

            <div style={{display: 'grid', textAlign: 'start', paddingLeft: '20px'}}>
                <small>TORCIDA VIP</small>
                <small>CNPJ: 34.639.603/0001-50</small>
            </div>

            <div style={{paddingRight: '20px'}}>
                <small>© 2025 Todos os direitos reservados | Kauã Lopes | Torcida Vip.</small>  
            </div>

        </div>
        </>

       

    )
}