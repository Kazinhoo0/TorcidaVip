import React from 'react';
import camisa2 from '../../../imgs/Bull-Bot.png';
import gorro from '../../../imgs/Change-Flu.png';
import camisafluminense from '../../../imgs/image (1).png';
import casacovasco from '../../../imgs/15195639859_15186736348_imagem_2023-04-17_115903763.png';
// import './FiltragemTimes.css'; // Assumindo que você vai separar o CSS em um arquivo

export default function FiltragemTimes() {
    return (
        
        <section className="filtragem-times-section">

            <div className="container-maisvendido">
                <div className="maisvendido-style">
                    <h1 className="style-textmaisvendido">FILTRAGEM POR TIME</h1>
                </div>
            </div>

            <div className="container-productsfiltrartimes">
                <div className="products-filtrartimes">
                    <img src={camisa2} alt="Camisa Botafogo" />
                    <h2 className="textfiltrartime">
                        PARA VOCÊ, <br />BOTAFOGUENSE
                    </h2>
                </div>

                <div className="products-filtrartimes">
                    <img src={gorro} alt="Produto Flamengo" />
                    <h2 className="textfiltrartime">
                        PARA VOCÊ, <br />FLAMENGUISTA
                    </h2>
                </div>

                <div className="products-filtrartimes">
                    <img src={camisafluminense} alt="Camisa Fluminense" />
                    <h2 className="textfiltrartime">
                        PARA VOCÊ, <br />TRICOLOR
                    </h2>
                </div>

                <div className="products-filtrartimes">
                    <img src={casacovasco} alt="Produto Vasco" />
                    <h2 className="textfiltrartime">
                        PARA VOCÊ, <br />VASCAINO
                    </h2>
                </div>
            </div>
        </section>
    );
}