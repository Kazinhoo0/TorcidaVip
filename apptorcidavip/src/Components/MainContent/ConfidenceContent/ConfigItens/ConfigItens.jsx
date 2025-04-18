import { useContext } from 'react';
import './configitens.css';
import ContextProducts from '../../../../context/ContextProduct';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';



export default function ConfigItens () { 

    const {setConfigItens, configitens} = useContext(ContextProducts);


    const handleconfigitens = async (e) => {
        e.preventDefault();
        
        try{
            const response = await fetch (`http://localhost:3000/api/configitens` , {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    marca: configitens.marca,
                    codigo: configitens.codigo,
                    tamanho: configitens.tamanho,
                    descricaoLonga: configitens.descricaoLonga,
                    descricaoDetalhada: JSON.stringify(configitens.descricaoDetalhada),
                    cor: configitens.cor
                })
            })
    
    
            const data = await response.json();

            // console.log('configitens no frontend:', data)
    
    
            if (data.success) {
                console.log('informacoes enviadas');
    
                Toastify({
                    text: 'Infos enviadas!',
                    position: 'center',
                    style: {
                        background: '#33ff00',
                        color: '#ffffff'
                    }
                }).showToast();
            } else {
                console.log('Erro ao enviar')
                Toastify({
                    text: 'Erro ao enviar infos!',
                    position: 'center',
                    style: {
                        background: '#db2d0e',
                        color: '#ffffff'
                    }
                }).showToast();
            }
        } catch (err)  {
            console.log('Erro:', err)
        }
        
    }

    return ( 
        <>
            <div className='container-configtitens'>
                <form onSubmit={handleconfigitens} className='container-form-configitens' action="">

                    <input
                        className='input_style_configitens'
                        placeholder='*Codigo item'
                        type="number"
                        onChange={(e) => setConfigItens({...configitens, codigo: e.target.value})}
                    />

                    <input 
                        className='input_style_configitens' 
                        placeholder='*Tamanho item'
                        type="text"
                        onChange={(e) => setConfigItens({...configitens, tamanho: e.target.value})}
                    />

                    <input 
                        className='input_style_configitens' 
                        placeholder='*Marca'
                        type="text"
                        onChange={(e) => setConfigItens({...configitens, marca: e.target.value})}
                    />

                    <input
                        className='input_style_configitens'
                        placeholder='*Descricao Longa'
                        type="text"
                        onChange={(e) => setConfigItens({...configitens, descricaoLonga: e.target.value})}
                    />

                    <textarea 
                        className='input_style_configitens'
                        name="Jsoninput" 
                        id=""
                        placeholder='*Descrição Detalhada'
                        value={configitens.descricaoDetalhada}
                        onChange={(e) => setConfigItens({...configitens, descricaoDetalhada: e.target.value})}
                    ></textarea>

                    <input
                        className='input_style_configitens'
                        placeholder='*Cor do produto'
                        type="text" 
                        onChange={(e) => setConfigItens({...configitens, cor: e.target.value})}
                    />
                    
                    <button style={{background: 'black', padding: '5px', color:' white'}} type="submit">Enviar</button>
                </form>
            </div>

        </>

    )
}