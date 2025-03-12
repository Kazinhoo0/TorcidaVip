import { useContext, useEffect, useRef, useState } from 'react';
import '../Index.css';
import ContextProducts from '../../../../context/ContextProduct';
import iconlupa from '../../../../imgs/Icon (14).png';
import RenderSurchBar from './RenderSearchBar';
import { useNavigate } from 'react-router-dom';


export default function Searchbar () {


    const {searchitem, setSearchitem, prodsearchbar, setProdsearchbar, setProdutosSearched, setsearchitemnamer  } = useContext(ContextProducts);

    const navigate = useNavigate();

    const searchbarRef = useRef(null); 

    const fetchProductSearched = async (e) => {
        e.preventDefault()
        if (searchitem.length > 0) {
            try {
                const response = await fetch (`https://torcidavipoficial-teste.onrender.com/api/get/produtobuscado` , ({
                    method: 'POST',
                    headers: {'Content-Type' : 'application/json'},
                    body: JSON.stringify({
                        nome: searchitem
                    })
                }))

                const data = await response.json();

                console.log('itens sendo pesquisado searched api :' , data)

                if (data.success) {
                    setProdutosSearched(data.data);

                    localStorage.setItem('itemsearched', searchitem)
                    setSearchitem('')

                    setTimeout(() => {
                        navigate('/searchproduct')
                    }, 500);
                }

            } catch (err) {
                console.log('erro:', err)
            }
        
        } else {
            setProdutosSearched([])
        }
    } 
    

    useEffect(() => {
        if (searchitem.length > 0) {
            const fetchSearchbar = async () => {
                try {
                    const response = await fetch (`https://torcidavipoficial-teste.onrender.com/api/get/searchbar` , ({
                        method: 'POST',
                        headers: {'Content-Type' : 'application/json'},
                        body: JSON.stringify({
                            nome: searchitem
                        })
                    }))

                    const data = await response.json();

                    console.log('item sendo pesquisado:' , data)

                    if (data.success) {
                        setProdsearchbar(data.data)
                    }

                } catch (err) {
                    console.log('erro:', err)
                }
            }

            fetchSearchbar();

        } else {
            setProdsearchbar([])
        }

    }, [searchitem])

    console.log('',prodsearchbar)


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

        <>
            <div className='container-searchbar'>
                <input className='borderinput'/>
                
                <div style={{width: 52.10, height: 55.03, left: 3.3, top: 2, position: 'absolute', background: '#47B868', borderRadius: 9999}} />
                
                <div className='inputstyle' >
                    <input 
                        className='input-searchbar'
                        placeholder='BUSCAR...'
                        style={{width: 370, height: 36.80, border: 'none', paddingLeft: 15}}
                        type="text" 
                        value={searchitem}
                        onChange={(e) => setSearchitem(e.target.value)}
                    />
                </div>
                
                <form onSubmit={fetchProductSearched} style={{display: 'flex',alignItems: 'center',justifyContent: 'center',width: 36.80, height: 35.44, left: 10, top: 12, position: 'absolute', cursor:'pointer'}}>
                    <button className='btn-searchbar' type='submit' ><img src={iconlupa} alt="" /></button>
                </form>

                {prodsearchbar.length > 0 && <RenderSurchBar produtos={prodsearchbar}/>}
                  

                {/* <ul className='result-searchbar'>
                   
                    <li>  
                        <div className='container-img-seachbar'>
                            <img src={imgteste} alt="" /> 
                        </div>
                        
                        <p className='style-nome-searchbar'>camisa fluminendadadawdwase</p>
                        <p className='style-preco-searchbar'>R$250,00</p>
                    </li>
                    
                </ul>  */}

    
            </div>
        
        </>
    )
}