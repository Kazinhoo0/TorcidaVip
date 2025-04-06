import { useContext, useEffect, useRef, useState } from 'react';
import ContextProducts from '../../../../context/ContextProduct';
import iconlupa from '../../../../imgs/Icon (14).png';
import RenderSurchBar from './RenderSearchBar';
import { useNavigate } from 'react-router-dom';
import '../Index.css';


export default function Searchbar() {
  const {
    searchitem,
    setSearchitem,
    prodsearchbar,
    setProdsearchbar,
    setProdutosSearched
  } = useContext(ContextProducts);

  const navigate = useNavigate();
  const searchbarRef = useRef(null);

  const fetchProductSearched = async (e) => {
    e.preventDefault();
    
    if (searchitem.length > 0) {
      try {
        const response = await fetch('https://torcidavipoficial-teste.onrender.com/api/get/produtobuscado', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nome: searchitem
          })
        });

        const data = await response.json();

        if (data.success) {
          setProdutosSearched(data.data);
          localStorage.setItem('itemsearched', searchitem);
          setSearchitem('');

          setTimeout(() => {
            navigate('/searchproduct');
          }, 500);
        }
      } catch (err) {
        console.log('erro:', err);
      }
    } else {
      setProdutosSearched([]);
    }
  };

  useEffect(() => {
    if (searchitem.length > 0) {
      const fetchSearchbar = async () => {
        try {
          const response = await fetch('https://torcidavipoficial-teste.onrender.com/api/get/searchbar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              nome: searchitem
            })
          });

          const data = await response.json();

          if (data.success) {
            setProdsearchbar(data.data);
          }
        } catch (err) {
          console.log('erro:', err);
        }
      };

      fetchSearchbar();
    } else {
      setProdsearchbar([]);
    }
  }, [searchitem]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchbarRef.current && !searchbarRef.current.contains(event.target)) {
        setProdsearchbar([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="container-searchbar" ref={searchbarRef}>
      <div className="borderinput"></div>
      
      <div className="searchbar-icon-container">
        <form className="form-searchbar" onSubmit={fetchProductSearched}>
          <button className="btn-searchbar" type="submit">
            <img src={iconlupa} alt="Buscar" />
          </button>
        </form>
      </div>
      
      <div className="inputstyle">
        <input 
          className="input-searchbar"
          placeholder="BUSCAR..."
          type="text" 
          value={searchitem}
          onChange={(e) => setSearchitem(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && fetchProductSearched(e)}
        />
      </div>
      
      {prodsearchbar.length > 0 && (
        <div className="searchbar-results">
          <RenderSurchBar produtos={prodsearchbar} />
        </div>
      )}
    </div>
  );
}