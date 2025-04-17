import { useContext, useEffect } from 'react';
import './login.css';
import { FcGoogle } from "react-icons/fc";
import ContextProducts from '../../../context/ContextProduct';
import { useNavigate } from 'react-router-dom';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import { GoogleLogin } from '@react-oauth/google';



export default function ComponentLogin () {
    
    const {dadosuserlogin, setDadosUserLogin, loading, setLoading, setDateRegisterWithGoogle} = useContext(ContextProducts);

    const navigate = useNavigate();

    if (loading) {
        return <div style={{ width: '100%', height: '1000px', justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
          <div className="spinner"></div>
        </div>
    };


    const handleefetuarlogin = async (e) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:5000/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                email: dadosuserlogin.email, 
                senha: dadosuserlogin.senha
            })
        });

        const data = await response.json();

        if (data.success) {
            setLoading(true);
        
            Toastify({
                text: 'Login efetuado com sucesso!',
                position: 'center',
                style: {
                    background: '#47b868',
                    color: '#ffffff'
                }
            }).showToast();

            console.log('infomacoes do usuario vindo do backend: ', data)
            localStorage.setItem('authToken', data.token);

            // Garantindo que o loader seja visível por pelo menos 2 segundos
            setTimeout(() => {
                setLoading(false)
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
        const response = await fetch(`http://localhost:5000/auth/google`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                credential: credential
            })
        });

        const data = await response.json();

        console.log('informacoes vindo do banco no authgoogle:', data)

        if (data.login) {
            setLoading(true);
            if (data.login) {
                
            }
            Toastify({
                text: 'Login efetuado com sucesso!',
                position: 'center',
                style: {
                    background: '#47b868',
                    color: '#ffffff'
                }
            }).showToast();

            localStorage.setItem('authTokenGoogle', data.token);
            // Garantindo que o loader seja visível por pelo menos 2 segundos
            setTimeout(() => {
                setLoading(false)
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

            setLoading(true);
        
            localStorage.setItem('RegisterAccountauthTokenGoogle', data.data);
            setDateRegisterWithGoogle(data.data)
            setTimeout(() => {
                setLoading(false)
                navigate('/register');
            }, 2000);
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

        <div style={{
            height: 'auto', 
            minHeight: '80px', 
            display: 'flex', 
            alignItems:'center', 
            justifyContent: 'center'
        }}>
            <div className="container-logingoogle">
                <GoogleLogin  
                    onSuccess={(CredentialResponse => {
                        console.log('Login bem-sucedido!', CredentialResponse)
                        if(CredentialResponse.credential) {
                            handleAuthGoogle(CredentialResponse.credential);
                        }
                    })}
                    onError={() => {
                        Toastify({
                            text: 'Erro ao fazer login com o google!',
                            position: 'center',
                            style: {
                                background: '#db2d0e',
                                color: '#ffffff'
                            }
                        }).showToast();
                        console.log("Falha no login")
                    }}  
                />
            </div>
        </div>            
    </div>

    )
}