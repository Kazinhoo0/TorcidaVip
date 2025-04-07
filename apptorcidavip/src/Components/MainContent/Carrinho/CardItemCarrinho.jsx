import { useContext, useState } from "react";
import { CiTrash } from "react-icons/ci";
import ContextProducts from "../../../context/ContextProduct";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

export default function CardItemCarrinho ({infoprodutos}) {

    const {setProdutosOnCarrinho, setLoading , dadosuserlogon, setProductDetails, fetchProductDetails} = useContext(ContextProducts);

    const navigate = useNavigate();

    const {id} = useParams();

    const handleIncrementpedido = () => {
        setProdutosOnCarrinho(prevProdutos =>
          prevProdutos.map(produto => {
            if (produto.itemid === infoprodutos.itemid) {
              if (produto.quantidade < infoprodutos.estoque) {
                return { ...produto, quantidade: produto.quantidade + 1 };
              } else {
                Toastify({
                  text: 'Quantidade máxima atingida',
                  position: 'center',
                  style: {
                    background: '#db2d0e',
                    color: '#ffffff'
                  }
                }).showToast();
                return produto;
              }
            }
            return produto;
          })
        );
    };

    const handleDecrementpedido = () => {
    setProdutosOnCarrinho(prevProdutos =>
        prevProdutos.map(produto =>
        produto.itemid === infoprodutos.itemid
            ? { ...produto, quantidade: Math.max(produto.quantidade - 1, 0) }
            : produto
        )
    );
    };


    const fetchRemoveItemCarrinho = async () => {
        
        const userid = dadosuserlogon.id

        try {
        const response = await fetch(`http://localhost:3000/api/post/removeitemcarrinho`, {
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
        fetchProductDetails(id);
    }, [id]);


    const handleClicked = (e) => {
        e.preventDefault();
        const fetchproductsDetails = async () => {
            try {
                const id = infoprodutos.itemid
                // console.log('id a ser enviado pro backend: ',id)
                const response = await fetch(`http://localhost:3000/viewproduct/${id}`, {
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
                
                <button onClick={handleDecrementpedido} className="contsomeorsub">-</button>

                <input 
                    className="inputsomeorsub"
                    type="text"
                    value={infoprodutos.quantidade}
                    readOnly
                />

                <button onClick={handleIncrementpedido} className="contsomeorsub">+</button>
                
            </div>

            <div className="container-pricecarrinho">
                <span style={{ fontWeight: 'bold', fontSize: '17px', color: 'green'}}>R${infoprodutos.preco}</span>
                <span>desconto</span>
            </div>

        </div>
    )
}