import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import ContextProducts from "../../../context/ContextProduct";
import { Helmet } from "react-helmet";
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';


export default function ComponentCadastro () {

    const {Dadosnewuser, setDadosNewUser} = useContext(ContextProducts);

    const navigate = useNavigate();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handlenavigateregister = () => {

        if (!Dadosnewuser.nome || !Dadosnewuser.email) {
            Toastify({
                text: 'Preencha os campos!',
                position: 'center',
                style: {
                    background: '#db2d0e',
                    color: '#ffffff'
                }
            }).showToast();
            return;
        } else if (!emailRegex.test(Dadosnewuser.email))  {
            Toastify({
                text: 'Digite um email válido!',
                position: 'center',
                style: {
                    background: '#db2d0e',
                    color: '#ffffff'
                }
            }).showToast();
            return;
        }
        
        navigate('/register');
    }

    

    return (
        <div className="container-inputs">

            <Helmet>
                <title>Torcida Vip | Registrar conta</title>
            </Helmet>
            <h2 className='titleloginregister'>CADASTRO DE USUÁRIO</h2>

            <form action="">
                <input 
                    placeholder="NOME"
                    className="inputs-style"
                    type="text"
                    onChange={(e) => setDadosNewUser({...Dadosnewuser, nome: e.target.value})}
                    
                  />

                <input 
                    placeholder="ENDEREÇO DE E-MAIL"
                    className="inputs-style"
                    type="email"
                    onChange={(e) => setDadosNewUser({...Dadosnewuser, email: e.target.value}) }
                  />

            </form>

            <div className="container-infonewpassword">
                <p className="style-infonewpassword">Um link para definir uma nova senha será enviado para seu endereço de e-mail.</p>

                <p className="style-infonewpassword">Seus dados pessoais serão usados para aprimorar a sua experiência em todo este site, para gerenciar o acesso a sua conta e para outros propósitos, como descritos em nossa política de privacidade.</p>
            </div>

            <div className='container-buttonentrar'>
                <button onClick={handlenavigateregister} className="buttonentrar-style">CADASTRE-SE</button>
            </div>

        </div>
    )
}