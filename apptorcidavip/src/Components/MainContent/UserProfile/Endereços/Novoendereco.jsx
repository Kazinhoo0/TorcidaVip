import { useContext } from 'react';
import UserProfile from '../UserProfile';
import './Endereços.css';
import { Helmet } from 'react-helmet';
import ContextProducts from '../../../../context/ContextProduct';
import { useNavigate } from 'react-router-dom';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';


export default function Novoendereco () {

    const {newendereco, setNewEndereco, dadosuserlogon } = useContext(ContextProducts);

    const navigate = useNavigate()

    const Handleregisternewendereco = async (e) => {
            e.preventDefault();
    
            try {
                const response = await fetch(`https://torcidavipoficial-teste.onrender.com/api/newendereco`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        userid: dadosuserlogon.id,
                        nomeendereco: newendereco.nomeendereco,
                        cep: newendereco.cep,
                        endereco: newendereco.endereco,
                        numero: newendereco.numero,
                        complemento: newendereco.complemento,
                        bairro: newendereco.bairro,
                        cidade: newendereco.cidade,
                        estado: newendereco.estado,
                        destinatario: newendereco.destinatario
                    })
                });
    
                const data = await response.json();
                
                if (response.ok) {

                    if (data.success) {
    
                        console.log(data.message)
                        console.log("Novo endereco registrado!", data);
                        setTimeout(() => {
                            navigate('/Profile');
                        }, 1000);
                        
                    }
                }

                if (!response.ok) {
                    console.log(data.message);
                    
                    Toastify({
                        text: data.message || 'Endereço já cadastrado' ,
                        position: 'center',
                        style: {
                            background: '#db2d0e',
                            color: '#ffffff'
                        }
                    }).showToast();
                }

                } catch (error) {
                    
                    console.log('Erro ao inserir novo endereço', error)
                }
    }

    return ( 

        <div className="container-novoendereco">

            <Helmet>
                <title>Torcida Vip | Enderecos</title>
            </Helmet>

            <div>

                <div className='title-novoendereco'>
                    <h3>Novo endereço de entrega</h3>
                </div>

                <form onSubmit={Handleregisternewendereco} className='form-novoendereco' action="">

                    <input 
                        className='input-novoendereco-style'
                        placeholder='Nome do endereço'
                        type="text"
                        onChange={(e) => setNewEndereco({...newendereco, nomeendereco: e.target.value})}
                    />

                    <div>
                        <input 
                            style={{width: '200px'}}
                            className='input-novoendereco-style'
                            placeholder='CEP'
                            type="text"
                            maxLength={9}
                            max={9}
                            onChange={(e) => setNewEndereco({...newendereco, cep: e.target.value})}
                            />
                        <a style={{fontSize: 14}} href="https://buscacepinter.correios.com.br/app/endereco/index.php">Não sei meu CEP</a>
                    </div>

                    <input 
                        className='input-novoendereco-style'
                        placeholder='Endereço (Rua , Avenida)'
                        type="text"
                        onChange={(e) => setNewEndereco({...newendereco, endereco: e.target.value})}
                    />
                    <input 
                        className='input-novoendereco-style'
                        placeholder='Informe o número(use s/n se não tiver número)'
                        type="text"
                        onChange={(e) => setNewEndereco({...newendereco, numero: e.target.value})}
                    />
                    <input 
                        className='input-novoendereco-style'
                        placeholder='Complemento'
                        type="text"
                        onChange={(e) => setNewEndereco({...newendereco, complemento: e.target.value})}
                    />
                    <input 
                        className='input-novoendereco-style'
                        placeholder='Bairro'
                        type="text"
                        onChange={(e) => setNewEndereco({... newendereco, bairro: e.target.value})}
                    />

                    <div>
                        <input 
                            style={{width: 250}}
                            className='input-novoendereco-style'
                            placeholder='Cidade'
                            type="text" 
                            onChange={(e) => setNewEndereco({... newendereco, cidade: e.target.value})}
                        />
                        <input 
                            style={{width: 180}}
                            className='input-novoendereco-style'
                            placeholder='Estado'
                            type="text"
                            onChange={(e) => setNewEndereco({... newendereco, estado: e.target.value})}
                        />
                    </div>

                    <input 
                        className='input-novoendereco-style'
                        placeholder='Destinatário (ex: Gabriel)'
                        type="text"
                        onChange={(e) => setNewEndereco({... newendereco, destinatario: e.target.value})}
                       />

                    <button type='submit' className='btn-salvar-pagprofile'>Salvar alterações</button>

                </form>
                  
            </div>
        
        </div>

    )
    
}