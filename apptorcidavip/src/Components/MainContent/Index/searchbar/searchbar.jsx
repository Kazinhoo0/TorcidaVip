import { useContext, useEffect, useState } from 'react';
import '../Index.css';
import ContextProducts from '../../../../context/ContextProduct';
import iconlupa from '../../../../imgs/Icon (14).png';
import imgteste from '../../../../imgs/15195641246_15170945177_D40-1332-014_zoom1-2.png'
// import Product from '../../Product/Designe/DesigneProduct';

export default function Searchbar ({handlenavigate}) {


    const {searchitem, setSearchitem } = useContext(ContextProducts)

    const [prodsearchbar, setProdsearchbar] = useState([])


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

                    // console.log('item sendo pesquisado:' , data)

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
                
                <div onClick={handlenavigate} style={{width: 36.80, height: 35.44, left: 10, top: 12, position: 'absolute', cursor:'pointer'}}>
                    <img src={iconlupa} alt="" />
                </div>

                  {prodsearchbar.length > 0 && (

                        <ul className='result-searchbar'>
                            {prodsearchbar.map((produto, index) => (

                                <li key={index}>  
                                    <div className='container-img-seachbar'>
                                        <img src={produto.imagem} alt="" /> 
                                    </div>

                                    <p className='style-nome-searchbar'>{produto.nome}</p>
                                    <p className='style-preco-searchbar'>{produto.preco}</p>
                                </li>

                            ))}
                        </ul>
    
                    )} 

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