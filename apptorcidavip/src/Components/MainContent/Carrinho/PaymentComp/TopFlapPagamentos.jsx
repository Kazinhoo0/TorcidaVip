//import './Index.css';
import Logobranca from '../../../../imgs/Logo Branca 1 (1).png';
import { useNavigate } from 'react-router-dom';
import { TbLockSquareRounded } from "react-icons/tb";


export default function TopFlapPagamentos () {

    const navigate = useNavigate('')

    return ( 

         <div className='container-topflap'>
                    {/* {favoriteopened && addonfavorite.length > 0 && (
                        
                        <FavotireProduct 
                        handlefavoriteopened={handlefavoriteopened}
                        />
                        
                    )} */}
        
                    {/* {favoriteopened && addonfavorite.length === 0 && (
                        <FavotireProductEmpity handlefavoriteopened={handlefavoriteopened} />
                    )} */}
                    <div className='container-sun-topflap'/>
                    
                    <div onClick={() => {
                        navigate('/')
                    }} style={{width: 302.25, height: 84.51, left: 300.75, top: 14.99, position: 'absolute'}}>
                        <img style={{width: 43.62, height: 84.51, left: 0, top: 0, position: 'absolute'}} src={Logobranca}/>
                        <div  style={{cursor: 'pointer',width: 259, height: 38, left: 15, top: 30, position: 'absolute', color: 'white', fontSize: 32, fontFamily: 'moonhouse', fontWeight: '400', wordWrap: 'break-word'}}>TorcidaVIP</div>
                    </div>


                    <div style={{width: 302.25, height: 84.51, left: 1400.75, top: 14.99, position: 'absolute', display: 'flex'}}>
                        <span style={{fontSize: 13,width: '200px',color: 'white', display: 'grid',flexDirection: 'column', alignItems: 'center', justifyContent: 'end'}}>

                            <span>
                                SEUS DADOS <br/>
                                100% SEGUROS
                            </span>
                        
                        </span>

                        <span style={{display: 'flex',alignItems: 'center',width: 100}}>
                            <TbLockSquareRounded style={{width: '50px', height: '28px'}} color='white'/>
                        </span>

                    </div>
        
        
                </div>
    )
}