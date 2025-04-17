import carrinhovazio from '../../../imgs/abandoned-cart.png'
import { Helmet } from "react-helmet";
import TopFlap from '../Index/TopFlap';
import InfoAtendimentos from '../Index/InfoAtendimentos';
import ContextProducts from '../../../context/ContextProduct';
import { useContext, useEffect } from 'react';

export default function CardVazio () {

    const { setLoading,loading} = useContext(ContextProducts);


    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [setLoading])


    return (    

        <>
            {loading ? (
                <div style={{ width: '100%', height: '1000px', justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
                    <div className="spinner"></div>
                </div>
            ): (
                <div className="container-carrinhocompras">
                    <Helmet>
                        <title>Torcida Vip | Carrinho compras</title>
                    </Helmet> 
                
                    <TopFlap/>

                    <div className="sun-carrinhocompras">

                        <header className="container-headermeucarrinho">
                        
                            <h3>Meu carrinho</h3>
                        
                        </header>

                        <div className="Imagem-carrinhovazio">
                            <img style={{width: 150}} src={carrinhovazio} alt="" />
                            <span>seu carrinho esta vazio!</span>
                            <button className='btn-carrinhovazio'>Ir as compras</button>
                        </div>

                    </div>

                    <InfoAtendimentos customcopyrightcontainer={0} customTop={0}/>
                </div>
            )}
        </>
    )
}