import { useContext } from "react";
import { CiTrash } from "react-icons/ci";
import ContextProducts from "../../../context/ContextProduct";


export default function CardItemCarrinho ({infoprodutos}) {

    const {setProdutosOnCarrinho, dadosuserlogon} = useContext(ContextProducts);

    const fetchRemoveItemCarrinho = async () => {
        
        const userid = dadosuserlogon.id

        try {
        const response = await fetch('https://torcidavipoficial-teste.onrender.com/api/post/removeitemcarrinho', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                itemid: infoprodutos.itemid,
                userid: userid
            }),
        });

        const data = await response.json();
        console.log("Itens recebidos do backend:", data.items);
        if (data.success) {
            console.log('item removido com sucesso!')
            setProdutosOnCarrinho((prevProdutos) => 
                prevProdutos.filter((produto) => produto.itemid !== infoprodutos.itemid)
            );

        } else {
            console.error('Erro ao carregar os itens do carrinho');
        }
        } catch (error) {
        console.error('Erro:', error);
        }
    };

    
    return (

        <div className="container-CardItemCarrinho">

            <div className="container-itemcarrinho">
                <img className="img-itemcarrinho" src={infoprodutos.thumbnail} alt="" />
            </div>

            <div className="name-and-size-carrinho">
                <a className="style-nameitemcarrinho" href="">{infoprodutos.nomeitem}</a>
                <span>
                    <span>Tamanho: G</span>
                </span>
                <span>
                    <span>Marca: Everlast</span>
                </span>
                <div>
                    <button onClick={fetchRemoveItemCarrinho} className="btn-carrinhodecompras" >Excluir</button>
                    <button className="btn-carrinhodecompras">Compras Agora</button>
                </div>
            </div>

            <div className="container-cont-itens">
                
                <button className="contsomeorsub">-</button>
                <input className="inputsomeorsub" type="text" />
                <button className="contsomeorsub">+</button>
                
            </div>

            <div className="container-pricecarrinho">
                <span style={{ fontWeight: 'bold', fontSize: '17px', color: 'green'}}>R${infoprodutos.preco}</span>
                <span>desconto</span>
            </div>

        </div>
    )
}