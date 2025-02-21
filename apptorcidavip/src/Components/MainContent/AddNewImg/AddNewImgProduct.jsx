import './addnewimg.css'
import { useState } from "react";


export default function AddNewImgProduct () {

    const [imagens, setImagens] = useState([]);

    const [idproduto, setidproduto] = useState('')

    const handleUploadImage = async (e) => {
        e.preventDefault();

        if (imagens.length === 0) {
            console.error("Nenhuma imagem selecionada.");
            return;
        }

        try {
            const formData = new FormData();

            // console.log('id do produto comentário:', idproduto);
            formData.append("idproduto", idproduto);

            // Adiciona cada imagem individualmente ao formData
            imagens.forEach((imagem, index) => {
                // console.log('url da imagem', imagem)
                formData.append("image", imagem);
            });

            const response = await fetch("http://localhost:3000/upload-image/product", {
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

        <div className="container-addnewimg">

            <form onSubmit={handleUploadImage} className='form-addnewimg' action="">

                <div>
                    <input
                    placeholder='ID'
                    type="text"
                    onChange={(e) => setidproduto(e.target.value)}
                       />
                </div>

               
                <small style={{ display: 'flex', paddingLeft: 65, alignItems: 'center' }}>
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
                    {/* Permite selecionar múltiplos arquivos */}
                    <input 
                        onChange={(e) => {
                            const files = Array.from(e.target.files); 
                            setImagens(files)
                        }} 
                        className="input-file" 
                        type="file" 
                        name="imagem" 
                        multiple 
                    />
                </small>


                <button type='submit'>Enviar</button>

            </form>
           
        </div>
    )
}