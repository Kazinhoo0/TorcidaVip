import { useContext } from 'react';
import './favoriteproduct.css';
import { SlTrash } from "react-icons/sl";
import ContextProducts from '../../context/ContextProduct';





export default function CardFavoriteProd ({infoprods}) {

    const {dadosuserlogon , setaddonfavorite} = useContext(ContextProducts)

    const fetchRemoveItemFavorito = async () => {
        
        const userid = dadosuserlogon.id

        try {
        const response = await fetch(`https://torcidavipoficial-teste.onrender.com/api/post/removeitemfavorito`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                itemid: infoprods.itemid,
                userid: userid
            }),
        });

        const data = await response.json();
        console.log("Itens recebidos do backend:", data.items);
        if (data.success) {
            console.log('item removido com sucesso!')
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

    
        <div style={{paddingTop: 25,display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0px', margin: '0px'}}>
            
            <div>
                <img src={infoprods.imgprod} />
            </div>

            <span style={{paddingLeft: 5 , width: 200 ,overflow: 'hidden', whiteSpace: 'nowrap',textAlign: 'start', alignContent: 'start',justifyContent: 'start'}}>
                <p style={{padding: 0, margin: 0, fontSize: 14, fontWeight: 570}}>{infoprods.title}</p>
            </span>

            <span onClick={fetchRemoveItemFavorito} style={{width: 200 ,textAlign: 'start', alignContent: 'start',justifyContent: 'start', cursor: 'pointer'}}>
                <span style={{padding: '2px', background: '#aca7a73a'}}>
                    <SlTrash />
                </span>
            </span>
            
        </div> 

        
    )
}