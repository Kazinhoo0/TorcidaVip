import './Pagamento.css'


export default function Cardcartoes () {

    return (

        <>
            <div className="container-cardcartoes">
                <div className='cont-marcacart'>
                    <div className='photo-marca'>
                        <img src="" alt="" />
                    </div>
                </div>

                <div className='cont-infocart'>
                    <p>Terminado em 8553</p>
                    <small>Mastercard</small>
                    <small>Vencimento: 9/2029</small>
                </div>

                <div className='cont-excluircart'>
                    <h4>Excluir</h4>
                </div>
            </div>
        </>
    )
}