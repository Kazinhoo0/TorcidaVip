import { useContext } from "react";
import './register.css';
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ContextProducts from "../../../../context/ContextProduct";
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';


export default function Dadospessoais({ buttonclicked }) {

    const navigate = useNavigate('')

    const handlenavigatehome = () => {
        navigate('/Login')
    }

    const { Dadosnewuser, setDadosNewUser } = useContext(ContextProducts)

    // console.log('dadosnewuser:', Dadosnewuser);

    return (

        <>

            <div className='container-setavoltar'>
                <FaLongArrowAltLeft className='styleseta' />
                <a onClick={handlenavigatehome} style={{ fontSize: '17px', color: 'black', textDecoration: 'none' }} href="">Voltar</a>
            </div>

            <div className="container-title-register">
                <h2 className='titleloginregister'>Dados Pessoais</h2>
            </div>

            <form
                className="container-inputs-registernewuser"
                onSubmit={(e) => {
                    e.preventDefault();

                    if (!Dadosnewuser.sobrenome ||
                        !Dadosnewuser.cpf ||
                        !Dadosnewuser.telefone ||
                        !Dadosnewuser.senha || 
                        !Dadosnewuser.confirmarsenha
                        ) {
                        Toastify({
                            text: 'Preencha todos os campos para continuar',
                            position: 'center',
                            style: {
                                background: '#db2d0e',
                                color: '#ffffff'
                            }
                        }).showToast();

                        return
                    } 

                    if (Dadosnewuser.senha.trim() !== Dadosnewuser.confirmarsenha.trim()) {
                        Toastify({
                            text: 'As senhas não coincidem',
                            position: 'center',
                            style: {
                                background: '#db2d0e',
                                color: '#ffffff'
                            }
                        }).showToast(); 
                        return 
                    } else {
                        buttonclicked();
                    }

                    
                }}
                action="">

                <input
                    placeholder="Nome"
                    className="inputs-style"
                    type="text"
                    value={Dadosnewuser.nome}
                />

                <input
                    placeholder="Sobrenome"
                    className="inputs-style"
                    type="text"
                    onChange={(e) => setDadosNewUser({ ...Dadosnewuser, sobrenome: e.target.value })}
                />

                <input
                    placeholder="E-mail"
                    className="inputs-style"
                    type="email"
                    value={Dadosnewuser.email}
                />

                <input
                    placeholder="CPF"
                    className="inputs-style"
                    type="text"
                    maxLength={12}
                    onChange={(e) => setDadosNewUser({ ...Dadosnewuser, cpf: e.target.value })}
                />


                <input
                    placeholder="Telefone (DDD + numero / ex: 21982546521)"
                    className="inputs-style"
                    type="text"
                    maxLength={11}
                    onChange={(e) => setDadosNewUser({ ...Dadosnewuser, telefone: e.target.value })}
                />

                <input
                    placeholder="Senha"
                    className="inputs-style"
                    type="password"
                    maxLength={20}
                    onChange={(e) => setDadosNewUser({ ...Dadosnewuser, senha: e.target.value })}
                />

                <input
                    placeholder="Confirmar Senha"
                    className="inputs-style"
                    type="password"
                    maxLength={20}
                    onChange={(e) => setDadosNewUser({ ...Dadosnewuser, confirmarsenha: e.target.value })}
                />

                {/* foto de perfil */}

                {/* <div className="container-inputfile">

                    <label htmlFor="">Foto perfil</label>
                    <small style={{display: 'flex', paddingLeft: 65,alignItems: 'center'}}>
                        <img className="img-profilepic" src={imagem} alt="" />
                        <input onChange={(e) => {
                            const file = e.target.files[0]
                            if (file) {
                                const imgUrl = URL.createObjectURL(file);
                                setimagem(imgUrl)
                            }
                        }} className="input-file" type="file" name="imagem" />
                    </small>
                    
                </div> */}


                <div className="container-buttonregisternew">
                  
                    <label style={{ textAlign:'start' ,paddingLeft: 20 }} htmlFor="">*Seu Time do coração ?</label>
                    
                    <select className="style-timecoracao" name="" id="">
                        <option value="">...</option>
                        <option value="">Outro</option>
                        <option value="">Flamengo</option>
                        <option value="">Fluminense</option>
                        <option value="">Vasco</option>
                        <option value="">Botafogo</option>
                    </select>
            
                </div>

                <button type="submit" className="button-registernewuser">Continuar</button>

            </form>

        </>


    )
}