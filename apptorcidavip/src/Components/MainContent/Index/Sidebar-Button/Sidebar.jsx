import heart from '../../../../imgs/heart.png';
import cart from '../../../../imgs/cart.png';
import Logobranca from '../../../../imgs/Logo Branca 1 (1).png';
import Exit from '../../../../imgs/exit (1).png';
import '../Index.css';
import { useState } from 'react';

export default function MobileMenu({ OpenMeuspedidos, OpenMeuperfil, OpenCarrinho, OpenFavoritos, ExecuteExit }) {

    const [sidebaropen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        console.log("Estado atual:", sidebaropen);
        setSidebarOpen(!sidebaropen);
        console.log("Novo estado:", !sidebaropen);
    };
  return (
    <>
      <button 
        className="mobile-menu-button" 
        aria-label="Menu" 
        onClick={toggleSidebar}
      >
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>


      {sidebaropen && (
        <>
          <div className="sidebar-overlay"></div>
        
          <div className="mobile-sidebar">
            <span style={{color: 'white', width: '100px', height: '100px'}} onClick={{toggleSidebar}}>X</span>
            <ul className="sidebar-menu-list">
              <li onClick={OpenMeuperfil} className="sidebar-menu-item">
                <span>Meu Perfil</span>
              </li>
              <li onClick={OpenMeuspedidos} className="sidebar-menu-item">
                <span>Meus Pedidos</span>
              </li>
              <li onClick={OpenFavoritos} className="sidebar-menu-item">
                <img src={heart} alt="Favoritos" />
                <span>Favoritos</span>
              </li>
              <li onClick={OpenCarrinho} className="sidebar-menu-item">
                <img src={cart} alt="Carrinho" />
                <span>Carrinho</span>
              </li>
              <li onClick={ExecuteExit} className="sidebar-menu-item">
                <img src={Exit} alt="Sair" />
                <span>Sair</span>
              </li>
            </ul>
            
            <div className="sidebar-categories">
              <div className="sidebar-category-title">CATEGORIAS</div>
              <div className="sidebar-category">Masculino</div>
              <div className="sidebar-category">Feminino</div>
              <div className="sidebar-category">Infantil</div>
            </div>
            
          </div>
        </>
      )}
    </>
  );
}
