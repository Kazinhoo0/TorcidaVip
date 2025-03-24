import InfoAtendimentos from '../Index/InfoAtendimentos'
import InfoSite from '../Index/InfoSite'
import TopFlap from '../Index/TopFlap'
import './politics.css'



export default function Politics () {


    return  (
        <>
            <TopFlap/>

            <div className="container-politics">
            

            </div>

            <InfoSite customTop={1150} />
            
            <InfoAtendimentos customcopyrightcontainer={1700} customTop={1300}/>
        </>
        
    )
}