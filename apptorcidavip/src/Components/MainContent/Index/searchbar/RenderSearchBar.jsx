import { useContext } from "react";
import ContextProducts from "../../../../context/ContextProduct";
import { useNavigate, useParams } from "react-router-dom";


export default function RenderSurchBar ({produtos}) {

    const {id} = useParams();

    const navigate = useNavigate();

    const  {fetchProductDetails , setSearchitem} = useContext(ContextProducts)

    const handleClicked = (produto) => {
        const id = produto.produto_id
        fetchProductDetails(id);
        setSearchitem('')
        setTimeout(() => {
            navigate(`/viewproduct/${id}`)
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
                            {/* <p className='style-preco-searchbar'>{produto.preco}</p> */}
                        </li>
                    ))}
                </ul>
            )}
        </>
    )
}