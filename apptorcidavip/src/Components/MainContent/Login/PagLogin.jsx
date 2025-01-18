import InfoAtendimentos from "../Index/InfoAtendimentos";
import InfoSite from "../Index/InfoSite";
import TopFlap from "../Index/TopFlap";
import ComponentAreaTorcedor from "./ComponentAreaTorcedor";
import './login.css';
import { FcGoogle } from "react-icons/fc";





export default function PagLogin () {


    return (
      
        <div className="container-login-register">

            <TopFlap/>
            
            <ComponentAreaTorcedor/>

            <div className="container-sun-login">

                <div className="container-inputs">
                    <h2 className='titleloginregister'>JÁ SOU CLIENTE</h2>

                    <form action="">
                        <input placeholder="USUÁRIO" className="inputs-style" type="text" />

                        <input  placeholder="SENHA" className="inputs-style" type="password" />
                    </form>

                    <div style={{height: 80, display: 'flex', justifyContent: 'start' }}>
                        <button className="text-recoverypass">Esqueci minha senha</button>
                    </div>

                    <div className='container-buttonentrar'>
                        <button className="buttonentrar-style">ENTRAR</button>
                    </div>
                    
                    <div style={{height: 200, display: 'flex', alignItems:'center', justifyContent: 'center'}}>
                        <div className="container-logingoogle">
                            <FcGoogle className="googleicon"/>
                            <p className="textfazerlogincomgoogle"> Fazer login com o Google</p>
                        </div>
                    </div>
                    
                </div>
                
                <div className="container-inputs">
                    <h2 className='titleloginregister'>CADASTRO DE USUÁRIO</h2>

                    <form action="">
                        <input placeholder="USUÁRIO" className="inputs-style" type="text" />

                        <input placeholder="ENDEREÇO DE E-MAIL"  className="inputs-style" type="password" />

                    </form>

                    <div className="container-infonewpassword">
                        <p className="style-infonewpassword">Um link para definir uma nova senha será enviado para seu endereço de e-mail.</p>

                        <p className="style-infonewpassword">Seus dados pessoais serão usados para aprimorar a sua experiência em todo este site, para gerenciar o acesso a sua conta e para outros propósitos, como descritos em nossa política de privacidade.</p>
                    </div>

                    <div className='container-buttonentrar'>
                        <button className="buttonentrar-style">CADASTRE-SE</button>
                    </div>
                </div>
                    
                

                
                
            </div>

           
            <InfoSite customTop={1150} />

            <InfoAtendimentos customcopyrightcontainer={1700} customTop={1300}/>

            
            


        </div>
        
       
    )
}