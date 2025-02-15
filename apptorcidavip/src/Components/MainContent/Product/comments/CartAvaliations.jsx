import imgimprovissada from '../../../../imgs/do-utilizador.png';
import { BiDislike } from "react-icons/bi";
import { BiLike } from "react-icons/bi";
import { FaRegStar } from "react-icons/fa6";
import { useState } from 'react';




export default function CartAvaliations ({infoscomment}) {

    const [commentliked, setCommentliked] = useState('');

    const handlecommentclicked = () => {
        setCommentliked(commentliked + 1)
    }

    return  (


        <div className="container-cartavaliations">

                <div className="user-info-review">
                    <img className="img-user-review" src={imgimprovissada} alt="" />
                    <p className="titlecoment">{infoscomment.titulo}</p>
                    
                    <p></p>
                    
                </div>

                <div className='qtn-start-review'>
                    <FaRegStar/><FaRegStar/><FaRegStar/><FaRegStar/><FaRegStar/>
                </div>

                <div className='container-description'>
                    <p>
                        {infoscomment.descricao}
                    </p>
                </div>
                

                {/* <small style={{display: 'flex', alignItems: 'center', justifyContent: 'start', paddingLeft: '20px'}}>Nobisi qui vel amet fugit facere.</small> */}

                <h4 style={{display: 'flex', alignItems: 'center', justifyContent: 'start', paddingLeft: '20px'}}>Avaliaçâo do produto: {infoscomment.avaliacao}</h4>

                <div style={{color: 'grey',display: 'flex', alignItems: 'center', justifyContent: 'start', paddingLeft: '20px', fontWeight: 'bold'}}>

                    <small >Te ajudou ?</small>

                    <BiLike onClick={handlecommentclicked} style={{width: '50px', width: '70px', height: '30px', cursor: 'pointer'}} color="black" />
                    <small style={{color: 'black' }}>{commentliked}</small>

                    <BiDislike style={{width: '50px', width: '70px', height: '30px', cursor: 'pointer'}}  color="black"/>
                    <small style={{color: 'black' }}></small>

                </div>

                <div className='container-imgsprod'>
                    <img src={infoscomment.userimgprod} alt="" />
                </div>

            </div>
    )
}