import phone from '../../../imgs/Icon (12).png';
import mensagem from '../../../imgs/Icon (13).png';
import ellipse from '../../../imgs/Ellipse 9.png';
import iconmercadopago from '../../../imgs/icons8-pagamento-de-mercado-48.png';
import iconboleto from '../../../imgs/icons8-boleto-48.png';
import iconmastercard from '../../../imgs/icons8-mastercard-64.png';
import iconvisa from '../../../imgs/icons8-visa-50.png';
import iconseguranca from '../../../imgs/icons8-segurança-verificada-96.png';
import instagram from '../../../imgs/instagram (1).png';
import facebook from '../../../imgs/facebook.png';
import whatsapp from '../../../imgs/whatsapp.png';
import sslseguro from '../../../imgs/iamgem ssl.jpg'
import { useNavigate } from 'react-router-dom';



export default function InfoAtendimentos ({customTop,customcopyrightcontainer}) {

    const navigate = useNavigate();

    const handlenavigatepolitica = () => {
        navigate('/politicas-de-privacidade/devolucoes-trocas/entregas-prazos')
    }

    return (

            <>


            
            <footer 
                className='footer-container' 
                style={{
                    marginTop: customTop,
                }}
            >
                <div className="footer-content">
                    <div className="footer-section">
                        <h2 className="footer-title">Atendimento</h2>
                        <p className="footer-text">Horário de Funcionamento</p>
                        <div className="footer-hours">
                            <small className="footer-text">Segunda a Sexta - 08:00 ás 20:00</small>
                            <small className="footer-text">Domingo e Feriados: 10:00 ás 18:00</small>
                        </div>
                        <div className="footer-contact">
                            <div className="contact-item">
                                <img src={phone} alt="Telefone" />
                                <small className="footer-text">(21) 99613-4701</small>
                            </div>
                            <div className="contact-item">
                                <img src={mensagem} alt="Mensagem" />
                                <small className="footer-text">(21) 99613-4701</small>
                            </div>
                        </div>
                    </div>

                    <div className="footer-section">
                        <h2 className="footer-title">Nos Acompanhe</h2>
                        <div className="social-links">
                            <a href="#" className="social-link">
                                <img src={facebook} alt="Facebook" />
                            </a>
                            <a href="https://www.instagram.com/lojatorcidavip/" className="social-link">
                                <img src={instagram} alt="Instagram" />
                            </a>
                            <a href="https://api.whatsapp.com/send?phone=5521988520793&text=Boa%20tarde%20somos%20somos%20o%20suporte%20da%20TorcidaVip,%20como%20posso%20lhe%20ajudar%20?%20" className="social-link">
                                <img src={whatsapp} alt="WhatsApp" />
                            </a>
                        </div>
                    </div>

                    <div className="footer-section">
                        <div className="footer-links">
                            <h2 className="footer-title">Ajuda</h2>
                            <small onClick={handlenavigatepolitica} className="footer-link">Políticas de devoluções e Trocas</small>
                            <small onClick={handlenavigatepolitica} className="footer-link">Políticas de Privacidade</small>
                            <small onClick={handlenavigatepolitica} className="footer-link">Entregas e Prazos</small>
                        </div>
                        
                        <div className="footer-account">
                            <h2 className="footer-title">Meus Pedidos</h2>
                            <small className="footer-link">Acompanhe Seus Pedidos</small>
                            <small className="footer-link">Editar Cadastro</small>
                        </div>
                    </div>

                    <div className="footer-section">
                        <div className="payment-methods">
                            <h2 className="footer-title">Formas de Pagamento</h2>
                            <div className="payment-icons">
                                <img src={iconmercadopago} alt="Mercado Pago" />
                                <img src={iconmastercard} alt="Mastercard" />
                                <img src={iconboleto} alt="Boleto" />
                                <img src={iconvisa} alt="Visa" />
                            </div>
                        </div>

                        <div className="security">
                            <h2 className="footer-title">Site Seguro</h2>
                            <div className="security-icons">
                                <img src={sslseguro} alt="SSL Seguro" className="ssl-icon" />
                                <img src={iconseguranca} alt="Segurança" className="security-icon" />
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            <div 
                className="copyright" 
                style={{
                    marginTop: customcopyrightcontainer
                }}
            >
                <div className="copyright-company">
                    <small>TORCIDA VIP</small>
                    <small>CNPJ: 34.639.603/0001-50</small>
                </div>
                <div className="copyright-text">
                    <small>© 2025 Todos os direitos reservados | Kauã Lopes | Torcida Vip.</small>
                </div>
            </div>
        </>
    );
}