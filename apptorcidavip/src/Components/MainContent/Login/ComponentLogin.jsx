import { useContext, useEffect } from 'react';
import './login.css';
import { FcGoogle } from "react-icons/fc";
import ContextProducts from '../../../context/ContextProduct';
import { useNavigate } from 'react-router-dom';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import { GoogleLogin } from '@react-oauth/google';



export default function ComponentLogin () {

    const {dadosuserlogin, setDadosUserLogin} = useContext(ContextProducts);

    const navigate = useNavigate();

    const handleefetuarlogin = async (e) => {
        e.preventDefault();

        const response = await fetch(`https://torcidavipoficial-teste.onrender.com/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                email: dadosuserlogin.email, 
                senha: dadosuserlogin.senha
            })
        });

        const data = await response.json();

        if (data.success) {
        
            Toastify({
                text: 'Login efetuado com sucesso!',
                position: 'center',
                style: {
                    background: '#33ff00',
                    color: '#ffffff'
                }
            }).showToast();

            // console.log('infomacoes do usuario vindo do backend: ', data)
            localStorage.setItem('authToken', data.token);

            // Garantindo que o loader seja visível por pelo menos 2 segundos
            setTimeout(() => {
                navigate('/');
            }, 2000);
            
            setTimeout(() => {
                window.location.reload();
            }, 2010)
           


        }
        else {
            Toastify({
                text: 'Usuário não cadastrado, porfavor crie uma conta!',
                position: 'center',
                style: {
                    background: '#db2d0e',
                    color: '#ffffff'
                }
            }).showToast();
        }

        if (!dadosuserlogin.senha || !dadosuserlogin.email) {
            Toastify({
                text: 'Todos os campos precisam estar preenchidos!',
                position: 'center',
                style: {
                    background: '#db2d0e',
                    color: '#ffffff'
                }
            }).showToast();
        }
    };

    const handleAuthGoogle = async (credential) => {

        const response = await fetch(`https://torcidavipoficial-teste.onrender.com/auth/google`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                credential: credential
            })
        });

        const data = await response.json();

        // console.log('informacoes vindo do banco no authgoogle:', data)

        if (data.success) {
        
            Toastify({
                text: 'Login efetuado com sucesso!',
                position: 'center',
                style: {
                    background: '#33ff00',
                    color: '#ffffff'
                }
            }).showToast();

            // console.log('infomacoes do usuario vindo do backend: ', data)
            localStorage.setItem('authTokenGoogle', data.token);
            // Garantindo que o loader seja visível por pelo menos 2 segundos
            setTimeout(() => {
                navigate('/');
            }, 2000);
            
            setTimeout(() => {
                window.location.reload();
            }, 2010)
        
        }
        else {
            Toastify({
                text: 'Usuário não cadastrado, porfavor crie uma conta!',
                position: 'center',
                style: {
                    background: '#db2d0e',
                    color: '#ffffff'
                }
            }).showToast();
        }

    };

      


    return (

        <div className="container-inputs">

            <h2 className='titleloginregister'>JÁ SOU CLIENTE</h2>

            <form action="">

                <input
                    placeholder="E-MAIL"
                    className="inputs-style"
                    type="text" 
                    onChange={(e) => setDadosUserLogin({...dadosuserlogin, email: e.target.value})}
                />

                <input  
                    placeholder="SENHA"
                    className="inputs-style"
                    type="password"
                    onChange={(e) => setDadosUserLogin({...dadosuserlogin, senha: e.target.value})}
                />

                <div onClick={handleefetuarlogin} className='container-buttonentrar'>
                    <button className="buttonentrar-style">ENTRAR</button>
                </div>

            </form>

            <div style={{height: 200, display: 'flex', alignItems:'center', justifyContent: 'center'}}>
                <div className="container-logingoogle">
                    {/* <FcGoogle className="googleicon"/>
                    <p className="textfazerlogincomgoogle"> Fazer login com o Google</p>
                     */}

                     <GoogleLogin
                        onSuccess={(CredentialResponse => {

                            console.log('Login bem-sucedido!', CredentialResponse)

                            if(CredentialResponse.credential) {
                                handleAuthGoogle(CredentialResponse.credential);
                            }

                        })}
                    
                        onError={() => {
                            console.log("Falha no login")
                        }}  
                     />

                </div>
            </div> 
                           
        </div>  

    )
}