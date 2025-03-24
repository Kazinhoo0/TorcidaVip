import '../carrinho.css'


export default function Cardfrete ({resultado, onSelectFrete}) {
    console.log('resultados no componente:', resultado)


    return (

        <div className="container-cardfrete">

            <div className='input-choose-checkbox'>
                <input 
                onChange={(e) => {
                if (e.target.checked) {
                    onSelectFrete(resultado.price);
                }}}  
                type="checkbox" />
            </div>

            <div className="sun-cardfrete">

                <div>

                    <img className='img-cardfrete' src={resultado.company.picture} alt="" />

                    <small className='name-cardfrete'>
                        {resultado.name} | {resultado.company.name}
                    </small>

                </div>
               
                <small>
                    Data entrega: {resultado && resultado.delivery_range ? (
                        `${resultado.delivery_range.min} a ${resultado.delivery_range.max} dias úteis`
                    ) : (
                        'Carregando...'
                    )}
                </small>
                
            </div>

            <div className='sun-pricefrete'>
                <p>R${resultado.price}</p>
            </div>

        </div>
    )
}