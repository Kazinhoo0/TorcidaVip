import '../pagamento.css';
import EtapaInfos from './Etapainfos';
import EtapasPagamento from './Etapapagamento';
import Resumopedido from './Resumopedido';


export default function MainEtapas ({dadosuserlogon, enderecoentrega, produtooncarrinho }) {


    // Incluir as apis aqui e passar como props

    return (


        <>
            <div className='container-componentepagamentos'>
                <div className='sun-etapaspagamento'>

                    <EtapaInfos dadosuserlogon={dadosuserlogon} userendereco={enderecoentrega}/>

                    <EtapasPagamento/>

                    <Resumopedido produtosoncarrinho={produtooncarrinho}/>

                </div>
            </div>
        
        </>
    )
}