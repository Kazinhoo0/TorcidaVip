import '../Index/Index.css'



export default function Product ({ linkimg, favoriteicon}) {


    return (

        <div className="products-opcoes">
                        
            <div >
                
                <img className='shirt-image' src={linkimg} alt="" />

                <img className='favorite-icon' src={favoriteicon} alt="" />

                <p className='itensname-style'  style={{display: 'flex', justifyContent: 'start', height: 10}}>
                    Regata Fluminense Left Feminina
                </p>
                <h3 style={{display: 'flex', justifyContent: 'start', fontWeight: 'bold'}}>R$ 59,90</h3>

            </div>

            {/* <div className='container-infoproduct'>
                <p className='itensname-style'  style={{display: 'flex', justifyContent: 'start', height: 10}}>
                    Regata Fluminense Left Feminina
                </p>
                <h3 style={{display: 'flex', justifyContent: 'start', fontWeight: 'bold'}}>R$ 59,90</h3>
            </div> */}
                                        
        </div>
    )
}