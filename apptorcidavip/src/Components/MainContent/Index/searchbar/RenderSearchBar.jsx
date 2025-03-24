import { useContext } from "react";
import ContextProducts from "../../../../context/ContextProduct";
import { useNavigate } from "react-router-dom";


export default function RenderSurchBar ({produtos}) {

    const navigate = useNavigate();

    const {setProductDetails, prodsearchbar, setSearchitem} = useContext(ContextProducts)

    const handleClicked = (produto) => {
        const fetchproductsDetails = async () => {
            try {
                const id = produto.produto_id;
                // console.log('id a ser enviado pro backend: ',id)
                const response = await fetch(`https://torcidavipoficial-teste.onrender.com/viewproduct/${id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id })
                });

                if (!response.ok) {
                    throw new Error('Erro ao buscar dados');
                }

                const data = await response.json();

                if (data.success) {
                    setProductDetails(data.data);
                    // console.log('produtos do db no provider', data);
                } else {
                    console.log(data.message);
                }

            } catch (err) {
                console.error(err.message);
            }
        };

        fetchproductsDetails();
        setSearchitem('')
        setTimeout(() => {
            navigate(`/viewproduct/${produtos.produto_id}`)
        }, 500);
    }    

    


    return (

        <>
            {produtos && produtos.length > 0 && (
                <ul className='result-searchbar'>
                    {produtos.map((produto, index) => (
                        <li key={index} onClick={() => handleClicked(produto)}>  
                            <div className='container-img-seachbar'>
                                <img src={produto.imagem} alt={produto.nome} /> 
                            </div>
                            <p className='style-nome-searchbar'>{produto.nome}</p>
                            <p className='style-preco-searchbar'>{produto.preco}</p>
                        </li>
                    ))}
                </ul>
            )}
        </>
    )
}