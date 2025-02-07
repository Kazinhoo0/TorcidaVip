import UserProfile from '../UserProfile';
import './Endereços.css';


export default function Novoendereco () {



    return ( 

        <div className="container-novoendereco">

            <div>

                <div className='title-novoendereco'>
                    <h3>Novo endereço de entrega</h3>
                </div>

                <form className='form-novoendereco' action="">

                    <input className='input-novoendereco-style'  placeholder='Nome do enredeço' type="text" />
                    <div>
                        <input style={{width: '200px'}} className='input-novoendereco-style' placeholder='CEP' type="text" />
                        <a style={{fontSize: 14}} href="https://buscacepinter.correios.com.br/app/endereco/index.php">Não sei meu CEP</a>
                    </div>
                    <input className='input-novoendereco-style' placeholder='Endereço(rua,avenida)' type="text" />
                    <input className='input-novoendereco-style' placeholder='Informe o número(use s/n se não tiver número)' type="text" />
                    <input className='input-novoendereco-style' placeholder='Complemento' type="text" />
                    <input className='input-novoendereco-style' placeholder='Bairro' type="text" />

                    <div>
                        <input style={{width: 250}} className='input-novoendereco-style' placeholder='Cidade' type="text" />
                        <input style={{width: 180}} className='input-novoendereco-style' placeholder='Estado' type="text" />
                    </div>

                    <input className='input-novoendereco-style' placeholder='Destinatário' type="text" />

                    <button className='btn-salvar-pagprofile'>Salvar alterações</button>

                </form>
                  
            </div>
        
        </div>

    )
    
}