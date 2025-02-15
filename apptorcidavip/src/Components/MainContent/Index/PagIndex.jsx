import TopFlap from "./TopFlap";
import './Index.css'
import MaisVendidos from "./MaisVendidos";
import NovidadesLoja from "./NovidadesLoja";
import FiltragemTimes from "./FiltragemTimes";
import InfoSite from "./InfoSite";
import InfoAtendimentos from "./InfoAtendimentos";
import { Helmet } from 'react-helmet';



export default function IndexComponent () {

    return ( 

        <div className="container">
            <Helmet>
                <title>Torcida Vip</title>
            </Helmet>

            <TopFlap/>

            <div className="container-homepag">

                <MaisVendidos/>

                <NovidadesLoja/>

                <FiltragemTimes/>


            </div>

            <div>
                <InfoSite customTop={3960}/>
                <InfoAtendimentos customcopyrightcontainer={4500} customTop={4150}/>
            </div>
            
        </div>
    
    )
}

