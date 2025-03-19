import '../pagamento.css'
import { SiVerizon } from "react-icons/si";



export default function EtapaInfos ({dadosuserlogon, userendereco}) {


    return (


        <>

            <div className='container-etapaspagamento'>

                <div className="container-infosetapas">

                    <div className='title'>

                        <span>
                           <span className='circlespan'>1</span> 
                           <span style={{paddingLeft: 10}}>Informações pessoais</span>
                        </span>
                        
                        <a>Editar</a>

                    </div>

                    <div className='infopessoais'>

                        <div className='Olá-email'>

                            <span>Olá, {dadosuserlogon.nome}</span>

                            <div className='email'>
                                <span>{dadosuserlogon.email}</span>
                                <a href="">Sair ou trocar</a>
                            </div>

                        </div>

                        <div className='nome-telefone'>
                            <ul>
                                <li>{dadosuserlogon.nomecompleto}</li>
                                <li>21982852484</li>
                            </ul>
                        </div>

                    </div>

                </div>

                <div className="container-infosetapas">

                    <div className='title'>

                        <span>
                            <span className='circlespan'>2</span> 
                            <span style={{paddingLeft: 10}}>Endereço de entrega</span>
                        </span>

                        <a>Editar</a>

                    </div>

                    <div className='endereco'>

                        <div className='enderecotrueorfalse'>
                            <SiVerizon color='green'/>
                        </div>

                        <div className='infoendereco'>

                            <ul>
                                <lo>{userendereco[0]?.endereco}, {userendereco[0]?.numero}</lo>
                                <lo>{userendereco[0]?.bairro} - {userendereco[0]?.cidade}/{userendereco[0]?.estado}</lo>
                                <lo>{userendereco[0]?.pais}</lo>
                                <lo>{userendereco[0]?.cep}</lo>
                            </ul>

                        </div>

                        <div className='editar'>
                            <span>Editar</span>
                        </div>

                    </div>

                </div>

                <div className="container-infosetapas">

                    <div className='title'>

                        <span>
                            <span className='circlespan'>3</span> 
                            <span style={{paddingLeft: 10}}>Formas de envio</span>
                        </span>

                        <a>Editar</a>

                    </div>

                    <div className="envio">

                        <div className='enderecotrueorfalse'>
                            <SiVerizon color='green'/>
                        </div>

                        <div className='infoendereco'>

                            <ul>
                                <lo>251 - GFL - EXPRESSA</lo>
                                <lo>Data prevista: 20/03/2025 até 21/03/2025</lo>
                            </ul>

                        </div>

                        <div className='editar'>
                            <span>Editar</span>
                        </div>

                    </div>

                </div>
                
            </div>
        
        </>
    )
}