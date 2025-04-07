import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import ContextProducts from "../../../../context/ContextProduct";
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

export default function DadosEntrega() {
    const navigate = useNavigate();
    const { Dadosnewuser, setDadosNewUser } = useContext(ContextProducts);

    const handleNavigateHome = () => {
        navigate('/Login');
    };

    const handleRegisterNewUser = async (e) => {
        e.preventDefault();

        if (!Dadosnewuser.tipoendereco || !Dadosnewuser.destinatario || !Dadosnewuser.endereco || 
            !Dadosnewuser.numero || !Dadosnewuser.bairro || !Dadosnewuser.cidade || !Dadosnewuser.pais) {
            Toastify({
                text: 'Preencha todos os campos para continuar!',
                position: 'center',
                style: {
                    background: '#db2d0e',
                    color: '#ffffff'
                }
            }).showToast();
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/register`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nome: Dadosnewuser.nome,
                    sobrenome: Dadosnewuser.sobrenome,
                    email: Dadosnewuser.email,
                    senha: Dadosnewuser.senha,
                    cep: Dadosnewuser.cep,
                    confirmarsenha: Dadosnewuser.confirmarsenha,
                    tipoendereco: Dadosnewuser.tipoendereco,
                    destinatario: Dadosnewuser.destinatario,
                    endereco: Dadosnewuser.endereco,
                    numero: Dadosnewuser.numero,
                    bairro: Dadosnewuser.bairro,
                    cidade: Dadosnewuser.cidade,
                    pais: Dadosnewuser.pais,
                    cpf: Dadosnewuser.cpf,
                    telefone: Dadosnewuser.telefone
                })
            });

            if (response.ok) {
                const data = await response.json();

                if (data.success) {
                    console.log(data.message);
                    console.log('dados pessoais entregues ao backend');

                    Toastify({
                        text: 'Usuário criado com sucesso!',
                        position: 'center',
                        style: {
                            background: '#33ff00',
                            color: '#ffffff'
                        }
                    }).showToast();
                    
                    setTimeout(() => {
                        navigate('/Login');
                    }, 2000);
                }
            }

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage || "Erro ao registrar usuário.");
            }
        } catch (error) {
            console.log('Erro ao coletar dados pessoais!', error);
            Toastify({
                text: 'Erro ao criar usuário. Tente novamente.',
                position: 'center',
                style: {
                    background: '#db2d0e',
                    color: '#ffffff'
                }
            }).showToast();
        }
    };

    const handleInputChange = (field, value) => {
        setDadosNewUser({
            ...Dadosnewuser,
            [field]: value
        });
    };

    return (
        <div className="delivery-form-container">
            <div className="delivery-form-card">
                <div className="delivery-form-back-button">
                    <FaArrowLeft className="delivery-form-back-icon" />
                    <button onClick={handleNavigateHome} className="delivery-form-back-text">Voltar</button>
                </div>

                <div className="delivery-form-header">
                    <h2 className="delivery-form-title">Dados de Entrega</h2>
                </div>

                <form onSubmit={handleRegisterNewUser} className="delivery-form">
                    <div className="delivery-form-group">
                        <input
                            placeholder="Tipo de Endereço"
                            className="delivery-form-input"
                            type="text"
                            onChange={(e) => handleInputChange('tipoendereco', e.target.value)}
                        />
                    </div>

                    <div className="delivery-form-group">
                        <input
                            placeholder="*Destinatário"
                            className="delivery-form-input"
                            type="text"
                            onChange={(e) => handleInputChange('destinatario', e.target.value)}
                        />
                    </div>

                    <div className="delivery-form-row">
                        <div className="delivery-form-group delivery-form-group-half">
                            <input
                                placeholder="*CEP"
                                className="delivery-form-input"
                                type="text"
                                maxLength={8}
                                onChange={(e) => handleInputChange('cep', e.target.value)}
                            />
                        </div>
                        
                        <div className="delivery-form-group delivery-form-group-half">
                            <input
                                placeholder="*N°"
                                className="delivery-form-input"
                                type="number"
                                maxLength={10}
                                onChange={(e) => handleInputChange('numero', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="delivery-form-group">
                        <input
                            placeholder="*Endereço"
                            className="delivery-form-input"
                            type="text"
                            onChange={(e) => handleInputChange('endereco', e.target.value)}
                        />
                    </div>

                    <div className="delivery-form-row">
                        <div className="delivery-form-group delivery-form-group-half">
                            <input
                                placeholder="*Bairro"
                                className="delivery-form-input"
                                type="text"
                                onChange={(e) => handleInputChange('bairro', e.target.value)}
                            />
                        </div>
                        
                        <div className="delivery-form-group delivery-form-group-half">
                            <input
                                placeholder="*Cidade"
                                className="delivery-form-input"
                                type="text"
                                onChange={(e) => handleInputChange('cidade', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="delivery-form-row">
                        <div className="delivery-form-group delivery-form-group-half">
                            <input
                                placeholder="*País"
                                className="delivery-form-input"
                                type="text"
                                onChange={(e) => handleInputChange('pais', e.target.value)}
                            />
                        </div>
                        
                        <div className="delivery-form-group delivery-form-group-half">
                            {/* <label htmlFor="estado" className="delivery-form-label">Estado:</label> */}
                            <select 
                                className="delivery-form-select" 
                                name="estados" 
                                id="estado"
                                onChange={(e) => handleInputChange('estado', e.target.value)}
                            >
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
                        </div>
                    </div>

                    <div className="delivery-form-submit">
                        <button type="submit" className="delivery-form-button">Criar Conta</button>
                    </div>
                </form>
            </div>
        </div>
    );
}