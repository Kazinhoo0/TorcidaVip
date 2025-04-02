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




export default function ViewProduct() {


    const {id} = useParams();

    // console.log('id do produto guardado pelo params',id)

    const { produtosdb , error, productdetails , fetchProductDetails, loading, setLoading,  setProductDetails , dadosuserlogon } = useContext(ContextProducts);

    const [clickednewcomment, setClickednewcomment] = useState(false);

    const [infocartcomments, setinfocartcomments] = useState([]);

    const handlecreatenewcomment = () => {
        setClickednewcomment(!clickednewcomment)
    };

    const sectionRef = useRef(null);

    const scrollToSection = () => {
        sectionRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // const [viewimage, setViewImage] = useState(productdetails[0]?.imagem);

    const [mainImage, setMainImage] = useState(productdetails[0]?.imagem);


    // const descricaoDetalhada = JSON.parse(productdetails[0].descricaodetalhada);

    useEffect(() => {
        fetchProductDetails(id)
    }, [id]);
    

    const fetchaddfavoriteprod = async () => {

        const userid = dadosuserlogon.id;
        
        try {
            const response = await fetch (`https://torcidavipoficial-teste.onrender.com/api/post/addfavoriteprod`, {
                method: 'POST',
               headers: {
                        'Content-Type': 'application/json',
                    },
                body: JSON.stringify({
                    userid: userid,
                    itemid: productdetails[0].produto_id,
                    imgprod: productdetails[0].imagem,
                    title: productdetails[0].nome
                })
            })

            const data = await response.json();

            if (data.success) {
                console.log('item adicionado aos favoritos')
                Toastify({  
                    text: 'item adicionado aos favoritos',
                    position: 'center',
                    style: {
                        background: '#33ff00',
                        color: '#ffffff'
                    }
                }).showToast();
                console.log(data.message)
            } else {
                console.log(data.message)
            }

        } catch (err) {
            console.log(err.message)
            Toastify({
                text: 'Item já favoritado!',
                position: 'center',
                style: {
                    background: '#db2d0e',
                    color: '#ffffff'
                }
            })
        }
    }

    useEffect(() => {
        const fetchGetComments = async () => {
            try {             
                const response = await fetch(`https://torcidavipoficial-teste.onrender.com/api/get/infocomments`, {
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



                    <div style={{ paddingLeft: 20, height: '80px', display: 'flex', alignItems: 'end', justifyContent: 'start' }} >
                        <p>Início - Femínino - Camisas - Regata Fluminense Left Feminino</p>
                    </div>

                    <div style={{ height: '900px', display: 'flex', justifyContent: 'center' }}>

                        <div className='container-info-prod'>
                            <h2 className='h2-product-style'>{productdetails[0].nome}</h2>
                            <h3 className='text-price-product-style'>R${productdetails[0].preco}</h3>

                            <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'start', width: '500px' }}>
                                <img src={iconmercadopago} alt="" />
                                <small style={{ fontFamily: 'Montserrat Alternates', fontWeight: '500', marginLeft: 10 }} ><small style={{ fontWeight: '800' }}>Até 12x sem cartão</small> com a linha de Crédito</small>
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
                            
                            <a style={{color: 'black', cursor: 'pointer'}} onClick={scrollToSection} >Ver comentários {infocartcomments.length}</a>

                            <p className='text-descricaoproduct'>{productdetails[0].descricaolonga}</p>

                            <div className='container-choose-size-adicionarcarrinho'>

                                <div style={{ width: '730px', display: 'flex' }}>

                                    <div style={{ display: 'grid' }}>
                                        <label htmlhtmlFor="tamanho">Tamanho</label>
                                        <select className='stylecelect' name="tamanho" id="">
                                            <option value="">Escolha uma opção...</option>
                                            <option value="">P</option>
                                            <option value="">M</option>
                                            <option value="">G</option>
                                            <option value="">GG</option>
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

                                <div className='container-buttonadicionarcarrinho' >
                                    <button >Adicionar ao carrinho</button>
                                </div>

                                <div onClick={fetchaddfavoriteprod} className="container-buttonadicionarcarrinho">
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
                                    <li className='style-list-descriprod'><p>Composição: {descricaoDetalhada.Composicao || ''}</p></li>
                                    <li className='style-list-descriprod'><p>Cor predominante: {descricaoDetalhada["Cor predominante"]}</p></li>
                                    <li className='style-list-descriprod'><p>Clube: {descricaoDetalhada.Clube}</p></li>
                                    <li className='style-list-descriprod'><p>Indicada para: {descricaoDetalhada["Indicada para"]}</p></li>
                                    <li className='style-list-descriprod'><p>Escudo: {descricaoDetalhada.Escudo}</p></li>
                                    <li className='style-list-descriprod'><p>Gênero: {descricaoDetalhada.Gênero}</p></li>
                                    <li className='style-list-descriprod'><p>Manga: {descricaoDetalhada.Manga}</p></li>
                                    <li className='style-list-descriprod'><p>Gola: {descricaoDetalhada.Gola}</p></li>
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

                                <div style={{ width: '50%' }}>
                                    <h2>Opiniões do produto</h2>
                                </div>

                                <div style={{ width: '50%', display: 'flex', justifyContent: 'end', paddingRight: '30px' }}>

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

            <InfoSite customTop={3220} />

            <InfoAtendimentos customcopyrightcontainer={3800} customTop={3400} />


        </div>
    )
}       