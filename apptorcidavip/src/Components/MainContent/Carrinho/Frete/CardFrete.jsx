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
                    Data prevista: 05/03/2025 até 06/03/2025
                </small>
                
            </div>

            <div className='sun-pricefrete'>
                <p>R$200</p>
            </div>

        </div>
    )
}