import imgimprovissada from '../../../imgs/do-utilizador.png';
import { BiDislike } from "react-icons/bi";
import { BiLike } from "react-icons/bi";
import { FaRegStar } from "react-icons/fa6";



export default function CartAvaliations ({title, datapost, description}) {


    return  (


        <div className="container-cartavaliations">

                <div className="user-info-review">
                    <img className="img-user-review" src={imgimprovissada} alt="" />
                    <p className="titlecoment">{title}</p>
            
                </div>

                <div className='datapost-starspost'>

                    <div className='qtn-start-review'>
                        <p className=''>{datapost}</p>
                    </div>
                    
                    <div className='qtn-start-review'>
                        <FaRegStar/><FaRegStar/><FaRegStar/><FaRegStar/><FaRegStar/>
                    </div>

                </div>

                <h3 style={{maxHeight: '150px' , display: 'flex', alignItems: 'center', justifyContent: 'start', paddingLeft: '20px'}}>
                    {description}
                </h3>

                {/* <small style={{display: 'flex', alignItems: 'center', justifyContent: 'start', paddingLeft: '20px'}}>Nobisi qui vel amet fugit facere.</small> */}

                <h4 style={{display: 'flex', alignItems: 'center', justifyContent: 'start', paddingLeft: '20px'}}>Recomenda este produto:</h4>

                <div style={{color: 'grey',display: 'flex', alignItems: 'center', justifyContent: 'start', paddingLeft: '20px', fontWeight: 'bold'}}>

                    <small >Te ajudou ?</small>

                    <BiLike style={{width: '50px', width: '70px', height: '30px', cursor: 'pointer'}} color="black" />
                    <small style={{color: 'black' }}>2</small>

                    <BiDislike style={{width: '50px', width: '70px', height: '30px', cursor: 'pointer'}}  color="black"/>
                    <small style={{color: 'black' }}>2</small>

                </div>

            </div>
    )
}