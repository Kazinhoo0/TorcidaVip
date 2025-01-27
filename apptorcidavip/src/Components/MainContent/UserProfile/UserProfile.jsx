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
// import Devolução from './Devolução/Devolução';
// import Enviado from './Endereços/Endereços';
// import MinhaAvaliacoes from './Endereços/Endereços';
// import OpPagamento from './Endereços/Endereços';
// import Processamento from './Endereços/Endereços';
// import Sair from './Endereços/Endereços';
// import TodosOsPedidos from './Endereços/Endereços';




export default function UserProfile () {


    return (

        <div className='container-profile'>

            <TopFlap/>
                        
            <ComponentAreaTorcedor/>

            <div className='container-sun-profile'>

                <div className='container-profile-left'>

                    <div className="container-optionsprofile">

                        <h3 className='font-title-profilepage'>Informações de Usuário</h3>
                        <div>
                            <p className='sun-optionsprofile'>
                                <img src={icon1} alt="" />
                                <p className='font-text-profilepage'>Endereços de Entrega</p>
                            </p>
                            <p className='sun-optionsprofile'>
                                <img src={icon2} alt="" />
                                <p className='font-text-profilepage'>Opções de Pagamento</p>
                            </p>
                            <p className='sun-optionsprofile'>
                                <img  src={icon3} alt="" />
                                <p className='font-text-profilepage'>Minhas Avaliações</p>
                            </p>
                        </div>

                    </div>

                    <div className="container-optionsprofile">

                        <h3 className='font-title-profilepage'>Meus Pedidos</h3>
                        <div>
                            <p className='sun-optionsprofile'>
                                <img src={icon5} alt="" />
                                <p className='font-text-profilepage'>Todos os Pedidos</p>
                            </p>
                            <p className='sun-optionsprofile'>
                                <img src={icon7} alt="" />
                                <p className='font-text-profilepage'>Processando</p>
                            </p>
                            <p className='sun-optionsprofile'>
                                <img  src={icon6} alt="" />
                                <p className='font-text-profilepage'>Enviado</p>
                            </p>
                            <p className='sun-optionsprofile'>
                                <img  src={icon4} alt="" />
                                <p className='font-text-profilepage'>Devolução</p>
                            </p>
                        </div>
                        
                    </div>

                    <div className="container-optionsprofile">

                        <h3 className='font-title-profilepage'>Outros</h3>
                        <div>
                            <p className='sun-optionsprofile'>
                                <CiLogout className='iconsprofile-style'/>
                                <p className='font-text-profilepage'>Sair</p>
                            </p>
                            <p className='sun-optionsprofile'>
                                <TiWarningOutline className='iconsprofile-style' color='red'/>
                                <p  style={{color:'red'}}  className='font-text-profilepage'>Deletar Conta</p>
                            </p>
                        </div>

                    </div>

                </div>

                <div className='container-profile-right'>

                    <Enderecos/>
          

                </div>

            </div>

            <InfoSite customTop={1290} />
            
            <InfoAtendimentos customcopyrightcontainer={1850} customTop={1450}/>

        </div>
        
        
     
    )
}