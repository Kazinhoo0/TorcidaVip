import './register.css';
import Logobranca from '../../../imgs/Logo Branca 1 (1).png';
import { useNavigate } from 'react-router-dom';


export default function TopFlapRegister () {



    const navigate = useNavigate();

    const handlenavigatehomepage = () => {
        navigate('/')
    }

    return ( 

        <div style={{zIndex: 5,width: 1905, height: 108, position: 'fixed'}}>
            <div style={{width: 1905, height: 108, left: 0, top: 0, position: 'absolute', background: 'linear-gradient(0deg,rgb(2, 2, 2) 0%,rgb(25, 25, 26) 100%), linear-gradient(0deg, #1E1E1E 0%, #1E1E1E 100%)', borderBottomLeftRadius: 142.5}} />
            
            <div style={{width: 302.25, height: 84.51, left: 180.75, top: 14.99, position: 'absolute'}}>
                <img style={{width: 43.62, height: 84.51, left: 0, top: 0, position: 'absolute'}} src={Logobranca}/>
                <div onClick={handlenavigatehomepage} style={{cursor: 'pointer',width: 259, height: 38, left: 15, top: 30, position: 'absolute', color: 'white', fontSize: 32, fontFamily: 'moonhouse', fontWeight: '400', wordWrap: 'break-word'}}>TorcidaVIP</div>
            </div>

           

            
        </div>

    )
}