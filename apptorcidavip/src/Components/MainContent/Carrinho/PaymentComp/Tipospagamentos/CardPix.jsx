import { useContext, useState } from 'react';
import ContextProducts from '../../../../../context/ContextProduct';
import '../pagamento.css';
import { SiMercadopago } from "react-icons/si";
import '../../../Product/ProductDetail/viewproduct.css';
import { useNavigate } from 'react-router-dom';
import TicketPix from './TicketPix';

export default function CardPix ({totalpedido}) {

    const navigate = useNavigate();

    const { loading, setLoading, dadosuserlogon } = useContext(ContextProducts);

    const [pixData , setPixData] = useState(null);

    if (loading) {
        return <div style={{width:'100%', height: '1000px', justifyContent: 'center', display: 'flex', alignItems: 'center'}}>
                    <div className="spinner"></div>
                </div>
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const amount = totalpedido
        const identificationType = 'CPF'
        const email = dadosuserlogon.email
        const usercpf = dadosuserlogon.cpf
    
        try {
          const response = await fetch('https://torcidavipoficial-teste.onrender.com/criarpix', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              transaction_amount: Number(amount),
              description: 'Descrição Pix',
              paymentMethodId: 'pix',
              email: email,
              identificationType: identificationType,
              number: usercpf
            })
          });
    
          if (!response.ok) {
            throw new Error('Erro ao processar pagamento');
          }
    
          const data = await response.json();
          // console.log('info PIX :', data);
          setPixData(data);
        } catch (err) {
          console.log(err.message);
        } finally {
          setLoading(false);
        }
      };


    return (

        <>

            {pixData && (
               <TicketPix datapix={pixData}/>
            )}

            <div className='container-pix'>
                <span>
                    Ao finalizar o pedido, acesse o aplicativo do seu banco na opção Pix e escaneie ou copie o código de pagamento.
                </span>
                
                <p style={{}}>R$preço com desconto</p>

                <button onClick={handleSubmit} className='btn-payment'>Finalizar pedido</button>

                <div style={{display: 'flex', justifyContent: 'center' ,alignItems: 'center'}}>
                    <SiMercadopago style={{width: '100px', height: 40}}/>
                    <p style={{textAlign: 'start'}}>Pagamento feito será concluido de uma forma totalmente segura com Mercado Pago.<br/><a href="">Para mais informações clique aqui!</a></p>
                </div>

            </div>
        </>
    )
}