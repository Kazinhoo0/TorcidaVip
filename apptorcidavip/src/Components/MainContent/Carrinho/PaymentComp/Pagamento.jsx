import './pagamento.css';
import { Helmet } from "react-helmet";
import { useContext, useEffect } from 'react';
import TopFlapPagamentos from './TopFlapPagamentos';
import InfoAtendimentos from '../../Index/InfoAtendimentos';
import MainEtapas from './etapaspagamento/MainEtapas';
import ContextProducts from '../../../../context/ContextProduct';



export default function CardPagamento() {


    const {dadosuserlogon, userenderecos, produtosoncarrinho} = useContext(ContextProducts);

    // console.log('endereços:',userenderecos);
    // console.log('dadosuserlogon', dadosuserlogon);

    return (

        <>
            <Helmet>
                <title>Torcida Vip | Gerênciar Compras</title>
            </Helmet>

            <TopFlapPagamentos />

            <MainEtapas dadosuserlogon={dadosuserlogon} produtooncarrinho={produtosoncarrinho} enderecoentrega={userenderecos}/> 
            
        </>

    )




}