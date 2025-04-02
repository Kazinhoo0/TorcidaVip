import React from 'react';
import seguro from '../../../imgs/Lock 02.png';
import troca from '../../../imgs/Bag 05.png';
import entrega from '../../../imgs/Delivery.png';
import cartao from '../../../imgs/Card 02.png';

export default function InfoSite({customTop}) {
    return (
        <div 
            className='info-site-container'
            style={{
                marginTop: customTop,
            }}
        >
            <div className='info-site-content'>
                <div className='container-info'>
                    <div className='info-icon'>
                        <img src={troca} alt="Trocas e Devoluções" />
                    </div>
                    <div className='info-text'>
                        <h2 className='info-title-style'>TROCAS E DEVOLUÇÕES</h2>
                        <p className='info-subs-style'>15 dias após o recebimento</p>
                    </div>
                </div>

                <div className='container-info'>
                    <div className='info-icon'>
                        <img src={entrega} alt="Entrega" />
                    </div>
                    <div className='info-text'>
                        <h2 className='info-title-style'>RECEBA EM CASA</h2>
                        <p className='info-subs-style'>Enviamos para todo o Brasil</p>
                    </div>
                </div>

                <div className='container-info'>
                    <div className='info-icon'>
                        <img src={seguro} alt="Segurança" />
                    </div>
                    <div className='info-text'>
                        <h2 className='info-title-style'>100% SEGURO</h2>
                        <p className='info-subs-style'>Seus dados estão protegidos</p>
                    </div>
                </div>

                <div className='container-info'>
                    <div className='info-icon'>
                        <img src={cartao} alt="Cartão" />
                    </div>
                    <div className='info-text'>
                        <h2 className='info-title-style'>PARCELE EM ATÉ 12X</h2>
                        <p className='info-subs-style'>Com seu cartão de crédito</p>
                    </div>
                </div>
            </div>
        </div>
    );
}