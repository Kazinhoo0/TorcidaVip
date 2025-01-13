import Logobranca from '../../../imgs/Logo Branca 1 (1).png';
import user from '../../../imgs/user.png';
import heart from '../../../imgs/heart.png';
import cart from '../../../imgs/cart.png'
import './Index.css';



export default function TopFlap () {


    return (

        <div style={{width: 1905, height: 108, position: 'relative'}}>
            <div style={{width: 1905, height: 108, left: 0, top: 0, position: 'absolute', background: 'linear-gradient(0deg, #363537 0%, #363537 100%), linear-gradient(0deg, #1E1E1E 0%, #1E1E1E 100%)', borderTopLeftRadius: 142.50}} />
            
            <div style={{width: 302.25, height: 84.51, left: 67.75, top: 14.99, position: 'absolute'}}>
                <img style={{width: 43.62, height: 84.51, left: 0, top: 0, position: 'absolute'}} src={Logobranca}/>
                <div style={{width: 259, height: 38, left: 15, top: 30, position: 'absolute', color: 'white', fontSize: 32, fontFamily: 'moonhouse', fontWeight: '400', wordWrap: 'break-word'}}>TorcidaVIP</div>
            </div>

            <div className='container-searchbar'>
                <input className='borderinput'/>
                
                <div style={{width: 47.03, height: 47.03, left: 9, top: 4, position: 'absolute', background: '#47B868', borderRadius: 9999}} />
                
                <div className='inputstyle' >
                    <input 
                    placeholder='BUSCAR...'
                    style={{width: 370, height: 36.80, border: 'none', paddingLeft: 15}}
                    type="text" 

                    />
                </div>
                
                <div style={{width: 36.80, height: 35.44, left: 12, top: 8, position: 'absolute'}}>
                    <div style={{width: 25.76, height: 24.81, left: 5.52, top: 5.32, position: 'absolute', border: '2px white solid'}}></div>
                </div>

            </div>

            <div className='containercartuserheart'>
                
                <div style={{width: 42.29, height: 41.79, position: 'relative'}}>
                    <div style={{width: 33.83, height: 33.43, left: 4.23, top: 4.18, position: 'absolute'}}>
                        <img src={user} alt="" />
                    </div>
                </div>

                <div style={{width: 49.75, height: 49.75, position: 'relative'}}>
                    <div style={{width: 39.92, height: 34.10, left: 4.98, top: 9.83, position: 'absolute'}}>
                        <img src={heart} alt="" />
                    </div>
                </div>

                <div style={{width: 42.95, height: 39.53, position: 'relative'}}>
                    <div style={{width: 39.31, height: 39.31, left: 0, top: 0.22, position: 'absolute'}}>
                        <div style={{width: 31.44, height: 31.13, left: 3.93, top: 4.90, position: 'absolute'}}>
                            <img src={cart} alt="" />
                        </div>
                    </div>

                    <div style={{width: 19, height: 19, left: 23.95, top: 0, position: 'absolute', background: '#47B868', borderRadius: 9999}} />
                    <div style={{left: 28.95, top: 2, position: 'absolute', color: 'white', fontSize: 14, fontFamily: 'Lustria', fontWeight: '400', wordWrap: 'break-word'}}>0</div>
                </div>

            </div>

            <div style={{width: 384, height: 26, left: 400, top: 53, position: 'absolute', justifyContent: 'flex-start', alignItems: 'center', gap: 40, display: 'inline-flex'}}>
                <div style={{width: 109, height: 26, position: 'relative'}}>
                <div style={{left: 0, top: 0, position: 'absolute', color: 'white', fontSize: 20, fontFamily: 'Roboto Mono', fontWeight: '700', wordWrap: 'break-word'}}>Masculino</div>
                </div>
                <div style={{width: 99, height: 26, position: 'relative'}}>
                <div style={{left: 0, top: 0, position: 'absolute', color: 'white', fontSize: 20, fontFamily: 'Roboto Mono', fontWeight: '700', wordWrap: 'break-word'}}>Feminino</div>
                </div>
                <div style={{width: 97, height: 26, position: 'relative'}}>
                <div style={{left: 0, top: 0, position: 'absolute', color: 'white', fontSize: 20, fontFamily: 'Roboto Mono', fontWeight: '700', wordWrap: 'break-word'}}>Infantil</div>
                </div>
            </div>

        </div>
    )
}