import '../pagamento.css'
import { loadMercadoPago } from "@mercadopago/sdk-js";
import { useContext, useEffect } from 'react';
import ContextProducts from '../../../../../context/ContextProduct';



await loadMercadoPago();
const mp = new window.MercadoPago('TEST-db23d506-4b88-411d-98db-5fc84bcba6dd');



export default function CardCartao({totalpedido}) {
    const { infocartão, setInfoCartão } = useContext(ContextProducts);
    const totalPrice = totalpedido;

    useEffect(() => {
        if (mp) {
            const cardForm = mp.cardForm({
                amount: String(totalPrice),
                form: {
                    id: "form-checkout",
                    cardNumber: { id: "form-checkout__cardNumber" },
                    expirationDate: { id: "form-checkout__expirationDate" },
                    securityCode: { id: "form-checkout__securityCode" },
                    cardholderName: { id: "form-checkout__cardholderName" },
                    issuer: { id: "form-checkout__issuer" },
                    installments: { id: "form-checkout__installments" },
                    identificationType: { id: "form-checkout__identificationType" },
                    identificationNumber: { id: "form-checkout__identificationNumber" },
                    cardholderEmail: { id: "form-checkout__cardholderEmail" },
                },
                callbacks: {
                    onFormMounted: (error) => {
                        if (error) console.warn("Erro ao montar o formulário:", error);
                    },
                    onSubmit: async (event) => {
                        event.preventDefault();
                        const data = cardForm.getCardFormData();

                        try {
                            const response = await fetch('http://localhost:5000/process_payment', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    token: data.token,
                                    issuer_id: data.issuerId,
                                    payment_method_id: data.paymentMethodId,
                                    transaction_amount: Number(totalPrice),
                                    installments: Number(data.installments),
                                    payer: {
                                        email: data.cardholderEmail,
                                        identification: {
                                            number: data.identificationNumber,
                                        },
                                    },
                                    description: "Descrição do produto/serviço"
                                }),
                            });
                            const paymentResponse = await response.json();
                            // console.log("Resposta do pagamento:", paymentResponse);
                        } catch (error) {
                            console.error("Erro ao processar pagamento:", error);
                        }

                        // console.log("Dados do formulário:", data);
                    },
                    onFetching: (resource) => {
                        console.log("Carregando recurso:", resource);
                        return () => { };
                    },
                },
            });
        }
    }, [mp]);

    return (
        <>
            <div className="style-formulariopagamento">
                <form id="form-checkout" className="form-checkout">
                    <div className="input-container">
                        <input
                            className="input-payment"
                            placeholder="Número do Cartão"
                            type="text"
                            id="form-checkout__cardNumber"
                            onChange={(e) => setInfoCartão({ ...infocartão, numbercart: e.target.value })}
                            maxLength={30}
                        />

                        <input
                            className="input-payment"
                            placeholder="Data de vencimento"
                            type="text"
                            id="form-checkout__expirationDate"
                            onChange={(e) => setInfoCartão({ ...infocartão, validcart: e.target.value })}
                            maxLength={5}
                        />

                        <input
                            className="input-payment"
                            placeholder="Código de seguranca"
                            type="text"
                            id="form-checkout__securityCode"
                            onChange={(e) => setInfoCartão({ ...infocartão, codigocvv: e.target.value })}
                            maxLength={3}
                        />

                        <input
                            className="input-payment"
                            placeholder="CPF do titular do cartão"
                            id="form-checkout__identificationNumber"
                            type="text"
                            onChange={(e) => setInfoCartão({ ...infocartão, usercpf: e.target.value })}
                            maxLength={11}
                        />

                        <input
                            className="input-payment"
                            placeholder="E-mail"
                            type="email"
                            id="form-checkout__cardholderEmail"
                            onChange={(e) => setInfoCartão({ ...infocartão, email: e.target.value })}
                        />

                        <input
                            className="input-payment"
                            placeholder="Nome Completo"
                            type="text"
                            id="form-checkout__cardholderName"
                            onChange={(e) => setInfoCartão({ ...infocartão, nomecompleto: e.target.value })}
                            max={25}
                        />
                        
                        <div className="select-container">
                            <select className="form-select" id="form-checkout__installments"></select>
                            <select className="form-select" id="form-checkout__identificationType"></select>
                            <select className="form-select" id="form-checkout__issuer"></select>
                        </div>
                    </div>

                    <div className="actions-container">
                        <div className="privacy-container">
                            <input type="checkbox" id="privacy-checkbox" />
                            <small>Li e aceito a <small className="privacy-link">politica de Privacidade</small></small>
                        </div>

                        <div className="button-container">
                            <button className="btn-payment">Finalizar compra</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}