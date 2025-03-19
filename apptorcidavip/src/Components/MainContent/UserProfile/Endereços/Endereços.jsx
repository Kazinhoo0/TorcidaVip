import './Endereços.css';
import { IoMdAddCircle } from "react-icons/io";
import Cardnewendereco from './cardnewenredeco';
// import { useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import Novoendereco from './Novoendereco';
import ContextProducts from '../../../../context/ContextProduct';



export default function Enderecos () {

    const {dadosuserlogon, userenderecos} = useContext(ContextProducts)


    const [onclicknovoendereco, setnovoendereco] = useState(false);

    const handlenovoendereco = () => {
        setnovoendereco(!onclicknovoendereco)
    }


    console.log('Endereços do usuario retornados' , userenderecos)
    
    return ( 
        <>
           
            <div className="container-enderecos">

                {onclicknovoendereco && (
                    <Novoendereco/>
                )}

        
                {!onclicknovoendereco && (
                    <>

                        <div className='container-addnewendereco'>
                            <div className='title-enderecos'>
                                <h3 style={{fontSize: 23}}>Meus Endereços</h3>
                            </div>

                            <div onClick={handlenovoendereco}  className='container-addendereco'>
                                <h2>Adicionar endereço</h2>
                                <IoMdAddCircle className='img-addendereco-style'/>
                            </div>
                        </div>

                        <div className='container-renderrenderecos'>
                            
                            {userenderecos.map((infoproduto) => (
                                <Cardnewendereco key={infoproduto.id} infosendereco={infoproduto}/> 
                            ))}

                            

                        </div>

                    </>  
                )}
  
            </div>  
        </>
    
    )
}