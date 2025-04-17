import InfoAtendimentos from '../../Index/InfoAtendimentos';
import InfoSite from '../../Index/InfoSite';
import TopFlap from '../../Index/TopFlap';
import CartAvaliations from '../comments/CartAvaliations'
import './viewproduct.css';
import iconmercadopago from '../../../../imgs/Mercado Pago.png';
import Product from '../Designe/DesigneProduct';
import { useContext, useState, useEffect } from 'react';
import CartNewComment from '../comments/CartNewComments';
import ContextProducts from '../../../../context/ContextProduct';
import { Helmet } from 'react-helmet';
import { useRef } from 'react';
import { CiHeart } from "react-icons/ci";
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';





export default function ViewProduct() {


    const {id} = useParams();

    console.log('ID SENDO MANTIDO NO USEPARAMS:', id)

    const { 
        produtosdb, error,
        productdetails , 
        fetchProductDetails, 
        loading, 
        dadosuserlogon, 
        fetchaddfavoriteprod,
        handleAddOnCarrinho
    } = useContext(ContextProducts);

    const [clickednewcomment, setClickednewcomment] = useState(false);

    const [infocartcomments, setinfocartcomments] = useState([]);

    const [sizeandquantity , setSizeandQuantity] = useState({
        tamanho: '',
        estoque: '',
        codigo: ''
    })

    console.log('sizeandquantity:',sizeandquantity)

    const localtion = useLocation();
    const {infosprod} = localtion.state || []
    console.log('infosprod:', infosprod)

    const handlecreatenewcomment = () => {
        setClickednewcomment(!clickednewcomment)
    };

    // const descricaoDetalhada = JSON.parse(productdetails[0]?.descricaodetalhada);

    const sectionRef = useRef(null);

    const scrollToSection = () => {
        sectionRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const [mainImage, setMainImage] = useState(productdetails[0]?.imagem);


    useEffect(() => {
        fetchProductDetails(id)
    }, [id]);
    
    useEffect(() => {
        const fetchGetComments = async () => {
            try {             
                const response = await fetch(`http://localhost:5000/api/get/infocomments`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ idproduto: productdetails[0].produto_id })
                });
    
                if (!response.ok) {
                    throw new Error('Erro ao buscar os comentários');
                }
    
                const data = await response.json();
    
                if (data.success) {
                    setinfocartcomments(data.data);
                    console.log('comentários retornados', data);
                } else {
                    console.log(data.message);
                }
    
            } catch (err) {
                console.log(err.message);
            }
        };
    
        fetchGetComments();
    }, [])


    const handlepassAttributescarditens = () => {

        const quantidadeprod = 1

        handleAddOnCarrinho(
            dadosuserlogon.id,
            id,
            infosprod.nome,
            infosprod.preco,
            infosprod.imagem,
            sizeandquantity.tamanho,
            infosprod.tamanhos[0].marca,
            sizeandquantity.estoque,
            quantidadeprod,
            infosprod.produto_id,
            sizeandquantity.codigo
        )
    }

    if (loading) {
        return <div style={{width:'100%', height: '1000px', justifyContent: 'center', display: 'flex', alignItems: 'center'}}>
                    <div className="spinner"></div>
                </div>
    }

    // Verifique se productdetails existe antes de renderizar
    if (!productdetails || productdetails.length === 0) {
        return <div className="container-viewprod">Produto não encontrado.</div>;
    }

    if (error) {
     console.log(error)
    }
        
    const produtosUnicos = Array.from(
        new Map(produtosdb.map((produto) => [produto.produto_id, produto])).values()
    );

    console.log('productsdetails depois do f5', productdetails);

    return (
        <div className="container-viewprod">
            {clickednewcomment && <CartNewComment idproduto={productdetails[0].produto_id} closecart={handlecreatenewcomment} />}

            <TopFlap />

            <div className='sun-viewprod'>

            <Helmet>
                <title> {productdetails[0].nome} | Torcida Vip </title>
            </Helmet>


                <div className='aligndiv-viewprod'>



                    <div className="breadcrumb-path">
                        <p>Início - Femínino - Camisas - Regata Fluminense Left Feminino</p>
                    </div>

                    <div className="product-display-container">

                        <div className='container-info-prod'>
                            <h2 className='h2-product-style'>{productdetails[0].nome}</h2>
                            <h3 className='text-price-product-style'>R${productdetails[0].preco}</h3>

                            <p className="payment-option" >
                                <img src={iconmercadopago} alt="" />
                                <small  className="payment-text"><small className="payment-text-bold">Até 12x sem cartão</small> com a linha de Crédito</small>
                            </p>

                            <div className="rating">
                                <input type="radio" id="star5" name="rate" value="5" />
                                <label htmlFor="star5" title="5 estrelas"></label>
                                <input type="radio" id="star4" name="rate" value="4" />
                                <label htmlFor="star4" title="4 estrelas"></label>
                                <input type="radio" id="star3" name="rate" value="3" />
                                <label htmlFor="star3" title="3 estrelas"></label>
                                <input type="radio" id="star2" name="rate" value="2" />
                                <label htmlFor="star2" title="2 estrelas"></label>
                                <input checked="" type="radio" id="star1" name="rate" value="1" />
                                <label htmlFor="star1" title="1 estrelas"></label>
                            </div>
                            
                            <a className="comment-link" onClick={scrollToSection} >Ver comentários {infocartcomments.length}</a>

                            <p className='text-descricaoproduct'>{productdetails[0].descricaolonga}</p>

                            <div className='container-choose-size-adicionarcarrinho'>

                                <div style={{ width: '730px', display: 'flex' }}>

                                    <div className="size-selector-container">
                                        <label htmlFor="tamanho">Tamanho</label>
                                        <select 
                                            className='stylecelect'
                                            name="tamanho"
                                            id=""
                                            onChange={(e) =>
                                                {const [tamanho, estoque, codigo] = e.target.value.split('|');
                                                setSizeandQuantity({...sizeandquantity, tamanho, estoque, codigo})}
                                            }>
                                            <option value="">Escolha um tamanho...</option>
                                            {infosprod?.tamanhos?.map((produto, index) => {
                                                return (
                                                <option 
                                                key={index}
                                                 value={`${produto.estoque}|${produto.tamanho}|${produto.codigo}`
                                                }>
                                                    {produto.tamanho} - {produto.estoque} Disponíveis
                                                </option>

                                                )
                                            })}
                                        </select> 

                                    </div>

                                    {/* <div style={{ display: 'grid' }}>
                                        <label htmlhtmlFor="Cor">Cor</label>
                                        <select className='stylecelect' name="cor" id="">
                                            <option value="">Escolha uma opcão...</option>
                                            <option value="">Amarelo</option>
                                            <option value="">Vermelho</option>
                                            <option value="">Preto</option>
                                            <option value="">Branco</option>
                                        </select>
                                    </div> */}

                                </div>

                                <div onClick={handlepassAttributescarditens} className='container-buttonadicionarcarrinho' >
                                    <button >Adicionar ao carrinho</button>
                                </div>

                                <div 
                                onClick={() => {
                                    fetchaddfavoriteprod(productdetails[0].produto_id,productdetails[0].imagem, productdetails[0].nome);
                                    
                                }} 
                                className="container-buttonadicionarcarrinho">
                                    <button><CiHeart/> Adicionar aos Favoritos </button>
                                </div>
                               
                            </div>
                        </div>


                        <div className="container-info-prod">
                            <img className="style-productimggrande" src={mainImage} alt="Imagem do produto" />
                            <div className="container-carroselpic">
                                {productdetails.map((produto, index) => (
                                produto.imagem && (
                                    <div
                                    key={index}
                                    className="sun-carroselpic"
                                    onClick={() => setMainImage(produto.imagem)}
                                    style={{ cursor: 'pointer' }} 
                                    >
                                    <img
                                        className="style-productimgpequeno"
                                        src={produto.imagem}
                                        alt={`Imagem ${index}`}
                                    />
                                    </div>
                                )
                                ))}
                            </div>
                        </div>

                    </div>

                    <div className='cont-descricao-prod'>
                        <div className='sun-descricaoprod'>
                            <h2>Informações Técnicas</h2>

                            {/* {descricaoDetalhada && descricaoDetalhada.length > 0 && (
                                <ul>
                                    <li className='style-list-descriprod'>
                                        <p>Composição: {descricaoDetalhada.Composicao || ''}</p>
                                    </li>
                                    <li className='style-list-descriprod'>
                                        <p>Cor predominante: {descricaoDetalhada["Cor predominante"] || ''}</p>
                                    </li>
                                    <li className='style-list-descriprod'>
                                        <p>Clube: {descricaoDetalhada.Clube || ''}</p>
                                    </li>
                                    <li className='style-list-descriprod'>
                                        <p>Indicada para: {descricaoDetalhada["Indicada para"] || ''}</p>
                                    </li>
                                    <li className='style-list-descriprod'>
                                        <p>Escudo: {descricaoDetalhada.Escudo || ''}</p>
                                    </li>
                                    <li className='style-list-descriprod'>
                                        <p>Gênero: {descricaoDetalhada.Gênero || ''}</p>
                                        </li>
                                    <li className='style-list-descriprod'>
                                        <p>Manga: {descricaoDetalhada.Manga || ''}</p>
                                        </li>
                                    <li className='style-list-descriprod'>
                                        <p>Gola: {descricaoDetalhada.Gola || ''}</p>
                                    </li>
                                </ul>
                            )} */}

                            <h2 style={{width: '500px'}}>Dimensões aproximadas (A x L):</h2>
                            <ul>

                                {/* <li className='style-list-descriprod'>
                                    <p>Nome:{descricaoDetalhada.Composicao}</p>
                                </li>

                                <li className='style-list-descriprod'>
                                    <p>Nome:{descricaoDetalhada.Composicao}</p>
                                </li> */}

                            </ul>
                        </div>

                        <div className='container-comentarios'>

                            <div className='cont-top-title'>

                                <div className="title-section">
                                    <h2>Opiniões do produto</h2>
                                </div>

                                <div className="action-section">

                                    <div className='cont-fazeravaliacao'>
                                        <p onClick={handlecreatenewcomment} className='text-fazeravaliacao'>Fazer uma avaliacão</p>
                                    </div>

                                </div>

                            </div>

                            <div className='cont-top-showavaliacoes'>

                                <div className='sun-infosavaliacoes'>
                                    <h2>Avaliações</h2>
                                </div>

                                <div ref={sectionRef} className='sun-avalicaoes'>
                                    
                                    {infocartcomments.map((infoscomment) => (
                                        <CartAvaliations key={infoscomment.produto_id} infoscomment= {infoscomment} />
                                    ))}   

                                </div>

                            </div>
                        </div>

                        <div className='container-vocepodegostar'>

                            <header className='header-vocepodegostar'>
                                <div className='sun-header-vocepodegostar'>
                                    <h2>VOCÊ PODE GOSTAR</h2>
                                </div>
                            </header>

                            <div className='prod-vocepodegostar'>
                                    {produtosUnicos.slice(34, 38).map((produto) => (
                                            <Product key={produto.produto_id} produto={produto} />
                                    ))}
                            </div>

                        </div>
                    </div>


                </div>




            </div>

            <InfoSite customTop={0} />
            <InfoAtendimentos customcopyrightcontainer={0} customTop={50} />

        </div>
    )
}       