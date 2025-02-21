import TopFlap from "./TopFlap";
import './Index.css'
import MaisVendidos from "./MaisVendidos";
import NovidadesLoja from "./NovidadesLoja";
import FiltragemTimes from "./FiltragemTimes";
import InfoSite from "./InfoSite";
import InfoAtendimentos from "./InfoAtendimentos";
import { Helmet } from 'react-helmet';
import { useContext } from "react";
import ContextProducts from "../../../context/ContextProduct";



export default function IndexComponent () {

    const {dadosuserlogon} = useContext(ContextProducts)

    // console.log('Dados do usuario cadastrado :', dadosuserlogon)

    // const userinfo = JSON.parse(localStorage.getItem('user'))
    // console.log('localstorage infos: ',userinfo);


    return ( 

        <div className="container">
            <Helmet>
                <title>Torcida Vip</title>
            </Helmet>

            <TopFlap dadosuserlogado={dadosuserlogon}/>

            <div className="container-homepag">

                <MaisVendidos dadosuserlogado={dadosuserlogon} />

                <NovidadesLoja dadosuserlogado={dadosuserlogon}/>

                <FiltragemTimes dadosuserlogado={dadosuserlogon}/>


            </div>

            <div>
                <InfoSite customTop={3960}/>
                <InfoAtendimentos customcopyrightcontainer={4500} customTop={4150}/>
            </div>
            
        </div>
    
    )
}

