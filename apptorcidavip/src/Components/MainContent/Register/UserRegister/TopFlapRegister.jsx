import './register.css';
import Logobranca from '../../../../imgs/Logo Branca 1 (1).png';
import { useNavigate } from 'react-router-dom';


export default function TopFlapRegister () {



    const navigate = useNavigate();

    const handlenavigatehomepage = () => {
        navigate('/')
    }

    return ( 

        <div className="header-container">
            <div className="header-background"></div>
            
            <div className="logo-container">
                <img className="logo-image" src={Logobranca} alt="Logo TorcidaVIP" />
                <div 
                    className="logo-text" 
                    onClick={handlenavigatehomepage}
                >
                    TorcidaVIP
                </div>
            </div>
        </div>

    )
}