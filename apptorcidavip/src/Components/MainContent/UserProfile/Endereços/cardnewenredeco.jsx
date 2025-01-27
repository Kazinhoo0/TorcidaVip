import './Endereços.css';



export default function cardnewendereco () {

    return (

        <div className="container-cardnewendereco">
            <div className='cardnewendereco'>
                <div className='nome-info'>

                    <div className='name-endereco'>
                        <h4>Kauã</h4>
                    </div>

                    <div className='container-infosenderecos' >
                        <small>Endereço numero</small>
                        <small>casa - ap </small>
                        <small>bairro - estado</small>
                        <small>cep</small>
                    </div>
    
                </div>

               
                <div className='cont-btn-edit' >
                    <button >Editar</button>
                </div>
            
            </div>
        </div>
    )
}