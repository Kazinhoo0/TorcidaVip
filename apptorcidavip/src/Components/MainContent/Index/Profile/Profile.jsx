import '../Index.css';
import user from '../../../../imgs/user.png';



export default function Profile ({handlenavigate}) {



    return (

        <>

            <div className='topflap-profile-container'>
                <div style={{cursor: 'pointer',width: 33.83, height: 33.43, left: 4.23, top: 4.18, position: 'absoute'}}>
                    <img onClick={handlenavigate} src={user} alt="" />
                </div>
            </div>

        </>
    
        
    )
}