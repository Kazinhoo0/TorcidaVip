import Logobranca from '../../../imgs/Logo Branca 1 (1).png';
import heart from '../../../imgs/heart.png';
import cart from '../../../imgs/cart.png'
import './Index.css';
import { useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import FavotireProductEmpity from '../../Favorite/FavoriteProductEmpity';
import ContextProducts from '../../../context/ContextProduct';
import FavotireProduct from '../../Favorite/FavoriteProduct';
import Exit from '../../../imgs/exit (1).png'
import Searchbar from './searchbar/searchbar';
import Profile from './Profile/Profile';
import CardProfile from './Profile/CardProfile';
import TodosOspedidos from '../UserProfile/TodosOsPedidos/TodosPedidos';



export default function TopFlap () {

    const {addonfavorite, setaddonfavorite, dadosuserlogon, showingpageclicked} = useContext(ContextProducts);


    const [clickedprofile, setClickedProfile] = useState(false);


    const handleprofileclicked = () => {
        setClickedProfile(!clickedprofile)
    }

    const finalizarsessão = () => {
        localStorage.removeItem('authToken')
        localStorage.removeItem('authTokenGoogle')
        navigate('/')
        window.location.reload();

    }

    const renderpage = () => {
        window.location.reload();
    }

    const navigate = useNavigate();

    const handlenavigatehomepage = () => {
        navigate('/')
    }

    // const handlenavigatesearchprod = () => {
    //     navigate('/searchproduct')
    // }

    const handlenavigatemakelogin = () => {

        if (dadosuserlogon && dadosuserlogon.id) {
            navigate('/Profile')
        } else {
            navigate('/login')
        } 
    }

    const handlenavigatemeuspedidos = () => {

        if (dadosuserlogon && dadosuserlogon.id) {
            navigate('/profile')
            {showingpageclicked === 'todospedidos' && <TodosOspedidos/>}
        
        } else {
            navigate('/login')
        } 

    }


    const handlenavigatecartoes = () => {

        if (dadosuserlogon && dadosuserlogon.id) {
            navigate('/Profile')
        } else {
            navigate('/login')
        } 
        
    }

    const handlenavigatecarrinhocompras = () => {

        if (dadosuserlogon && dadosuserlogon.id) {
            navigate('/carrinhocompras')
        } else {
            navigate('/carrinhocomprasvazio')
        }

    }

    const [favoriteopened, setfavoriteopened] = useState(false)

    const handlefavoriteopened = () => {
        setfavoriteopened(!favoriteopened)
    }
    
    // console.log('dadosuserlogon no topflap:', dadosuserlogon)

    const {produtosoncarrinho} = useContext(ContextProducts);


    useEffect(() => {
        const fetchGetFavoritesprods  = async () => {
            
            const userid =  dadosuserlogon.id

            try {
                const response = await fetch (`https://torcidavipoficial-teste.onrender.com/api/get/addfavoriteprod`, {
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json',
                    },
                    body: JSON.stringify({
                        userid: userid
                    })
                })

                if (!response.ok) {
                    throw new Error('Erro ao buscar dados');
                }
    
                const data = await response.json();

                // console.log('resposta da API: ', data);
    
                if (data.success && data.data.length > 0) {
                    setTimeout(() => {
                        setaddonfavorite(data.data);
                    }, 2000)
                } else {
                    setaddonfavorite([]); 
                }
    
            } catch (err) {
                return console.log(err.message)
            }
        };

        fetchGetFavoritesprods();
    }, [])

    useEffect(() => {
        console.log('produtos favoritos:', addonfavorite);
    }, [addonfavorite]);
    
    return (

        <div className='container-topflap'>
            {favoriteopened && addonfavorite.length > 0 && (
                
                <FavotireProduct 
                handlefavoriteopened={handlefavoriteopened}
                />
                
            )}

            {favoriteopened && addonfavorite.length === 0 && (
                <FavotireProductEmpity handlefavoriteopened={handlefavoriteopened} />
            )}
            <div className='container-sun-topflap'/>
            
            <div style={{width: 302.25, height: 84.51, left: 67.75, top: 14.99, position: 'absolute'}}>
                <img style={{width: 43.62, height: 84.51, left: 0, top: 0, position: 'absolute'}} src={Logobranca}/>
                <div onClick={handlenavigatehomepage} style={{cursor: 'pointer',width: 259, height: 38, left: 15, top: 30, position: 'absolute', color: 'white', fontSize: 32, fontFamily: 'moonhouse', fontWeight: '400', wordWrap: 'break-word'}}>TorcidaVIP</div>
            </div>

            <Searchbar/>

            <div className='containercartuserheart'>
                
                <Profile handlenavigate={handleprofileclicked} />

                <div onClick=
                {() => {
                    handlefavoriteopened();
                }} 
                style={{width: 49.75, height: 49.75, position: 'relative'}}>
                    <div style={{cursor: 'pointer',width: 39.92, height: 34.10, left: 4.98, top: 9.83, position: 'absolute'}}>
                        <img src={heart} alt="" />
                    </div>
                </div>

               

                <div style={{width: 42.29, height: 39.53, position: 'relative'}}>
                    <div style={{width: 39.31, height: 39.31, left: 0, top: 0.22, position: 'absolute'}}>
                        <div style={{cursor: 'pointer',width: 31.44, height: 31.13, left: 3.93, top: 4.90, position: 'absolute'}}>
                            <img onClick={() => {
                                handlenavigatecarrinhocompras();
                            }} src={cart} alt="" />
                        </div>
                    </div>

                    <div style={{width: 19, height: 19, left: 23.95, top: 0, position: 'absolute', background: '#47B868', borderRadius: 9999}} />
                    <div style={{left: 28.95, top: 2, position: 'absolute', color: 'white', fontSize: 14, fontFamily: 'Lustria', fontWeight: '400', wordWrap: 'break-word'}}>{produtosoncarrinho.length}</div>
                </div>

            
                {/* <div>
                    <button style={{background: 'none', border:'none',cursor: 'pointer',width: 31.44, height: 31.13, left: 0, top: 4.90, position: 'absolute'}} onClick={finalizarsessão}>
                        <img style={{width: 30}} src={Exit} alt="" />
                    </button>
                </div> */}


                {dadosuserlogon && Object.keys(dadosuserlogon).length > 0 && 
                    <div style={{backgroundColor: 'while',width: 39.31, height: 39.31, left: 165, top: 7, position: 'absolute'}}>
                        <div style={{cursor: 'pointer',width: 31.44, height: 31.13, left: 3.93, top: 4.90, position: 'absolute'}}>
                            <img onClick={finalizarsessão} style={{width: 30}} src={Exit} alt="" />
                        </div>
                    </div>
                }
               
            </div>
                
            {dadosuserlogon && Object.keys(dadosuserlogon).length > 0 && (
                clickedprofile && (
                    <CardProfile meuperfil={handlenavigatemakelogin} meuspedidos={handlenavigatemeuspedidos} meuscartoes={handlenavigatecartoes}/>  
                )
            )}

            {dadosuserlogon && Object.keys(dadosuserlogon).length <= 0 && (
                clickedprofile && (
                   navigate('/login')  
                )
            )}
                
            <div style={{width: 384, height: 50, left: 450, top: 35, position: 'absolute', justifyContent: 'flex-start', alignItems: 'center', gap: 40, display: 'inline-flex',fontFamily: 'Teko'}}>
                <div style={{width: 109, height: 26, position: 'relative'}}>
                    <div style={{left: 0, top: 0, position: 'absolute', color: 'white', fontSize: 25, fontWeight: '500', wordWrap: 'break-word'}}>Masculino</div>
                </div>

                <div style={{width: 99, height: 26, position: 'relative'}}>
                    <div style={{left: 0, top: 0, position: 'absolute', color: 'white', fontSize: 25, fontWeight: '500', wordWrap: 'break-word'}}>Feminino</div>
                </div>

                <div style={{width: 97, height: 26, position: 'relative'}}>
                    <div style={{left: 0, top: 0, position: 'absolute', color: 'white', fontSize: 25, fontWeight: '500', wordWrap: 'break-word'}}>Infantil</div>
                </div>
            </div>

        </div>
    )
}