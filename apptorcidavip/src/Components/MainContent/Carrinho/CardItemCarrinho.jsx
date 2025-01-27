import { CiTrash } from "react-icons/ci";
import imgcarrinho from '../../../imgs/imgcarrinho200px.png'


export default function CardItemCarrinho () {


    return (

        <div className="container-CardItemCarrinho">

            <div className="container-itemcarrinho">
                <CiTrash  className="style-lixeiracarrinho" />
                <img className="img-itemcarrinho" src={imgcarrinho} alt="" />
            </div>

            <div className="name-and-size-carrinho">
                <a className="style-nameitemcarrinho" href="">Regata fluminense Everlast G </a>
                <span>
                    <span>Tamanho : G</span>
                </span>
                <span>
                    <span>Marca : Everlast</span>
                </span>
            </div>

            <div className="container-cont-itens">
                
                <button className="contsomeorsub">-</button>
                <input className="inputsomeorsub" type="text" />
                <button className="contsomeorsub">+</button>
                
            </div>

            <div className="container-pricecarrinho">
                <span style={{ fontWeight: 'bold', fontSize: '17px', color: 'green'}}>R$190,00</span>
                <span>desconto</span>
            </div>

        </div>
    )
}