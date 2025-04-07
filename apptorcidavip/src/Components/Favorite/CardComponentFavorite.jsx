import { useContext } from 'react';
import './favoriteproduct.css';
import { SlTrash } from "react-icons/sl";
import ContextProducts from '../../context/ContextProduct';





export default function CardFavoriteProd ({infoprods}) {

    const {dadosuserlogon , setaddonfavorite} = useContext(ContextProducts)

    const fetchRemoveItemFavorito = async () => {
        
        const userid = dadosuserlogon.id

        try {
        const response = await fetch(`http://localhost:3000/api/post/removeitemfavorito`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                itemid: infoprods.itemid,
                userid: userid
            }),
        });

        const data = await response.json();
        // console.log("Itens recebidos do backend:", data.items);
        if (data.success) {
            // console.log('item removido com sucesso!')
            setaddonfavorite((prevProdutos) => 
                prevProdutos.filter((produto) => produto.itemid !== infoprods.itemid)
            );

        } else {
            console.error('Erro ao carregar os itens do carrinho');
        }
        } catch (error) {
        console.error('Erro:', error);
        }
    };

    return ( 

    
        <div className="favorite-item-container">
            <div className="favorite-item-img-container">
                <img src={infoprods.imgprod} />
            </div>

            <span className="favorite-item-title-container">
                <p className="favorite-item-title">{infoprods.title}</p>
            </span>

            <span onClick={fetchRemoveItemFavorito} className="favorite-item-delete-container">
                <span className="favorite-item-delete-icon">
                    <SlTrash />
                </span>
            </span>
        </div>

        
    )
}