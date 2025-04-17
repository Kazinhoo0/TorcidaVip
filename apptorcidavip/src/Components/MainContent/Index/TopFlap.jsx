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
import MobileMenu from './Sidebar-Button/Sidebar';



export default function TopFlap () {

    const navigate = useNavigate();

    const { addonfavorite, dadosuserlogon, showingpageclicked, produtosoncarrinho, loading, setLoading } = useContext(ContextProducts);
    const [clickedprofile, setClickedProfile] = useState(false);
    const [favoriteopened, setFavoriteOpened] = useState(false);

    const handleProfileClicked = () => setClickedProfile(!clickedprofile);
    const handleFavoriteOpened = () => setFavoriteOpened(!favoriteopened);
    const handleNavigateHomepage = () => navigate('/');
    const handleNavigateCart = () => {

        if (dadosuserlogon && dadosuserlogon.id) {
            navigate('/carrinhocompras');
        } else {
            navigate('/carrinhocomprasvazio');
        }
    }

    useEffect(() => {
        if (dadosuserlogon && Object.keys(dadosuserlogon).length <= 0 && clickedprofile) {
          navigate('/login');
        }
    }, [dadosuserlogon, clickedprofile, navigate]);

    const handleNavigateProfile = () => {
        if (dadosuserlogon && dadosuserlogon.id) {
             navigate('/profile')
            {showingpageclicked === 'todospedidos' && <TodosOspedidos/>}
        } else {
            navigate('/login');
        }
    }
    const handleNavigatePedidos = () => {
        if (dadosuserlogon && dadosuserlogon.id) {
            navigate('/profile');
        } else {
            navigate('/login');
        }
    }
    const handleNavigateCartoes = () => {
        if (dadosuserlogon && dadosuserlogon.id) {
            navigate('/Profile');
        } else {
            navigate('/login');
        }
    }

    if (loading) {
        return <div style={{ width: '100%', height: '1000px', justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
            <div className="spinner"></div>
        </div>
    };

    const finalizaSessao = () => {
        setLoading(true);
        localStorage.removeItem('authToken');
        localStorage.removeItem('authTokenGoogle');
        navigate('/');
        setLoading(false);
        window.location.reload();
    }

    return (

        <div className="container-topflap">
            {favoriteopened && addonfavorite.length > 0 && (
                <FavotireProduct handlefavoriteopened={handleFavoriteOpened} />
            )}
            {favoriteopened && addonfavorite.length === 0 && (
                <FavotireProductEmpity handlefavoriteopened={handleFavoriteOpened} />
            )}

            <div className="topflap-logo-container">
                <img src={Logobranca} alt="Logo" className="topflap-logo-image" />
                <div onClick={handleNavigateHomepage} className="topflap-brand">
                    TorcidaVIP
                </div>
            </div>

            <Searchbar />
            
            <div className="topflap-icons-container">
                <Profile handlenavigate={handleProfileClicked} />

                <div onClick={handleFavoriteOpened} className="topflap-heart-container">
                    <img src={heart} alt="Favoritos" />
                </div>
                
                <div onClick={handleNavigateCart} className="topflap-cart-container">
                    <img src={cart} alt="Carrinho" />
                    <div className="topflap-cart-notification">
                        {produtosoncarrinho.length}
                    </div>
                </div>

                {dadosuserlogon && Object.keys(dadosuserlogon).length > 0 && (
                    <div onClick={finalizaSessao} className="topflap-exit-container">
                        <img style={{width: 30}} src={Exit} alt="Sair" />
                    </div>
                )}
            </div>
            
        
            {dadosuserlogon && Object.keys(dadosuserlogon).length > 0 && (
                clickedprofile && (
                    <CardProfile meuperfil={handleNavigateProfile} meuspedidos={handleNavigatePedidos} meuscartoes={handleNavigateCartoes}/>  
                )
            )}

            <MobileMenu 
                OpenCarrinho={handleNavigateCart}
                OpenMeuspedidos={handleNavigatePedidos}
                OpenMeuperfil={handleNavigateProfile}
                OpenFavoritos={handleFavoriteOpened}
                ExecuteExit={finalizaSessao}
            />

            <div className="topflap-nav-categories">
                <div className="topflap-nav-category">Masculino</div>
                <div className="topflap-nav-category">Feminino</div>
                <div className="topflap-nav-category">Infantil</div>
            </div>
        </div>
    )
}