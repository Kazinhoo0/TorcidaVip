import './deletarconta.css';
import alert from '../../../../imgs/crisis.png';
import { Helmet } from 'react-helmet';


export default function DeletarConta () {


    return (

        <div className='container-deletarconta'>

            <Helmet>
                <title>Torcida Vip | Deletar conta</title>
            </Helmet>

            <div className='title-deletarconta'>
                <h3>Deletar conta</h3>
            </div>

            <div className='container-aviso-deletarconta'>
                <div className='aviso-deletarconta'>

                    <div style={{display: 'flex', alignItems: 'center', height: 30}}>

                        <img src={alert} style={{height: 30}} sty alt="" />
                        <h4>O encerramento da conta é uma ação permanente</h4>
                        
                    </div>

                    <div style={{display: 'flex', alignItems: 'center', height: 80}}>
                        <p style={{fontSize: 13}}>Observe que o fechamento da conta é uma ação permanente e, uma vez que sua conta for fechada, ela não estará mais disponível para você e não poderá ser restaurada. Se você decidir mais tarde que deseja começar a fazer pedidos conosco novamente ou se quiser usar produtos e serviços que exigem uma conta, será necessário criar uma nova conta.</p>
                    </div>

                </div>

            
            </div>

            <div className='cont-motivofecharconta'>

                <h4>Selecione o principal motivo para fechar sua conta TorcidaVip (opcional)</h4>
                
                <select style={{width: 150, height: 30, borderRadius: 5, background: '#d1cfcf6e'}} name="motivo" id="motivos">
                    <option value="">Escolha o motivo</option>
                    <option value="">Não estou mais usando esta conta</option>
                    <option value="">Eu tenho outra conta</option>
                    <option value="">Quero criar uma nova conta</option>
                    <option value="">Preocupação com a segurança da conta/Atividade não autorizada</option>
                    <option value="">Preocupações com a privicidade</option>
                    <option value="">Tenho problemas em aberto com a Amazon</option>
                    <option value="">Eu não quero apresentar um motivo</option>
                </select>

                <div style={{display: 'flex', justifyContent: 'start', alignItems: 'center'  }}>
                    <input style={{width: 15,height: 15}} type="checkbox" />
                    <small>Sim, quero fechar permanentemente minha conta TorcidaVip e excluir meus dados.</small>
                </div>

                <div className='container-btn-excluirconta'>
                    <button className='btn-excluirconta'>EXCLUIR CONTA</button>
                </div>

            </div>

            <div style={{textAlign: 'start', paddingLeft: 50}}>
                <p>Depois de encerrar sua conta, avaliamos quais informações devem ser mantidas. Normalmente, optamos por manter alguns dados alinhados com as nossas obrigações legais, incluindo ao abrigo das leis brasileiras, para o estabelecimento, exercício ou defesa de processos judiciais e para prevenir fraudes/garantir a segurança, conforme previsto na Lei Geral de Proteção de Dados (LGPD). Por isso, retemos dados de transações relacionados a pedidos de produtos e serviços feitos pelos clientes, como nome do cliente, produto encomendado, data do pedido, endereço de entrega, forma de pagamento, preço e imposto pago. Também podemos manter informações de identificação pessoal limitadas após o encerramento da conta, a fim de administrar esses direitos e obrigações.</p>
            </div>

        </div>
    )
}