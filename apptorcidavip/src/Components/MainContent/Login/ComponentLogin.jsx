import './login.css';
import { FcGoogle } from "react-icons/fc";


export default function ComponentLogin () {

    return (

        <div className="container-inputs">
            <h2 className='titleloginregister'>JÁ SOU CLIENTE</h2>

            <form action="">
                <input placeholder="E-MAIL" className="inputs-style" type="text" />

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

    )
}