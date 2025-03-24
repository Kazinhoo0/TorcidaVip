import { useContext } from "react";
import { CiTrash } from "react-icons/ci";
import ContextProducts from "../../../context/ContextProduct";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";


export default function CardItemCarrinho ({infoprodutos}) {

    const {setProdutosOnCarrinho, setLoading , dadosuserlogon, setProductDetails} = useContext(ContextProducts);

    const navigate = useNavigate();

    const {id} = useParams();

    const fetchRemoveItemCarrinho = async () => {
        
        const userid = dadosuserlogon.id

        try {
        const response = await fetch(`https://torcidavipoficial-teste.onrender.com/api/post/removeitemcarrinho`, {
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


     useEffect(() => {
            const fetchProductDetails = async () => {
                try {
                    setLoading(true);
                    const response = await fetch(`https://torcidavipoficial-teste.onrender.com/viewproduct/${id}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id })
                    });
    
                    if (!response.ok) throw new Error('Erro ao buscar detalhes');
                    
                    const data = await response.json();
                    if (data.success) {
                        setProductDetails(data.data);
                    }
                } catch (err) {
                    console.error(err.message);
                } finally {
                    setTimeout(() => {
                        setLoading(false);
                    } , 3000)
                }
            };
    
            fetchProductDetails();
    }, [id]);


    const handleClicked = (e) => {
        e.preventDefault();
        const fetchproductsDetails = async () => {
            try {
                const id = infoprodutos.itemid
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
                } else {
                    console.log(data.message);
                }

            } catch (err) {
                console.error(err.message);
            }
        };

        fetchproductsDetails();
        setTimeout(() => {
            navigate(`/viewproduct/${infoprodutos.itemid}`)
        }, 500);
    }    

  
    
    return (

        <div className="container-CardItemCarrinho">

            <div className="container-itemcarrinho">
                <img className="img-itemcarrinho" src={infoprodutos.thumbnail} alt="" />
            </div>

            <div className="name-and-size-carrinho">
                <a onClick={handleClicked} className="style-nameitemcarrinho">{infoprodutos.nomeitem}</a>
                <span>
                    <span>Tamanho: {infoprodutos.tamanho}</span>
                </span>
                <span>
                    <span>Marca: {infoprodutos.marca}</span>
                </span>
                <div>
                    <button onClick={fetchRemoveItemCarrinho} className="btn-carrinhodecompras" >Excluir</button>
                    <button className="btn-carrinhodecompras">Comprar Agora</button>
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