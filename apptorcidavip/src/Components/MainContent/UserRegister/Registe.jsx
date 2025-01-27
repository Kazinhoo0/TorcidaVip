import { useState } from "react"
import TopFlap from "../Index/TopFlap";
import InfoAtendimentos from "../Index/InfoAtendimentos";
import InfoSite from "../Index/InfoSite";
import './register.css';
import TopFlapRegister from "./TopFlapRegister";



export default function Register () {


    const [imagem, setimagem] = useState('');

        const handleUploadImage = async (e) => {
        e.preventDefault();

        // Verifique se a imagem foi selecionada
        if (!imagem) {
            console.error("Nenhuma imagem selecionada.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("image", imagem);

            const response = await fetch("http://localhost:3001/upload-image", {
                method: "POST",
                body: formData, // Não precisa de 'Content-Type', pois FormData define automaticamente
            });

            const data = await response.json();
            console.log("Resposta recebida:", data);

            if (!data.erro) {
            console.log("Imagem enviada com sucesso!");
            } else {
                console.error("Erro ao enviar a imagem.");
            }
            } catch (error) {
            console.error("Erro na requisição:", error);
            }
     };


    return ( 

        <div className="container-registernewuser" >
          
            <TopFlapRegister/>

                <div className="sun-registernewuser">
                    
                    <div className="container-title-register">
                        <h2 className='titleloginregister'>Dados Pessoais</h2>
                    </div>

                    <form className="container-inputs-registernewuser" onSubmit={handleUploadImage} action="">

                        <label htmlFor="">Nome</label>
                        <input className="inputs-style" type="text" />
                        <label htmlFor="">Sobrenome</label>
                        <input className="inputs-style" type="text" />
                        <label htmlFor="">E-mail</label>
                        <input className="inputs-style" type="text" />
                        <label htmlFor="">Senha</label>
                        <input className="inputs-style" type="text" />
                        <label htmlFor="">Confirmar Senha</label>
                        <input className="inputs-style" type="text" />
                        <div className="container-inputfile">

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
                            
                        </div>
                        
                    </form>

                    <div className="container-title-register">
                        <h2 className='titleloginregister'>Dados Adicionais</h2>
                    </div>

                        <label style={{paddingLeft: 45, paddingBottom: 10}} htmlFor="">*Seu Time do coração ?</label>

                        <select className="style-timecoracao" name="" id="">

                            <option value="">...</option>
                            <option value="">Outro</option>
                            <option value="">Flamengo</option>
                            <option value="">Fluminense</option>
                            <option value="">Vasco</option>
                            <option value="">Botafogo</option>

                        </select>


                    <div className="container-title-register">
                        <h2 className='titleloginregister'>Dados de Entrega</h2>
                    </div>

                    <form className="container-inputs-registernewuser" action="">

                        <label htmlFor="">*Tipo de endereco</label>
                        <input className="inputs-style" type="text" />
                        <label htmlFor="">*Destinatário:</label>
                        <input className="inputs-style" type="text" />
                        <label htmlFor="">*CEP</label>
                        <input className="inputs-style" type="text" />
                        <label htmlFor="">Endereco</label>
                        <input className="inputs-style" type="text" />
                        <label htmlFor="">N°:</label>
                        <input className="inputs-style" type="text" />
                        <label htmlFor="">Bairro</label>
                        <input className="inputs-style" type="text" name="imagem" />
                        <label htmlFor="">Cidade</label>
                        <input className="inputs-style" type="text" name="imagem" />
                        <label htmlFor="">Pais</label>
                        <input className="inputs-style" type="text" name="imagem" />
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
                    </form>   

                    <small style={{paddingLeft: '75px'}}>Ao continuar você concorda com nossa <small style={{color: 'blue'}}>política de privacidade.</small></small>
                    <div className="container-buttonregisternew">
                        <button className="button-registernewuser">Criar Conta</button>
                    </div>

                </div>

            <InfoSite customTop={2130} />
            
            <InfoAtendimentos customcopyrightcontainer={2700} customTop={2300}/>
            
        </div>

    )
}