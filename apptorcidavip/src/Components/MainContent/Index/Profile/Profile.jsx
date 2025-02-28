import '../Index.css';
import user from '../../../../imgs/user.png';



export default function Profile ({handlenavigate}) {



    return (

        <>

            <div style={{width: 42.29, height: 41.79, position: 'relative'}}>
                <div style={{cursor: 'pointer',width: 33.83, height: 33.43, left: 4.23, top: 4.18, position: 'absolute'}}>
                    <img onClick={handlenavigate} src={user} alt="" />
                </div>
            </div>

        </>
    
        
    )
}