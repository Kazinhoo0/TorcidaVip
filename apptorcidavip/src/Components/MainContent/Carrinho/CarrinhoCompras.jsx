import InfoAtendimentos from "../Index/InfoAtendimentos";
import TopFlap from "../Index/TopFlap";
import CardItemCarrinho from "./CardItemCarrinho";
import './carrinho.css';
import FreteeResumo from "./FreteeResumo";
import { Helmet } from "react-helmet";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ContextProducts from "../../../context/ContextProduct";



export default function CarrinhoCompras () {


    const navigate = useNavigate()

    const handlenavigateproducts = () => {
        navigate('/searchproduct')
    }

    const {produtosoncarrinho , setProdutosOnCarrinho, dadosuserlogon} = useContext(ContextProducts)


     useEffect(() => {
        const fetchRenderItensCarrinho = async () => {
            const userid = dadosuserlogon.id
            try {
            const response = await fetch(`http://localhost:3000/api/post/renderitenscarrinho`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    userid: userid
                }),
            });
    
            const data = await response.json();
            console.log("Itens recebidos do backend:", data.items);
            // console.log(data)
            if (data.success) {
                // console.log(data.items)
                setProdutosOnCarrinho(data.items);
                
            } else {
                console.error('Erro ao carregar os itens do carrinho');
            }
            } catch (error) {
            console.error('Erro:', error);
            }
        };
    
        fetchRenderItensCarrinho();
    }, []);

    useEffect(() => {
        console.log('produtos carrinho:', produtosoncarrinho);
    }, [produtosoncarrinho]);

    const totalpedido = produtosoncarrinho.reduce((total, produto) => total + parseFloat(produto.preco), 0 )

    

    return (
        
        <div className="container-carrinhocompras">

            <Helmet>
                <title>Torcida Vip | Carrinho compras</title>
            </Helmet>   

            <TopFlap/>

            <div className="sun-carrinhocompras">

                <header className="container-headermeucarrinho">
                   
                    <h3>Meu carrinho</h3>

                    <button className="style-buttoncontinuar">Continuar</button>
                   
                </header>

                <div className="container-render-productscarrinho">
                    {produtosoncarrinho.map((produto) => {
                        console.log('produto sendo enviado para o carrinho: ',produto)
                        return <CardItemCarrinho key={produto.itemid} infoprodutos={produto} />;
                    })}
                </div>

                <FreteeResumo totalpedido={totalpedido}/>;
             
                <div style={{display: 'flex', justifyContent: 'space-between', width: '1260px', paddingLeft: 25, paddingRight: 25, paddingTop
                    : 20}}>
                    <button onClick={handlenavigateproducts} style={{background: 'grey'}} className="style-buttoncontinuar">Escolher mais produtos</button>
                    <button className="style-buttoncontinuar">Continuar</button>
                </div>

            </div>

            <InfoAtendimentos customcopyrightcontainer={1500} customTop={1100}/>

        </div>
    )
}