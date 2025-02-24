import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ContextProducts from "../../../context/ContextProduct";
import { useContext } from "react";
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css'


export default function DadosEntrega () {

    const navigate = useNavigate('')

    const handlenavigatehome = () => {
        navigate('/Login')
    }

    const {Dadosnewuser, setDadosNewUser} = useContext(ContextProducts);

    console.log('dadosnewuser:', Dadosnewuser);


    const Handleregisternewuser = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`https://torcidavipoficial-teste.onrender.com/api/register`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nome:Dadosnewuser.nome,
                    sobrenome: Dadosnewuser.sobrenome,
                    email: Dadosnewuser.email,
                    senha: Dadosnewuser.senha,
                    cep: Dadosnewuser.cep,
                    confirmarsenha: Dadosnewuser.confirmarsenha,
                    tipoendereco: Dadosnewuser.tipoendereco,
                    destinatario: Dadosnewuser.destinatario,
                    endereco: Dadosnewuser.endereco,
                    numero: Dadosnewuser.numero,
                    bairro:Dadosnewuser.bairro,
                    cidade: Dadosnewuser.cidade,
                    pais: Dadosnewuser.pais
                })
            });

            if (response.ok) {

                const data = await response.json();

                if (data.success) {

                    console.log(data.message)
                    console.log('dados pessoais entregues ao backend')

                    Toastify(
                        {
                            text: 'Usuário criado com sucesso!',
                            position: 'center',
                            style: {
                                background: '#33ff00',
                                color: '#ffffff'
                            }
                        }
                      ).showToast();
                      console.log("Usuário registrado com sucesso!", data);
                      setTimeout(() => {
                          navigate('/Login');
                    }, 2000);
                    
                }
            }
            } catch (error) {

                console.log('Erro ao coletar dados pessoais!', error)
        }}



    

    

    return (

        <>
            <div className='container-setavoltar'>
                <FaLongArrowAltLeft className='styleseta'/>
                <a onClick={handlenavigatehome} style={{fontSize: '17px', color: 'black', textDecoration: 'none'}} href="">Voltar</a>
            </div>

            <div className="container-title-register">
                <h2 className='titleloginregister'>Dados de Entrega</h2>
            </div>

            <form onSubmit={Handleregisternewuser} className="container-inputs-registernewuser" action="">
                <input 
                    placeholder="Tipo de Endereço"
                    className="inputs-style"
                    type="text"
                    onChange={(e) => setDadosNewUser({... Dadosnewuser, tipoendereco: e.target.value})}
                   />
               
                <input 
                    placeholder="*Destinátário"
                    className="inputs-style"
                    type="text"
                    onChange={(e) => setDadosNewUser({... Dadosnewuser, destinatario: e.target.value})}
                   />
                
                <input 
                    placeholder="*CEP"
                    className="inputs-style"
                    type="number"
                    maxLength={8}
                    onChange={(e) => setDadosNewUser({... Dadosnewuser, cep: e.target.value})}
                   />
                
                <input 
                    placeholder='*Endereço' 
                    className="inputs-style"
                    type="text"
                    onChange={(e) => setDadosNewUser({... Dadosnewuser, endereco: e.target.value})}
                  />
                
                <input 
                    placeholder="*N°"
                    className="inputs-style"
                    type="number"
                    maxLength={10}
                    onChange={(e) => setDadosNewUser({... Dadosnewuser, numero: e.target.value})}
                   />
                
                <input 
                    placeholder="*Bairro"
                    className="inputs-style"
                    type="text"
                    name="imagem" 
                    onChange={(e) => setDadosNewUser({... Dadosnewuser, bairro: e.target.value})}
                   />
                
                <input 
                    placeholder="*Cidade"
                    className="inputs-style"
                    type="text" 
                    name="imagem"
                    onChange={(e) => setDadosNewUser({... Dadosnewuser, cidade: e.target.value})}
                    />
                
                <input 
                    placeholder="*Pais"
                    className="inputs-style"
                    type="text"
                    name="imagem"
                    onChange={(e) => setDadosNewUser({... Dadosnewuser, pais: e.target.value})}
                    />

                <label style={{paddingLeft: 45, paddingBottom: 10 }} htmlFor="estado">Estado:</label>
                <select className="style-timecoracao" name="estados" id="estado">
                    <option value=""></option>
                    <option value="AC">Acre (AC)</option>
                    <option value="AL">Alagoas (AL)</option>
                    <option value="AP">Amapá (AP)</option>
                    <option value="AM">Amazonas (AM)</option>
                    <option value="BA">Bahia (BA)</option>
                    <option value="CE">Ceará (CE)</option>
                    <option value="DF">Distrito Federal (DF)</option>
                    <option value="ES">Espírito Santo (ES)</option>
                    <option value="GO">Goiás (GO)</option>
                    <option value="MA">Maranhão (MA)</option>
                    <option value="MT">Mato Grosso (MT)</option>
                    <option value="MS">Mato Grosso do Sul (MS)</option>
                    <option value="MG">Minas Gerais (MG)</option>
                    <option value="PA">Pará (PA)</option>
                    <option value="PB">Paraíba (PB)</option>
                    <option value="PR">Paraná (PR)</option>
                    <option value="PE">Pernambuco (PE)</option>
                    <option value="PI">Piauí (PI)</option>
                    <option value="RJ">Rio de Janeiro (RJ)</option>
                    <option value="RN">Rio Grande do Norte (RN)</option>
                    <option value="RS">Rio Grande do Sul (RS)</option>
                    <option value="RO">Rondônia (RO)</option>
                    <option value="RR">Roraima (RR)</option>
                    <option value="SC">Santa Catarina (SC)</option>
                    <option value="SP">São Paulo (SP)</option>
                    <option value="SE">Sergipe (SE)</option>
                    <option value="TO">Tocantins (TO)</option>
                </select>

                <div className="container-buttonregisternew">
                    <button type="submit" className="button-registernewuser">Criar Conta</button>
                </div>
            </form>   

        </>
    )
}