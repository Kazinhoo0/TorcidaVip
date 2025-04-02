// import TopFlap from "./TopFlap";
// import './Index.css'
// import MaisVendidos from "./MaisVendidos";
// import NovidadesLoja from "./NovidadesLoja";
// import FiltragemTimes from "./FiltragemTimes";
// import InfoSite from "./InfoSite";
// import InfoAtendimentos from "./InfoAtendimentos";
// import { Helmet } from 'react-helmet';
// import { useContext, useEffect, useState } from "react";
// import ContextProducts from "../../../context/ContextProduct";



// export default function IndexComponent () {

//     const {dadosuserlogon} = useContext(ContextProducts)

//     const [localLoading, setLocalLoading] = useState(true);

//     // console.log('Dados do usuario cadastrado :', dadosuserlogon)

//     // const userinfo = JSON.parse(localStorage.getItem('user'))
//     // console.log('localstorage infos: ',userinfo);

//     useEffect(() => {
//             setLocalLoading(true)
//             const timeout =  setTimeout(() => {
//                 setLocalLoading(false)
//             }, 1000);
//             return () => clearTimeout(timeout)
//         }, []);

//     return ( 

//         <div className="container">
//             <Helmet>
//                 <title>Torcida Vip</title>
//             </Helmet>

//             <TopFlap dadosuserlogado={dadosuserlogon}/>

//             {localLoading ? (
//                 <div style={{width:'100%', height: '1000px', justifyContent: 'center', display: 'flex', alignItems: 'center'}}>
//                     <div className="spinner"></div>
//                 </div>
//             ) : (
//                 <div className="container-homepag">

//                     <MaisVendidos dadosuserlogado={dadosuserlogon} />

//                     <NovidadesLoja dadosuserlogado={dadosuserlogon}/>

//                     <FiltragemTimes dadosuserlogado={dadosuserlogon}/>

//                 </div>
//             )}

           
//             <div>
//                 <InfoSite customTop={2000}/>
//                 <InfoAtendimentos customcopyrightcontainer={4500} customTop={4450}/>
//             </div>

            
            
//         </div>
    
//     )
// }


import React, { useContext, useEffect, useState } from "react";
import { Helmet } from 'react-helmet';
import TopFlap from "./TopFlap";
import MaisVendidos from "./MaisVendidos";
import NovidadesLoja from "./NovidadesLoja";
import FiltragemTimes from "./FiltragemTimes";
import InfoSite from "./InfoSite";
import InfoAtendimentos from "./InfoAtendimentos";
import ContextProducts from "../../../context/ContextProduct";
import './Index.css';

export default function IndexComponent() {
  const { dadosuserlogon } = useContext(ContextProducts);
  const [localLoading, setLocalLoading] = useState(true);
  
  useEffect(() => {
    setLocalLoading(true);
    const timeout = setTimeout(() => {
      setLocalLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);
  
  return (
    <div className="main-container">
      <Helmet>
        <title>Torcida VIP - Produtos Oficiais dos Clubes</title>
        <meta name="description" content="Encontre produtos oficiais do seu time do coração" />
      </Helmet>
      
      {localLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <>
          <div className="container-homepage">
            <TopFlap />
            <div className="content-sections">
                <div style={{position: 'relative', top: 100}}>
                    <MaisVendidos dadosuserlogado={dadosuserlogon} />
                </div> 
                <div style={{position: 'relative', top: 2900}}>
                    <NovidadesLoja dadosuserlogado={dadosuserlogon} />
                </div>
                <div style={{position: 'relative', top: 3200}}>
                    <FiltragemTimes dadosuserlogado={dadosuserlogon} />
                </div>
                
            </div>
          </div>
          <div style={{position: 'relative', top: 3500}}>
            <InfoSite  />
            <InfoAtendimentos customcopyrightcontainer={0}  />
          </div>
        </>
      )}
    </div>
  );
}
