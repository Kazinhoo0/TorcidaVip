import './Endereços.css';
import { IoMdAddCircle } from "react-icons/io";
import Cardnewendereco from './cardnewenredeco';
// import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Novoendereco from './Novoendereco';



export default function Enderecos () {


    const [onclicknovoendereco, setnovoendereco] = useState(false);

    const handlenovoendereco = () => {
        setnovoendereco(!onclicknovoendereco)
    }
    
    return ( 
        <>
           
            <div className="container-enderecos">
                {onclicknovoendereco && (
                    <Novoendereco/>
                )}

        
                {!onclicknovoendereco && (
                    <>
                
                        <div className='title-enderecos'>
                            <h3 style={{fontSize: 23}}>Meus Endereços</h3>
                        </div>

                        <div onClick={handlenovoendereco}  className='container-addendereco'>
                        <h2>Adicionar endereço</h2>
                        <IoMdAddCircle className='img-addendereco-style'/>
                        </div>
                    
                        <Cardnewendereco/> 
                  
                    </>  
                )}
  
            </div>  
        </>
    
    )
}