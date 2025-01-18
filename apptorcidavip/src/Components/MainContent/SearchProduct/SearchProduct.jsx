import InfoAtendimentos from '../Index/InfoAtendimentos';
import InfoSite from '../Index/InfoSite';
import TopFlap from '../Index/TopFlap';
import './searchproduct.css';
import icon10 from '../../../imgs/Icon (10).png';
import vector from '../../../imgs/Vector.png';
import camisa11 from '../../../imgs/image.png';
import heart from '../../../imgs/heart.png';
import Product from '../Product/DesigneProduct';




export default function SearchProduct() {


    return (



        <div className='container-searchproduct'>

            <TopFlap />

            <div className='sun-searchproduct'>
                <div className='aligndiv-searchproduct'>
                    <div style={{ paddingLeft: 20, height: '80px', display: 'flex', alignItems: 'end', justifyContent: 'start' }} >
                        <p>Início Femínino</p>
                    </div>

                    <div style={{ height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                        <img style={{ height: '25px', paddingLeft: 20 }} src={icon10} alt="" />
                        <h3 className='font-text-profilepage'>Filtrar por Categoria</h3>
                    </div>

                    <div className='filtrarporcategoria-style'>

                        <div className='rectangle-style'>
                            <p className='text-filtrocategoria-style'>Avaliação</p>
                            <img src={vector} alt="" />
                        </div>

                        <div className='rectangle-style'>
                            <p className='text-filtrocategoria-style'>Cor</p>
                            <img src={vector} alt="" />
                        </div>

                        <div className='rectangle-style'>
                            <p className='text-filtrocategoria-style'>Gênero</p>
                            <img src={vector} alt="" />
                        </div>

                        <div className='rectangle-style'>
                            <p className='text-filtrocategoria-style'>Peça</p>
                            <img src={vector} alt="" />
                        </div>

                        <div className='rectangle-style'>
                            <p className='text-filtrocategoria-style'>Preço</p>
                            <img src={vector} alt="" />
                        </div>

                        <div className='rectangle-style'>
                            <p className='text-filtrocategoria-style'>Tamanho</p>
                            <img src={vector} alt="" />
                        </div>

                        <div className='rectangle-style'>
                            <p className='text-filtrocategoria-style'>Time</p>
                            <img src={vector} alt="" />
                        </div>

                        <div>
                            <h3 className='font-text-profilepage'>Mostrando 11 itens</h3>

                        </div>

                    </div>

                    <div className='container-renderproducts-searched'>
                        <Product linkimg={camisa11} favoriteicon={heart} />
                        <Product linkimg={camisa11} favoriteicon={heart} />
                        <Product linkimg={camisa11} favoriteicon={heart} />
                        <Product linkimg={camisa11} favoriteicon={heart} />
                        <Product linkimg={camisa11} favoriteicon={heart} />
                        <Product linkimg={camisa11} favoriteicon={heart} />
                        <Product linkimg={camisa11} favoriteicon={heart} />
                        <Product linkimg={camisa11} favoriteicon={heart} />
                        <Product linkimg={camisa11} favoriteicon={heart} />
                        <Product linkimg={camisa11} favoriteicon={heart} />
                        <Product linkimg={camisa11} favoriteicon={heart} />

                    </div>

                </div>
            </div>

            <InfoSite customTop={1760} />

            <InfoAtendimentos customcopyrightcontainer={2300} customTop={1900} />

        </div>
    )
}