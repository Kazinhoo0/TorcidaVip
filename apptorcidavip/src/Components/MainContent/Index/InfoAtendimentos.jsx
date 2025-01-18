import phone from '../../../imgs/Phone (1).png';
import mensagem from '../../../imgs/MessageTyping.png';
import ellipse from '../../../imgs/Ellipse 9.png';
import retangulo from '../../../imgs/Rectangle 14.png';
import retangulo2 from '../../../imgs/Rectangle 17.png';



export default function InfoAtendimentos ({customTop,customcopyrightcontainer}) {

    return (

        <>
         <div style={{
            display: 'flex',
            justifycontent: 'center',
            position: 'absolute',
            width: 1902,
            height: 400,
            top: customTop, /* Limita o valor de top */
            backgroundColor: '#363537'
         }} >

            <div className="cont-sun-atendimento">

                <div className="infos-atendimentos">

                    <div className='container-sun-infos'>
                        <div>
                            <h2 className="style-infos-atendimento">Atendimento</h2>
                            <p className="style-infos-atendimento">Horário de Funcionamento</p>
                        </div>
                       

                        <div style={{display: 'grid'}}>
                            <small className="style-infos-atendimento" >Segunda a Sexta - 08:00 ás 20:00</small>
                            <small className="style-infos-atendimento" >Domingo e Feriados: 10:00 ás 18:00</small>
                        </div>
                        
                        <div style={{display: 'grid'}}>
                            <small className="style-infos-atendimento">
                                <img src={phone} alt="" />
                                (21) 99613-4701
                            </small>

                            <small className="style-infos-atendimento">
                                <img src={mensagem} alt="" />
                                (21) 99613-4701
                            </small>
                        </div>
                       

                    </div>

                </div>

                <div className="infos-atendimentos">

                    <div className='container-sun-infos' >

                        <div>

                            <h2 className='style-infos-atendimento'>Nos Acompanhe</h2>

                            <img src={ellipse} alt="" />
                            <img src={ellipse} alt="" />
                            <img src={ellipse} alt="" />

                        </div>
                        
                    </div>

                </div>

                <div className="infos-atendimentos">

                    <div style={{display: 'grid', height: '220px'}}>

                        <div style={{ display: 'grid', gap: 0, padding: 0, margin: 0}}>

                            <h2 className='style-infos-atendimento'>Ajuda</h2>
                            <small className="style-infos-atendimento" >Políticas de devoluções e Trocas</small>
                            <small className="style-infos-atendimento" >Políticas de Privacidade</small>
                            <small className="style-infos-atendimento" >Entregas e Prazos</small>

                        </div>
                        
                        <div style={{display: 'grid' }}>
                            <h2 className='style-infos-atendimento'>Meus Pedidos</h2>
                            <small className="style-infos-atendimento" >Acompanhe Seus Pedidos</small>
                            <small className="style-infos-atendimento" >Editar Cadastro</small>
                        </div>
                       
                    </div>
                    
                </div>

                <div className="infos-atendimentos">


                    <div style={{display: 'grid', height: '220px'}}>

                        <div style={{ gap: 0, padding: 0, margin: 0}}>

                            <h2 className='style-infos-atendimento'>Formas de Pagamento</h2>
                            <img src={retangulo} alt="" />
                            <img src={retangulo} alt="" />
                            <img src={retangulo} alt="" />
                            <img src={retangulo} alt="" />

                        </div>

                        <div style={{display: 'grid' }}>
                            <h2 className='style-infos-atendimento'>Site Seguro</h2>
                            <img src={retangulo2} alt="" />
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
                <small>© 2025 Todos os direitos reservados.</small>  
            </div>

        </div>
        </>

       

    )
}