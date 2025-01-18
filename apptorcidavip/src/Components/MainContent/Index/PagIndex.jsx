import TopFlap from "./TopFlap";
import './Index.css'
import MaisVendidos from "./MaisVendidos";
import NovidadesLoja from "./NovidadesLoja";
import FiltragemTimes from "./FiltragemTimes";
import InfoSite from "./InfoSite";
import InfoAtendimentos from "./InfoAtendimentos";



export default function IndexComponent () {

    return ( 

        <div className="container">

            <TopFlap/>

            <div className="container-homepag">

                <MaisVendidos/>

                <NovidadesLoja/>

                <FiltragemTimes/>


            </div>

            <div>
                <InfoSite customTop={2850}/>
                <InfoAtendimentos customcopyrightcontainer={3400} customTop={3000}/>
            </div>
            

            
            

        </div>
    
    )
}

