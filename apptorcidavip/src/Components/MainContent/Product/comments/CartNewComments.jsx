import { useContext, useState } from 'react';
import './comments.css';
import { IoMdClose } from "react-icons/io";
import ContextProducts from '../../../../context/ContextProduct';


export default function CartNewComment ({closecart}) {

    const {novocomentario , setNovocomentario} = useContext(ContextProducts);

    const [imagens, setImagens] = useState([]);

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

                    <form className="form-comment" action="">

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

                            <span style={{display: 'flex', paddingTop: '20px', paddingBottom: '15px'}}>Descrição</span>
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
                                <span>Você Recomendaria este produto ?</span>
                            </div>
                        
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'start'}}>
                                <input 
                                 type="radio"
                                 name="sim"
                                 id=""
                                />
                                <span>Sim</span>
                            </div>
                            
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'start'}}>
                                <input 
                                 type="radio"
                                 name="nao"
                                 id=""
                                />
                                <span>Não</span>
                            </div>
                        </div>

                        <div className="btn-send-comment">
                            <button className="btn-enviar">Adicionar comentário</button>
                        </div>

                    </form>

                </div>

            </div>
            
        </div>
    )
}