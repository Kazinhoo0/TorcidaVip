import { useContext, useState } from 'react';
import ContextProducts from '../../../../../context/ContextProduct';
import '../pagamento.css';
import { SiMercadopago } from "react-icons/si";
import '../../../Product/ProductDetail/viewproduct.css';
import { useNavigate } from 'react-router-dom';
import TicketPix from './TicketPix';

export default function CardPix({ totalpedido, produtosoncarrinho }) {

  const navigate = useNavigate();

  const { loading, setLoading, dadosuserlogon, observacoespedido, depositoid } = useContext(ContextProducts);

  const [pixData, setPixData] = useState(null);

  if (loading) {
    return <div style={{ width: '100%', height: '1000px', justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
      <div className="spinner"></div>
    </div>
  };

  const handleupdateestoques = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/post/upload/estoques`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          produtosoncarrinho: produtosoncarrinho,
          depositoid: depositoid
        })
      });

      if (!response.ok) {
        throw new Error(`Erro ao tentar executar a api: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();

      if (!data) {
        throw new Error('Resposta da API do Bling não conseguiu alterar produto');
      }
      if (response.ok) {
        console.log('DADOS DO UPLOAD ESTOQUES:', data);
      }

    } catch (error) {
      console.error('Erro:', error.message);
      throw error;
    }
  };


  const handlePucheInfosNotaFiscal = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/post/notasfiscais', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.API_KEY}`
        },
        body: JSON.stringify({
          userid: dadosuserlogon.id,
          totalpedido: totalpedido,
          produtosoncarrinho: produtosoncarrinho,
          observacoes: observacoespedido,
          depositoid: depositoid,
          dadosuserlogon: dadosuserlogon
        })
      });

      const data = await response.json();
      console.log('Resposta do servidor:', data)

      if (!response.ok) {
        throw new Error('Erro ao processar pagamento');
      }

      if (response.ok) {
        console.log('NOTA FISCAL FRONTEND:', data)
      }


    } catch (err) {
      console.log(err.message);
    }
  };

  const handlePurchaseSuccess = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/post/sucessocompra', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.API_KEY}`
        },
        body: JSON.stringify({
          userid: dadosuserlogon.id,
          totalpedido: totalpedido,
          produtosoncarrinho: produtosoncarrinho,
          observacoes: observacoespedido,
          depositoid: depositoid
        })
      });

      if (!response.ok) {
        throw new Error('Erro ao processar pagamento');
      }

      const data = await response.json();
      console.log('info PIX :', data);
      if (response.ok) {
        console.log('PEDIDO EFETUADO COM SUCESSO');
        console.log('Resultado do pedido:', data)
        navigate('/')
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    const amount = totalpedido
    const identificationType = 'CPF'
    const email = dadosuserlogon.email
    const usercpf = dadosuserlogon.cpf

    try {
      const response = await fetch('http://localhost:3000/criarpix', {
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

      const data = await response.json();

      if (response.ok) {
        setPixData(data);
        // handlePurchaseSuccess();
        // console.log('info PIX :', data);
      }

      if (!response.ok) {
        throw new Error('Erro ao processar pagamento');
      }

    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };


  return (

    <>

      {pixData && (
        <TicketPix datapix={pixData} />
      )}

      <div className='container-pix'>
        <span>
          Ao finalizar o pedido, acesse o aplicativo do seu banco na opção Pix e escaneie ou copie o código de pagamento.
        </span>

        <p style={{}}>R$preço com desconto</p>

        <button onClick={() => {
          handleSubmit();
          handleupdateestoques();
          handlePurchaseSuccess();
          handlePucheInfosNotaFiscal();
        }} className='btn-payment'>Finalizar pedido</button>

        <div className="mercado-pago-info">
          <SiMercadopago style={{ width: '100px', height: 40 }} />
          <p style={{ textAlign: 'start' }}>Pagamento feito será concluido de uma forma totalmente segura com Mercado Pago.<br /><a href="https://conteudo.mercadopago.com.br/como-funciona-banco-digital-mercado-pago">Para mais informações clique aqui!</a></p>
        </div>

      </div>
    </>
  )
}