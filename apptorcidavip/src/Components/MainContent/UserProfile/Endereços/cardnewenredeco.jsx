import './Endereços.css';



export default function cardnewendereco ({infosendereco}) {

    console.log('infosenderecos:', infosendereco);

    return (

        <div className="container-cardnewendereco">

            <div className='cardnewendereco'>

                <div className='nome-info'>

                    <div className='name-endereco'>
                        <h4>{infosendereco.nomeendereco}</h4>
                    </div>
                    <div className='container-infosenderecos' >
                        <small>{infosendereco.endereco} - {infosendereco.numero}</small>
                        <small>{infosendereco.tipo}</small>
                        <small>{infosendereco.bairro}</small>
                        <small>{infosendereco.cidade} - {infosendereco.estado}</small>
                        <small>{infosendereco.cep}</small>
                    </div>
    
                </div>

               
                <div className='cont-btn-edit' >
                    <button >Editar</button>
                </div>
            
            </div>
            
        </div>
    )
}