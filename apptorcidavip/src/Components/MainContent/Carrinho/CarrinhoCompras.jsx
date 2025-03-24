import InfoAtendimentos from "../Index/InfoAtendimentos";
import TopFlap from "../Index/TopFlap";
import CardItemCarrinho from "./CardItemCarrinho";
import './carrinho.css';
import FreteeResumo from "./FreteeResumo";
import { Helmet } from "react-helmet";
import { useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import ContextProducts from "../../../context/ContextProduct";
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';



export default function CarrinhoCompras () {

    const {freteSelecionado, produtosoncarrinho , loading, setLoading} = useContext(ContextProducts)

    const navigate = useNavigate()

    const handlenavigateproducts = () => {
        navigate('/searchproduct')
    }

    const handlenavigateCardPagamento = () => {
        if(freteSelecionado) {
            navigate('/paymentpage');
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

    const totalpedido = produtosoncarrinho.reduce((total, produto) => total + parseFloat(produto.preco), 0 )

    // useEffect(() => {
    //     console.log('produtos carrinho:', produtosoncarrinho);
    // }, [produtosoncarrinho]);

    useEffect(() => {
        setLoading(true)
        const timeout =  setTimeout(() => {
            setLoading(false)
        }, 200);
        return () => clearTimeout(timeout)
    }, []);

    // console.log('Estado atual do carrinho:', produtosoncarrinho);

    return (
        
        <div className="container-carrinhocompras">

            <Helmet>
                <title>Torcida Vip | Carrinho compras</title>
            </Helmet>   

            <TopFlap/>

            <div className="sun-carrinhocompras">

                <header className="container-headermeucarrinho">
                   
                    <h3>Meu carrinho</h3>

                </header>

                {loading ? (
                    <div style={{width:'100%', height: '1000px', justifyContent: 'center', display: 'flex', alignItems: 'center'}}>
                        <div className="spinner"></div>
                    </div>
                ) : (
                    <>

                        <div className="container-render-productscarrinho">
                        
                            {produtosoncarrinho.map((produto) => {
                                // console.log('produto sendo enviado para o carrinho: ',produto)
                                return <CardItemCarrinho  key={produto.itemid} infoprodutos={produto} />;
                            })}
                        
                        </div>

                        <FreteeResumo totalpedido={totalpedido}/>;

                        
                        <div style={{display: 'flex', justifyContent: 'space-between', width: '1260px', paddingLeft: 25, paddingRight: 25, paddingTop
                            : 20}}>
                            <button onClick={handlenavigateproducts} style={{background: 'grey'}} className="style-buttoncontinuar">Escolher mais produtos</button>
                            <button onClick={handlenavigateCardPagamento} className="style-buttoncontinuar">Continuar</button>
                        </div>
                        
                    </>
                )}
            
            </div>

            <InfoAtendimentos customcopyrightcontainer={1500} customTop={1100}/>

        </div>
    )
}