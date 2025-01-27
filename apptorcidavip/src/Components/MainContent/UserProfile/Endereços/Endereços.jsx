import './Endereços.css';
import { IoMdAddCircle } from "react-icons/io";
import Cardnewendereco from './cardnewenredeco';
import { useNavigate } from 'react-router-dom';



export default function Enderecos () {

    const navigate = useNavigate

    const handlenovoendereco = () => {
         navigate('/novoendereco')
    }
    
    return ( 

        <div className="container-enderecos">
            <div className='title-enderecos'>
                <h3>Meus Endereços</h3>
            </div>


            <div onClick={handlenovoendereco} className='container-addendereco'>
                
                <h2>Adicionar endereço</h2>
                <IoMdAddCircle className='img-addendereco-style'/>
            </div>

            <Cardnewendereco/>
            <Cardnewendereco/>
            <Cardnewendereco/>
            
             
            
            
        </div>  
    )
}