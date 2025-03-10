import '../carrinho.css'


export default function Cardfrete ({resultado}) {
    console.log('resultados no componente:', resultado)


    return (

        <div className="container-cardfrete">

            <div className='input-choose-checkbox'>
                <input type="checkbox" />
            </div>

            <div className="sun-cardfrete">

                <div>

                    <img className='img-cardfrete' src={resultado.company.picture} alt="" />

                    <small className='name-cardfrete'>
                        {resultado.name} | {resultado.company.name}
                    </small>

                </div>
               
                <small>
                    Data entrega:{resultado.custom_delivery_range.min} a {resultado.custom_delivery_range.max} dias úteis
                </small>
                
            </div>

            <div className='sun-pricefrete'>
                <p>R${resultado.price}</p>
            </div>

        </div>
    )
}