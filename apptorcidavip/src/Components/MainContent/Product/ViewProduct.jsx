import InfoAtendimentos from '../Index/InfoAtendimentos';
import InfoSite from '../Index/InfoSite';
import TopFlap from '../Index/TopFlap';
import CartAvaliations from './comments/CartAvaliations'
import './viewproduct.css';
import iconmercadopago from '../../../imgs/Mercado Pago.png';
import iconestrela from '../../../imgs/Icon (11).png';
import camisafluminensegigante from '../../../imgs/imagem_2023-12-12_144445511-300x300 1.png';
import camisafluminensecarrosel1 from '../../../imgs/image (4).png';
import camisafluminensecarrosel2 from '../../../imgs/image (5).png';
import camisafluminensecarrosel3 from '../../../imgs/imagem_2023-12-12_144445511-300x300 2 (1).png';
import camisa2 from '../../../imgs/Bull-Bot.png';
import gorro from '../../../imgs/Change-Flu.png';
import camisafluminense from '../../../imgs/image (1).png';
import casacovasco from '../../../imgs/15195639859_15186736348_imagem_2023-04-17_115903763.png';
import Product from './DesigneProduct';
import { useState } from 'react';
import CartNewComment from './comments/CartNewComments';

export default function ViewProduct () {

    const [clickednewcomment, setClickednewcomment] = useState(false)

    const handlecreatenewcomment = () => {
        setClickednewcomment(!clickednewcomment)
    }


    return (

        <div className="container-viewprod">
            {clickednewcomment && <CartNewComment closecart={handlecreatenewcomment}/>}

            <TopFlap />

            <div className='sun-viewprod'>

    
                <div className='aligndiv-viewprod'>

                

                    <div style={{ paddingLeft: 20, height: '80px', display: 'flex', alignItems: 'end', justifyContent: 'start' }} >
                        <p>Início - Femínino - Camisas - Regata Fluminense Left Feminino</p>
                    </div>

                    <div style={{height: '900px', display:'flex', justifyContent: 'center'}}>

                        <div className='container-info-prod'>
                            <h2 className='h2-product-style'>Regata fluminense <br/> Left feminina</h2>
                            <h3 className='text-price-product-style'>R$ 89,90</h3>

                            <p style={{display: 'flex', alignItems: 'center', justifyContent: 'start', width: '500px'}}>
                                <img src={iconmercadopago} alt="" />
                                <small style={{fontFamily:'Montserrat Alternates', fontWeight: '500', marginLeft: 10}} ><small style={{fontWeight: '800'}}>Até 12x sem cartão</small> com a linha de Crédito</small>
                            </p>
                            
                            <div className="rating">
                                <input type="radio" id="star5" name="rate" value="5" />
                                <label for="star5" title="5 estrelas"></label>
                                <input type="radio" id="star4" name="rate" value="4" />
                                <label for="star4" title="4 estrelas"></label>
                                <input type="radio" id="star3" name="rate" value="3" />
                                <label for="star3" title="3 estrelas"></label>
                                <input type="radio" id="star2" name="rate" value="2" />
                                <label for="star2" title="2 estrelas"></label>
                                <input checked="" type="radio" id="star1" name="rate" value="1" />
                                <label for="star1" title="1 estrelas"></label>
                            </div>

                            <p>Ver comentários 0</p>
                                                    
                            <p className='text-descricaoproduct'>Regata feminina em mix de Sport Dry com superfície texturizada e Dry Max que  absorve e elimina o suor, garantindo melhor transpiração. 
                            A peça possui decote V, lateral transpassada e estampa com zero toque.</p>

                            <div className= 'container-choose-size-adicionarcarrinho'>

                                <div style={{width: '730px', display: 'flex'}}>  

                                    <div style={{display: 'grid'}}>
                                        <label htmlFor="tamanho">Tamanho</label>
                                        <select className='stylecelect' name="tamanho" id="">
                                            <option value="">Escolha uma opcão...</option>
                                            <option value="">P</option>
                                            <option value="">M</option>
                                            <option value="">G</option>
                                            <option value="">GG</option>
                                        </select>
                                    </div>
                                    
                                    <div style={{display: 'grid'}}>
                                        <label htmlFor="Cor">Cor</label>
                                        <select className='stylecelect' name="cor" id="">
                                            <option value="">Escolha uma opcão...</option>
                                            <option value="">Amarelo</option>
                                            <option value="">Vermelho</option>
                                            <option value="">Preto</option>
                                            <option value="">Branco</option>
                                        </select>
                                    </div>

                                </div>

                                
                                <div className= 'container-buttonadicionarcarrinho' >
                                    <button >Adicionar ao carrinho</button>
                                </div>
                                

                            </div>
                        </div>

                        <div className='container-info-prod'>
                            <img className='style-productimggrande' src={camisafluminensegigante} alt="" />
                            <div className= 'container-carroselpic'>

                                <div className="sun-carroselpic">
                                    <img src={camisafluminensecarrosel3} alt="" />     
                                </div>

                                <div className="sun-carroselpic">
                                    <img src={camisafluminensecarrosel2} alt="" /> 
                                </div>

                                <div className="sun-carroselpic">
                                    <img src={camisafluminensecarrosel1} alt="" /> 
                                </div>

                            </div>
                        </div>

                    </div>

                    <div className='cont-descricao-prod'>
                        <div className= 'sun-descricaoprod'>
                            <h2>Descricão</h2>
                            <ul>
                                <li className='style-list-descriprod'><p>Nome:Regata Fluminense Left Feminina</p></li>
                                <li className='style-list-descriprod'><p>Nome:Regata Fluminense Left Feminina</p></li>
                                <li className='style-list-descriprod'><p>Nome:Regata Fluminense Left Feminina</p></li>
                                <li className='style-list-descriprod'><p>Nome:Regata Fluminense Left Feminina</p></li>
                                <li className='style-list-descriprod'><p>Nome:Regata Fluminense Left Feminina</p></li>
                                <li className='style-list-descriprod'><p>Nome:Regata Fluminense Left Feminina</p></li>
                                <li className='style-list-descriprod'><p>Nome:Regata Fluminense Left Feminina</p></li>
                            </ul>

                            <h2>Informacão Adicional</h2>
                            <ul>
                                
                                <li className='style-list-descriprod'>
                                    <p>Nome:Regata Fluminense Left Feminina</p>
                                </li>

                                <li className='style-list-descriprod'>
                                    <p>Nome:Regata Fluminense Left Feminina</p>
                                </li>
                                
                            </ul>
                        </div>

                        <div className='container-comentarios'>

                            <div className= 'cont-top-title'>

                                <div style={{width: '50%'}}>
                                    <h2>Opiniões do produto</h2>
                                </div>

                                <div style={{width: '50%', display: 'flex', justifyContent: 'end', paddingRight: '30px'}}>

                                    <div className='cont-fazeravaliacao'>
                                        <p onClick={handlecreatenewcomment} className='text-fazeravaliacao'>Fazer uma avaliacão</p>
                                    </div>

                                </div>

                            </div>

                            <div className='cont-top-showavaliacoes'>

                                <div className='sun-infosavaliacoes'>
                                    <h2>Avaliacões</h2>
                                </div>

                                <div className= 'sun-avalicaoes'>
                                    <CartAvaliations title={'Muito bom!'} description={'Tadawdawdwadawdawdawdawdwadawdaw'}/>
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
                                <Product linkimg={camisa2} />
                                <Product linkimg={casacovasco} />
                                <Product linkimg={camisafluminense} />
                                <Product linkimg={gorro} />
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