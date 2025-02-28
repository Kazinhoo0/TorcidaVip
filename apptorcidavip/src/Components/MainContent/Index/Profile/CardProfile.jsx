import '../Index.css';
// import meuspedidos from '../../../../imgs/imgsIcon (6).png'
// import meuscartoes from '../../../../imgs/Icon (4).png'
import pedidos from '../../../../imgs/Icon (4).png';
import cartoes from '../../../../imgs/Icon (6).png';
import { useContext } from 'react';
import ContextProducts from '../../../../context/ContextProduct';
// import sair from '../../../../imgs/log-out.png';


export default function CardProfile ({meuperfil, meuscartoes, meuspedidos}) {

    const {dadosuserlogon} = useContext(ContextProducts)

    const userlogon = dadosuserlogon.nome


    return ( 


        <>
        
            
            <ul className="container-cardprofile">

                <li>
                    <p className='text-nome-cardprofile'>Seja bem vindo, {userlogon}!</p>
                </li>

                <li onClick={meuperfil}>

                    <div>
                        <img src={pedidos} alt="" />
                    </div>
                   
                    <p>Meu perfil</p>

                </li>

                <li onClick={meuspedidos}>

                    <div>
                        <img src={pedidos} alt="" />
                    </div>
                   
                    <p>Meus pedidos</p>

                </li>

                <li onClick={meuscartoes}>

                    <div>
                        <img src={cartoes} alt="" />
                    </div>
                    
                    <p>Meus cartões</p>
                </li>

            </ul>
           
        
        </>
    )
}