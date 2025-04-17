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
import Carousel from "./Carrosel/Carousel";

export default function IndexComponent() {
  const { dadosuserlogon, loading, setLoading } = useContext(ContextProducts);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
     }, 1000);
     return () => clearTimeout(timeout);
  }, [setLoading]);

  if (loading) {
    return <div style={{ width: '100%', height: '1000px', justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
      <div className="spinner"></div>
    </div>
  };
  
  return (
    <div className="main-container">
      <Helmet>
        <title>Torcida VIP - Produtos Oficiais dos Clubes</title>
        <meta name="description" content="Encontre produtos oficiais do seu time do coração" />
      </Helmet>
      
      {loading ? (
        <div style={{ width: '100%', height: '1000px', justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
        <div className="spinner"></div>
      </div>
      ) : (
        <>
          <div className="container-homepage">
            <TopFlap />

            <div className="carousel-wrapper">
              <Carousel />
            </div>

            <div className="content-sections">
                <div className="padding-components-maisvendidos">
                    <MaisVendidos dadosuserlogado={dadosuserlogon} />
                </div> 
                <div className="padding-components-novidadesloja">
                    <NovidadesLoja dadosuserlogado={dadosuserlogon} />
                </div>
                <div className="padding-components-filtragemtimes">
                    <FiltragemTimes dadosuserlogado={dadosuserlogon} />
                </div>
            </div>
          </div>
          <div className="padding-components-infos" style={{position: 'relative', top: 2100}}>
            <InfoSite  customTop={0}  />
            <InfoAtendimentos customcopyrightcontainer={0}  customTop={50}  />
          </div>
        </>
      )}
    </div>
  );
}
