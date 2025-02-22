import { useContext, useState } from 'react';
import './comments.css';
import { IoMdClose } from "react-icons/io";
import ContextProducts from '../../../../context/ContextProduct';


export default function CartNewComment ({closecart, idproduto}) {

    const {novocomentario , setNovocomentario, dadosuserlogon} = useContext(ContextProducts);

    const [imagens, setImagens] = useState([]);

    console.log('idproduto no componente de novo comentario',idproduto)

    const handlecreatenewcomment = async (e) => {
        e.preventDefault();

        console.log(novocomentario)

        if (imagens.length === 0) {
            console.error("Nenhuma imagem selecionada.");
            return;
        }

        try {
            const formData = new FormData();


            // Adiciona cada imagem individualmente ao formData
            imagens.forEach((imagem, index) => {
                console.log('url da imagem', imagem)
                formData.append("image", imagem);
            });
            formData.append("idproduto", idproduto);
            formData.append("title", novocomentario.title);
            formData.append("description", novocomentario.description);
            formData.append("avaliacao", novocomentario.avaliacao);
            formData.append("userid", dadosuserlogon.id )

            console.log('novo comentario infomacoes:', novocomentario)
            console.log('novo comentario user id:', dadosuserlogon.id)

            const response = await fetch("https://torcidavipoficial-teste.onrender.com/api/add/newcomment", {
                method: "POST",
                body: formData
            });

            const data = await response.json();
            console.log("Resposta recebida:", data);

            if (!data.erro) {
                console.log("Imagens enviadas com sucesso!");
            } else {
                console.error("Erro ao enviar as imagens.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    };

    return (

        <div className="background-commentpag">

            <div className="container-boxcomment">

                <div className="son-boxcomment">
                    <div className= 'title-and-closedpag' >
                        <h1>Escreva seu comentário</h1>
                        <IoMdClose style={{cursor: 'pointer' }} onClick={closecart} color="black" />
                    </div>

                    <div style={{display: 'flex', justifyContent: 'start', alignItems: 'center'}}>
                        <small style={{color: 'black'}}>*Todos os campos são obrigatórios, a menos que sejam marcados como opcionais.</small>
                    </div>

                    <form onSubmit={handlecreatenewcomment} className="form-comment" action="">

                        <div className="inputs-comment">
                            <span style={{display: 'flex', paddingTop: '20px', paddingBottom: '15px'}}>Titulo</span>
                            <input 
                             placeholder="Titulo do comentário"
                             type="text"
                             onChange={(e) => setNovocomentario({...novocomentario, title: e.target.value})}
                             value={novocomentario.title}
                             className='style-input-newcomment'
                            />

                            <span style={{display: 'flex', paddingTop: '20px', paddingBottom: '15px'}}>Descrição</span>
                            <input
                             placeholder="Descrição do comentário"
                             type="text"
                             onChange={(e) => setNovocomentario({...novocomentario, description: e.target.value})}
                             value={novocomentario.description}
                             className='style-input-newcomment'
                            />

                            <small style={{display: 'flex', paddingBottom: '15px'}}>*Utilize este campo para adicionar imagens do seu produto</small>
                            <div className="img-preview">
                                {/* Exibe as imagens selecionadas */}
                                {imagens.map((imagem, index) => (
                                    <img 
                                    key={index}
                                    className="img-profilepic"
                                    src={URL.createObjectURL(imagem)}
                                    alt={`Imagem ${index + 1}`} />
                                ))}
                            </div>
                            <input
                             type="file"
                             name="nao"
                             id=""
                             multiple
                             onChange={(e) => {
                                const files = Array.from(e.target.files); 
                                setImagens(files)
                            }} 
                            />

                        </div>
                    

                        <div className="container-itemrecommend">
                            <div style={{display: 'flex', alignItems: 'center', paddingTop: '10px'}}>
                                <span>Avaliação do produto:</span>
                            </div>
                        
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'start'}}>
                                <select 
                                    className="style-avaliacaoprod"
                                    name="avaliacao"
                                    id="avaliacao"
                                    onChange={(e) => {
                                        setNovocomentario({... novocomentario, avaliacao: e.target.value })
                                        console.log("Valor selecionado:", e.target.value);
                                    }}
                                    value={novocomentario.avaliacao}
                                  >
                                    <option value="">...</option>
                                    <option value="muito_ruim">Muito Ruim</option>
                                    <option value="ruim">Ruim</option>
                                    <option value="bom">Bom</option>
                                    <option value="muito_bom">Muito bom</option>
                                    <option value="excelente">Excelente</option>
                                </select>
                            </div>
                            
                        </div>

                        <div className="btn-send-comment">
                            <button type='submit' className="btn-enviar">Adicionar comentário</button>
                        </div>

                    </form>

                </div>

            </div>
            
        </div>
    )
}