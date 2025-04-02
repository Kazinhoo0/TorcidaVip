import '../pagamento.css';
import imgteste from '../../../../../imgs/15195641015_15171215674_M_0087_002004314_01-2 (11).png'


export default function ComponentProductpedido ({infoproduto}) {


    return (

        <>
            <div className='container-productpedido'>
                
                <div className='imageproduct'>
                    <div>
                        <img style={{width: 60}} src={infoproduto.thumbnail} alt="" />
                    </div>
                </div>

                <div className='nameproduct'>

                    <p>
                        {infoproduto.nomeitem}
                    </p>

                    <span>Tamanho: {infoproduto.tamanho}</span>
                </div>

                <div className='imageproduct'>
                    <span>R${infoproduto.preco}</span>
                </div>

            </div>
        </>
    )
}