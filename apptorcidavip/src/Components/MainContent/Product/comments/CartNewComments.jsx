import { useContext, useState } from 'react';
import './comments.css';
import { IoMdClose } from "react-icons/io";
import ContextProducts from '../../../../context/ContextProduct';

export default function CartNewComment({closecart, idproduto}) {
    const {novocomentario, setNovocomentario, dadosuserlogon} = useContext(ContextProducts);
    const [imagens, setImagens] = useState([]);

    console.log('idproduto no componente de novo comentario', idproduto);

    const handlecreatenewcomment = async (e) => {
        e.preventDefault();

        console.log(novocomentario);

        if (imagens.length === 0) {
            console.error("Nenhuma imagem selecionada.");
            return;
        }

        try {
            const formData = new FormData();

            // Adiciona cada imagem individualmente ao formData
            imagens.forEach((imagem, index) => {
                console.log('url da imagem', imagem);
                formData.append("image", imagem);
            });
            formData.append("idproduto", idproduto);
            formData.append("title", novocomentario.title);
            formData.append("description", novocomentario.description);
            formData.append("avaliacao", novocomentario.avaliacao);
            formData.append("userid", dadosuserlogon.id);

            console.log('novo comentario infomacoes:', novocomentario);

            const response = await fetch(`http://localhost:3000/api/add/newcomment`, {
                method: "POST",
                body: formData
            });

            const data = await response.json();
            console.log("Resposta recebida:", data);

            if (!data.erro) {
                console.log("Imagens enviadas com sucesso!");
                closecart(); // Fechar após sucesso
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
                    <div className="title-and-closedpag">
                        <h1>Escreva seu comentário</h1>
                        <button 
                            className="close-button" 
                            onClick={closecart} 
                            aria-label="Fechar"
                        >
                            <IoMdClose size={24} />
                        </button>
                    </div>

                    <div className="required-fields-notice">
                        <small>*Todos os campos são obrigatórios, a menos que sejam marcados como opcionais.</small>
                    </div>

                    <form onSubmit={handlecreatenewcomment} className="form-comment">
                        <div className="inputs-comment">
                            <label htmlFor="title" className="input-label">Titulo</label>
                            <input 
                                id="title"
                                placeholder="Titulo do comentário"
                                type="text"
                                onChange={(e) => setNovocomentario({...novocomentario, title: e.target.value})}
                                value={novocomentario.title || ''}
                                className="style-input-newcomment"
                                required
                            />

                            <label htmlFor="description" className="input-label">Descrição</label>
                            <textarea
                                id="description"
                                placeholder="Descrição do comentário"
                                onChange={(e) => setNovocomentario({...novocomentario, description: e.target.value})}
                                value={novocomentario.description || ''}
                                className="style-textarea-newcomment"
                                required
                            />

                            <label className="input-label">
                                <small>*Utilize este campo para adicionar imagens do seu produto</small>
                            </label>
                            
                            <div className="img-upload-container">
                                <div className="img-preview">
                                    {imagens.length > 0 ? (
                                        imagens.map((imagem, index) => (
                                            <div key={index} className="preview-item">
                                                <img 
                                                    className="img-profilepic"
                                                    src={URL.createObjectURL(imagem)}
                                                    alt={`Imagem ${index + 1}`} 
                                                />
                                            </div>
                                        ))
                                    ) : (
                                        <div className="no-images">
                                            <span>Nenhuma imagem selecionada</span>
                                        </div>
                                    )}
                                </div>
                                <label htmlFor="file-upload" className="custom-file-upload">
                                    Selecionar imagens
                                </label>
                                <input
                                    id="file-upload"
                                    type="file"
                                    multiple
                                    onChange={(e) => {
                                        const files = Array.from(e.target.files); 
                                        setImagens(files);
                                    }} 
                                    className="file-input"
                                />
                            </div>
                        </div>
                    
                        <div className="container-itemrecommend">
                            <label htmlFor="avaliacao" className="input-label">
                                Avaliação do produto:
                            </label>
                        
                            <select 
                                className="style-avaliacaoprod"
                                name="avaliacao"
                                id="avaliacao"
                                onChange={(e) => {
                                    setNovocomentario({...novocomentario, avaliacao: e.target.value});
                                    console.log("Valor selecionado:", e.target.value);
                                }}
                                value={novocomentario.avaliacao || ''}
                                required
                            >
                                <option value="">Selecione...</option>
                                <option value="muito_ruim">Muito Ruim</option>
                                <option value="ruim">Ruim</option>
                                <option value="bom">Bom</option>
                                <option value="muito_bom">Muito bom</option>
                                <option value="excelente">Excelente</option>
                            </select>
                        </div>

                        <div className="btn-send-comment">
                            <button type="submit" className="btn-enviar">
                                Adicionar comentário
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}