
import { useContext, useEffect } from 'react';
import './favoriteproduct.css';
import { IoMdClose } from "react-icons/io";
import ContextProducts from '../../context/ContextProduct';
import CardFavoriteProd from './CardComponentFavorite';




export default function FavotireProduct ({handlefavoriteopened}) {


    const {addonfavorite} = useContext(ContextProducts);


    return ( 

        <>
            <div className='container-boxshadow'>
                <div className='container-favoriteproductclose'>
                    <div className='tittle-and-close'>

                        <div style={{width: 350,paddingLeft: '20px',textAlign: 'start',display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 0, padding: 0, margin: 0}}>
                            <h3 style={{padding: 0, paddingLeft: '20px', margin: '0px'}}>Lista de Desejos</h3>
                            <h6 style={{padding: 0, paddingLeft: '20px', margin: '0px', color: 'grey'}}>Favorite produtos para todos os momentos</h6>
                        </div>
                    

                        <div onClick={handlefavoriteopened} style={{width: '350px', display: 'flex', alignItems: 'center', justifyContent: 'end'}}>
                            <IoMdClose color='grey' className='closepage-style' />
                        </div>

                    </div>

                    <div className='container-productsfavoritos'>
                        {addonfavorite.map((item, index) => {
                            return <CardFavoriteProd
                                key={index}
                                infoprods={item}
                            />
                        })}
                    </div>

                </div>
            </div>
        </>     
    )
}