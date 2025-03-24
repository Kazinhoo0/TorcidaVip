import '../pagamento.css';
import { BsQrCodeScan } from "react-icons/bs";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { IoTimeOutline } from "react-icons/io5";
import { FaMoneyCheckAlt } from "react-icons/fa";


export default function TicketPix ({datapix}) {



    return (

        <>
            <div className="cont-pg-pix">

                <p style={{fontWeight: 600}}>Quase lá, agora só falta realizar o pagamento...</p>

                <ul>
                    <li>
                        <IoPhonePortraitOutline style={{width:25, height: 25}}/>
                        <span>Acesse seu Internet App de pagamentos e escolha pagar via Pix.</span>
                    </li>

                    <li>
                        <BsQrCodeScan style={{width:25, height: 25, paddingLeft: 10}}/>
                        <span>Escaneie o QR Code ou copie o código de pagamento.</span>
                    </li>

                    <li>
                        <IoTimeOutline style={{width:25, height: 25}}/>
                        <span>Seu pagamento será aprovado em alguns minutos.</span>
                    </li>

                    <li>
                        <FaMoneyCheckAlt style={{width:25, height: 25}}/>
                        <span>Este pagamento para TorcidaVip é processado por Mercado Pago.</span>
                    </li>
                </ul>

                {datapix && (
                    <div>
                        <p>Escaneie o QR Code com o app do seu banco:</p>
                        <img style={{width: 200, height: 200}} src={`data:image/png;base64,${datapix.qr_code_base64}`} alt="QR Code para pagamento" />
                    </div>
                )}

            </div>
        
        </>
    )
}