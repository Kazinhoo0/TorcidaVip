import './userprofile.css';
import InfoAtendimentos from "../Index/InfoAtendimentos";
import InfoSite from "../Index/InfoSite";
import TopFlap from "../Index/TopFlap";
import ComponentAreaTorcedor from "../Login/ComponentAreaTorcedor";
import icon1 from '../../../imgs/Icon (3).png';
import icon2 from '../../../imgs/Icon (4).png';
import icon3 from '../../../imgs/Icon (5).png';
import icon4 from '../../../imgs/Icon (6).png';
import icon5 from '../../../imgs/Icon (7).png';
import icon6 from '../../../imgs/Icon (8).png';
import icon7 from '../../../imgs/Icon (9).png';
import { CiLogout } from "react-icons/ci";
import { TiWarningOutline } from "react-icons/ti";
import Enderecos from './Endereços/Endereços'
import { useContext, useState } from 'react';
import TodosOspedidos from './TodosOsPedidos/TodosPedidos';
import OpPagamento from './OpPagamento.jsx/Pagamento';
import Minhasavaliacoes from './MinhasAvaliações.jsx/Avaliações';
import DeletarConta from './DeletarConta/DeletarContar';
import Processando from './Processando/Processamento';
import Devolução from './Devolução/Devolução';
import Enviados from './Enviado/Enviado';
import ContextProducts from '../../../context/ContextProduct';
import { useNavigate } from 'react-router-dom';



export default function UserProfile () {

    const {showingpageclicked, setShowingpageclicked, userpedido} = useContext(ContextProducts);

    const navigate = useNavigate()

    const onclickpage = (pageName) => {
        setShowingpageclicked(pageName)        
    }

    const finalizarsessão = () => {
        localStorage.removeItem('authToken')
        localStorage.removeItem('authTokenGoogle')
        navigate('/')
        window.location.reload();
    }   

    console.log('PEDIDOS DO CLIENTE:', userpedido)

    return (

        <div className='container-profile'>
        <TopFlap />
        <ComponentAreaTorcedor />

        <div className='container-sun-profile'>
            <div className='container-profile-left'>
                <div className="container-optionsprofile">
                    <h3 className='font-title-profilepage'>Informações de Usuário</h3>
                    <div>
                        <p onClick={() => onclickpage('enderecos')} className='sun-optionsprofile'>
                            <img src={icon1} alt="Endereços" />
                            <p className='font-text-profilepage'>Endereços de Entrega</p>
                        </p>
                        <p onClick={() => onclickpage('cartoes')} className='sun-optionsprofile'>
                            <img src={icon2} alt="Pagamentos" />
                            <p className='font-text-profilepage'>Opções de Pagamento</p>
                        </p>
                        <p onClick={() => onclickpage('avaliacoes')} className='sun-optionsprofile'>
                            <img src={icon3} alt="Avaliações" />
                            <p className='font-text-profilepage'>Minhas Avaliações</p>
                        </p>
                    </div>
                </div>

                <div className="container-optionsprofile">
                    <h3 className='font-title-profilepage'>Meus Pedidos</h3>
                    <div>
                        <p onClick={() => onclickpage('todospedidos')} className='sun-optionsprofile'>
                            <img src={icon5} alt="Todos pedidos" />
                            <p className='font-text-profilepage'>Todos os Pedidos</p>
                        </p>
                        <p onClick={() => onclickpage('processando')} className='sun-optionsprofile'>
                            <img src={icon7} alt="Processando" />
                            <p className='font-text-profilepage'>Processando</p>
                        </p>
                        <p onClick={() => onclickpage('enviado')} className='sun-optionsprofile'>
                            <img src={icon6} alt="Enviado" />
                            <p className='font-text-profilepage'>Enviado</p>
                        </p>
                        <p onClick={() => onclickpage('devolucao')} className='sun-optionsprofile'>
                            <img src={icon4} alt="Devolução" />
                            <p className='font-text-profilepage'>Devolução</p>
                        </p>
                    </div>
                </div>

                <div className="container-optionsprofile">
                    <h3 className='font-title-profilepage'>Outros</h3>
                    <div>
                        <p onClick={finalizarsessão} className='sun-optionsprofile'>
                            <CiLogout className='iconsprofile-style' />
                            <p className='font-text-profilepage'>Sair</p>
                        </p>
                        <p onClick={() => onclickpage('deletar')} className='sun-optionsprofile'>
                            <TiWarningOutline className='iconsprofile-style' color='red' />
                            <p style={{ color: 'red' }} className='font-text-profilepage'>Deletar Conta</p>
                        </p>
                    </div>
                </div>
            </div>

            <div className='container-profile-right'>
                {showingpageclicked === 'todospedidos' && <TodosOspedidos userpedidos={userpedido} />}
                {showingpageclicked === 'enderecos' && <Enderecos />}
                {showingpageclicked === 'cartoes' && <OpPagamento />}
                {showingpageclicked === 'avaliacoes' && <Minhasavaliacoes />}
                {showingpageclicked === 'deletar' && <DeletarConta />}
                {showingpageclicked === 'processando' && <Processando userpedidos={userpedido} />}
                {showingpageclicked === 'enviado' && <Enviados userpedidos={userpedido} />}
                {showingpageclicked === 'devolucao' && <Devolução userpedidos={userpedido} />}
            </div>
        </div>
        
            {/* <InfoSite customTop={1290} /> */}
            
            <InfoAtendimentos customcopyrightcontainer={0} customTop={0}/>

        </div>
        
        
     
    )
}