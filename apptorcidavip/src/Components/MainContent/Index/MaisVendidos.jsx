import camisa11 from '../../../imgs/Cmisafluminenseleftfeminina.png';
import camisa10 from '../../../imgs/Alone.png';
import camisa9 from '../../../imgs/15195641015_15171215674_M_0087_002004314_01-2 (11).png';
import camisa8 from '../../../imgs/image (1).png';
import gorro from '../../../imgs/image.png';
import camisa7 from '../../../imgs/imagem_2023-01-14_012135193 (1).png';
import camisa6 from '../../../imgs/imagem_2023-11-21_191507162.png';
import camisa5 from '../../../imgs/Change-Flu.png';
import heart from '../../../imgs/heart.png';
import Product from '../Product/DesigneProduct';


export default function MaisVendidos() {


    return (

        <>
            <div className="container-maisvendido">
                <div className="maisvendido-style">
                </div>
                <h1 className="style-textmaisvendido">MAIS VENDIDOS</h1>
            </div>

            <div className="products-maisvendidos">

                <Product linkimg={camisa11} />


                <div className="products-opcoes">

                    <div>
                        <div>
                            <img src={gorro} alt="" />

                            <img className='favorite-icon' src={heart} alt="" />
                        </div>


                        <p className='itensname-style' style={{ display: 'flex', justifyContent: 'start', height: 10 }}>
                            Regata Fluminense Left Feminina
                        </p>
                        <h3 style={{ display: 'flex', justifyContent: 'start', fontWeight: 'bold' }}>R$ 59,90</h3>
                    </div>

                </div>


                <div className="products-opcoes">
                    <div>

                        <img src={camisa7} alt="" />

                        <img className='favorite-icon' src={heart} alt="" />

                        <p className='itensname-style' style={{ display: 'flex', justifyContent: 'start', height: 10 }}>
                            Regata Fluminense Left Feminina
                        </p>
                        <h3 style={{ display: 'flex', justifyContent: 'start', fontWeight: 'bold' }}>R$ 59,90</h3>

                    </div>



                </div>


                <div className="products-opcoes">
                    <div>
                        <img src={camisa9} alt="" />

                        <p className='itensname-style' style={{ display: 'flex', justifyContent: 'start', height: 10 }}>
                            Regata Fluminense Left Feminina
                        </p>
                        <h3 style={{ display: 'flex', justifyContent: 'start', fontWeight: 'bold' }}>R$ 59,90</h3>
                    </div>



                </div>


                <div className="products-opcoes">
                    <div>
                        <img src={camisa8} alt="" />


                        <p className='itensname-style' style={{ display: 'flex', justifyContent: 'start', height: 10 }}>
                            Regata Fluminense Left Feminina
                        </p>
                        <h3 style={{ display: 'flex', justifyContent: 'start', fontWeight: 'bold' }}>R$ 59,90</h3>
                    </div>

                </div>


                <div className="products-opcoes">

                    <div>
                        <img src={camisa10} alt="" />

                        <p className='itensname-style' style={{ display: 'flex', justifyContent: 'start', height: 10 }}>
                            Regata Fluminense Left Feminina
                        </p>
                        <h3 style={{ display: 'flex', justifyContent: 'start', fontWeight: 'bold' }}>R$ 59,90</h3>
                    </div>

                </div>


                <div className="products-opcoes">

                    <div>
                        <img src={camisa6} alt="" />

                        <p className='itensname-style' style={{ display: 'flex', justifyContent: 'start', height: 10 }}>
                            Regata Fluminense Left Feminina
                        </p>
                        <h3 style={{ display: 'flex', justifyContent: 'start', fontWeight: 'bold' }}>R$ 59,90</h3>
                    </div>

                </div>


                <div className="products-opcoes">
                    <div>
                        <img src={camisa5} alt="" />

                        <p className='itensname-style' style={{ display: 'flex', justifyContent: 'start', height: 10 }}>
                            Regata Fluminense Left Feminina
                        </p>
                        <h3 style={{ display: 'flex', justifyContent: 'start', fontWeight: 'bold' }}>R$ 59,90</h3>
                    </div>

                </div>

            </div>

        </>







    )
}