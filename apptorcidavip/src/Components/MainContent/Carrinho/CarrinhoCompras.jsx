import InfoAtendimentos from "../Index/InfoAtendimentos";
import TopFlap from "../Index/TopFlap";
import CardItemCarrinho from "./CardItemCarrinho";
import './carrinho.css';
import FreteeResumo from "./FreteeResumo";
import { Helmet } from "react-helmet";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ContextProducts from "../../../context/ContextProduct";
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';



export default function CarrinhoCompras() {

    const { freteSelecionado, produtosoncarrinho, dadosuserlogon } = useContext(ContextProducts)

    const [localLoading, setLocalLoading] = useState(true);

    const navigate = useNavigate()

    const handlenavigateproducts = () => {
        navigate('/searchproduct')
    }

    const handleQuantProdBuy = () => {

        if (!dadosuserlogon) {
            Toastify({
                text: 'Faça login para continuar',
                position: 'center',
                style: { background: '#db2d0e', color: '#ffffff' }
            }).showToast();
            return;
        }

        if (!produtosoncarrinho.length) {
            Toastify({
                text: 'Seu carrinho está vazio!',
                position: 'center',
                style: { background: '#db2d0e', color: '#ffffff' }
            }).showToast();
            return;
        }

        if (freteSelecionado) {
            const fetchproductbuy = async () => {
                try {
                    const response = await fetch(`https://torcidavipoficial-teste.onrender.com/api/post/quantprodbuy`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            userid: dadosuserlogon.id,
                            produtos: produtosoncarrinho.map(produto => ({
                                itemid: produto.itemid,
                                quantidade: produto.quantidade
                            }))
                        })
                    });

                    if (!response.ok) {
                        throw new Error('Erro ao buscar dados');
                    }

                    const data = await response.json();

                    if (data.success) {
                        console.log('Produtos atualizados com sucesso.', data);
                        navigate('/paymentpage')

                    } else {
                        console.log(data.message);
                    }

                } catch (err) {
                    console.error(err.message);
                }
            };
            fetchproductbuy();
        } else {
            Toastify({
                text: 'Escolha um frete para continuar',
                position: 'center',
                style: {
                    background: '#db2d0e',
                    color: '#ffffff'
                }
            }).showToast();
        }
    }

    const totalpedido = produtosoncarrinho.reduce((total, produto) => total + parseFloat(produto.preco), 0)

    // useEffect(() => {
    //     console.log('produtos carrinho:', produtosoncarrinho);
    // }, [produtosoncarrinho]);

    useEffect(() => {
        setLocalLoading(true)
        const timeout = setTimeout(() => {
            setLocalLoading(false)
        }, 1000);
        return () => clearTimeout(timeout)
    }, []);

    // console.log('Estado atual do carrinho:', produtosoncarrinho);

    return (

        <div className="container-carrinhocompras">

            <Helmet>
                <title>Torcida Vip | Carrinho compras</title>
            </Helmet>

            <TopFlap />

            <div className="sun-carrinhocompras">

                <header className="container-headermeucarrinho">

                    <h3>Meu carrinho</h3>

                </header>

                {localLoading ? (
                    <div style={{ width: '100%', height: '1000px', justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
                        <div className="spinner"></div>
                    </div>
                ) : (
                    <>

                        <div className="container-render-productscarrinho">

                            {produtosoncarrinho.map((produto) => {
                                console.log('produto sendo enviado para o carrinho: ', produto)
                                return <CardItemCarrinho key={produto.itemid} infoprodutos={produto} />;
                            })}

                        </div>

                        <FreteeResumo totalpedido={totalpedido} />;


                        <div style={{
                            display: 'flex', justifyContent: 'space-between', width: '1260px', paddingLeft: 25, paddingRight: 25, paddingTop
                                : 20
                        }}>
                            <button onClick={handlenavigateproducts} style={{ background: 'grey' }} className="style-buttoncontinuar">Escolher mais produtos</button>
                            <button onClick={handleQuantProdBuy} className="style-buttoncontinuar">Continuar</button>
                        </div>

                    </>
                )}

            </div>

            <InfoAtendimentos customcopyrightcontainer={0} customTop={950} />

        </div>
    )
}