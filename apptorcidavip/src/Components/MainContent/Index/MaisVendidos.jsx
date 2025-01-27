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
                    <h1 className="style-textmaisvendido">MAIS VENDIDOS</h1>
                </div>
            </div>

            <div className="products-maisvendidos">

                <Product linkimg={camisa11} />

                
                <Product linkimg={gorro} />


                <Product linkimg={camisa7} />


                <Product linkimg={camisa9} />


                <Product linkimg={camisa8} />


                <Product linkimg={camisa10} />


                <Product linkimg={camisa6} />


                <Product linkimg={camisa5} />

            </div>

        </>







    )
}