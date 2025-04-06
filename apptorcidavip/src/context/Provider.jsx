import { useState, useEffect } from 'react';
import ContextProducts from './ContextProduct';
import propTypes from 'prop-types';
import { jwtDecode } from "jwt-decode";




export default function Provider ({ children }) {

    const [idproductview, setIdProductView] = useState('')

    const [produtosapi, setProdutosApi] = useState([]);

    const [depositoid, setDepositoId] = useState({})

    const [userpedido, setUserPedido] = useState({});

    const [infocartão, setInfoCartão] = useState([])

    const [produtosdb, setProdutosDb] = useState([]);

    const [allprodutosdb, setAllProdutosDb] = useState([]);

    const [loading, setLoading] = useState(true);

    const [freteSelecionado, setFreteSelecionado] = useState('');

    const [error, setError] = useState(null);
    
    const [productdetails, setProductDetails] = useState({});

    const [produtoid, setProdutoId] = useState('');

    const [resumopedido, setResumoPedido] = useState({
        totalpedido: '',
        totalpedidowithfrete: ''
    })

    const [addonfavorite, setaddonfavorite] = useState([]);

    const [ observacoespedido ,setObservacoesPedido ] = useState('')

    const [produtosoncarrinho , setProdutosOnCarrinho] = useState([]);

    const [showingpageclicked, setShowingpageclicked] = useState(null);

    const [produtossearched, setProdutosSearched] = useState([]);
    
    const [prodsearchbar, setProdsearchbar] = useState([]);

    const [configitens, setConfigItens] = useState({
        marca: '',
        codigo: '',
        tamanho: '',
        cor: '',
        descricaoLonga: '',
        descricaoDetalhada: 
        '{"Composicao": "", "Corpredominante": "", "Clube": "", "Indicadapara": "", "Escudo": "" , "Gênero": "", "Gola": "", "Manga": ""}',
    })

    const [searchitem, setSearchitem] = useState('');

    const [novocomentario , setNovocomentario] = useState({
        title:'',
        description: '',
        avaliacao: ''
    });

    const [dadosuserlogin, setDadosUserLogin] = useState ({
        email: '',
        senha: ''
    });

    const [Dadosnewuser, setDadosNewUser] = useState({
        nome:'',
        sobrenome:'',
        email:'',
        senha:'',
        confirmarsenha:'',
        tipoendereco:'',
        destinatario:'',
        cep:'',
        cpf: '',
        telefone: '',
        endereco:'',
        numero:'',
        bairro:'',
        cidade:'',
        pais: ''
    });

    const [dadosuserlogon, setDadosUserLogOn] = useState([]);

     useEffect(() => {
        const token = (localStorage.getItem('authToken'));

         if (token) {
            const DecodeToken = jwtDecode(token);
            setDadosUserLogOn(DecodeToken);
         } else {
            setDadosNewUser('')
         }
     }, []);

    useEffect(() => {
        const token = (localStorage.getItem('authTokenGoogle'));

        if (token) {
            const DecodeToken = jwtDecode(token);
            setDadosUserLogOn(DecodeToken);
        } else {
            setDadosNewUser('')
        }
    }, []);

    const [newendereco, setNewEndereco] = useState({

        nomeendereco: '',
        cep: '',
        endereco: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
        destinatario: ''

    })

    const [userenderecos, setUserEnderecos] = useState([]);
    
     console.log('productdetails no provider', productdetails)
    
    useEffect(() => {
        console.log("useEffect foi disparado!");

        const fetchProdutosApi = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/get/produtos');
                if (!response.ok) {
                    throw new Error(`Erro: ${response.statusText}`);
                }
                const data = await response.json();
                if (data && Array.isArray(data)) {
                    const produtosUnicos = data.filter((produto, index, self) => 
                        index === self.findIndex((p) => (
                            p.idProdutoPai === produto.idProdutoPai
                        ))
                    );
                    setProdutosApi(produtosUnicos);
                } else {
                    throw new Error("A resposta não contém dados válidos.");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };  

        fetchProdutosApi();
    }, []);


    
    useEffect(() => {
        const fetchDepositoApi = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/get/deposito');
                if (!response.ok) {
                    throw new Error(`Erro: ${response.statusText}`);
                }
                const data = await response.json();
                console.log('DEPOSITO INFOS:', data)
                if(data.sucess) {
                    setDepositoId(data);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };  
        fetchDepositoApi();
     }, []);


     useEffect(() => {
        console.log('Useeffect do banco de dados disparado');

        const fetchProductsDB = async () => {
          try {              
                const response = await fetch(`http://localhost:3000/api/post/update/estoque/bling`, {
                    method: 'POST',
                    body:JSON.stringify({
                        
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${process.env.API_KEY}`
                    },
                });

                if (!response.ok) {
                    throw new Error('Erro ao buscar dados');
                }

                const data = await response.json();

                if (data.success) {
                    setProdutosDb(data.data);
                } else {
                    setError(data.message);
                }

            } catch (err) {
               setError(err.message);
            } 
        };
        fetchProductsDB();
 }, []);


    //   useEffect(() => {
    //          console.log('Useeffect do banco de dados disparado');
    
    //          const fetchProductsDB = async () => {
    //            try {              
    //                  const response = await fetch(`http://localhost:3000/api/get/infoprodpai`, {
    //                      method: 'POST',
    //                      headers: {
    //                          'Content-Type': 'application/json',
    //                     },
    //                  });
    
    //                  if (!response.ok) {
    //                      throw new Error('Erro ao buscar dados');
    //                  }
    
    //                  const data = await response.json();
    
    //                  if (data.success) {
    //                      setProdutosDb(data.data);
    //                       console.log('produtos do db no provider', data);
    //                  } else {
    //                      setError(data.message);
    //                  }
    
    //              } catch (err) {
    //                 setError(err.message);
    //              } finally {
    //                  setLoading(false);
    //            }
    //          };
    
    //          fetchProductsDB();
    //   }, []);




    useEffect(() => {
    
          const fetchAllProductDB = async () => {
              try {              
                const response = await fetch(`http://localhost:3000/api/get/infoallprod`, {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json',
                      },
                  });
    
                  if (!response.ok) {
                      throw new Error('Erro ao buscar dados');
                 }
    
                  const data = await response.json();
    
                  if (data.success) {
                     setAllProdutosDb(data.data);
                     console.log('produtos do db no provider', data);
                  } else {
                      setError(data.message);
                  }
    
              } catch (err) {
                  setError(err.message);
              } finally {
                  setLoading(false);
              }
          };
    
          fetchAllProductDB();
    }, []);



    // useEffect(() => {
    //     console.log('UseEffect renderitenscarrinho disparado!');

    //     const userid = 5
    
    //     const fetchRenderItensCarrinho = async () => {
    //         try {              
    //             const response = await fetch('http://localhost:3000/api/post/renderitenscarrinho', {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify({
    //                     userid: userid
    //                 })
    //             });
    
    //             if (!response.ok) {
    //                 throw new Error('Erro ao buscar produtos no carrinho');
    //             }
    
    //             const data = await response.json();
    
    //             if (data.success) {
    //                 setProdutosOnCarrinho(data.items);
    //                 console.log('produtosoncarrinho no frontend:', produtosoncarrinho)
    //                 console.log('produtos no carrinho:', data);
    //             } else {
    //                 setError(data.message);
    //             }
    
    //         } catch (err) {
    //             setError(err.message);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    
    //     fetchRenderItensCarrinho();
    // }, []);


    const fetchProductDetails = async (id) => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:3000/viewproduct/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });

            if (!response.ok) throw new Error('Erro ao buscar detalhes');
            
            const data = await response.json();
            if (data.success) {
                setProductDetails(data.data);
            }
        } catch (err) {
            console.error(err.message);
        } finally {
            setTimeout(() => {
                setLoading(false);
            } , 3000)
        }
    };

    useEffect(() => {
        if (!dadosuserlogon?.id) return;

        const handleReturnPedido = async () => {
            try {
            const response = await fetch('http://localhost:3000/api/get/infospedido', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userid: dadosuserlogon.id,
                })
            });
        
            const data = await response.json();
    
            if(response.ok) {
                console.log('PEDIDO EFETUADO COM SUCESSO')
                setUserPedido(data.data)
            }
            if (!response.ok) {
                throw new Error('Erro ao processar pagamento');
            }

            } catch (err) {
            console.log(err.message);
            }
        }

        handleReturnPedido();

    }, [dadosuserlogon]);


    useEffect(() => {
        if (!dadosuserlogon?.id) return;

        const fetchGetFavoritesprods  = async () => {
            
            const userid =  dadosuserlogon.id

            try {
                const response = await fetch(`http://localhost:3000/api/get/addfavoriteprod`, {
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json',
                    },
                    body: JSON.stringify({
                        userid: userid
                    })
                })

                if (!response.ok) {
                    throw new Error('Erro ao buscar dados');
                }
    
                const data = await response.json();

                // console.log('resposta da API: ', data);
    
                if (data.success && data.data.length > 0) {  
                    setaddonfavorite(data.data);
                } else {
                    setaddonfavorite([]);
                }
    
            } catch (err) {
                return console.log(err.message)
            }
        };

        fetchGetFavoritesprods();
    }, [dadosuserlogon])


    useEffect(() => {
        if (!dadosuserlogon?.id) return;

        const fetchRenderItensCarrinho = async () => {
            const userid = dadosuserlogon.id
            try {
            const response = await fetch(`http://localhost:3000/api/post/renderitenscarrinho`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    userid: userid
                }),
            });
    
            const data = await response.json();
            console.log("Itens recebidos do backend:", data.items);
            // console.log(data)
            if (data.success) {
                // console.log(data.items)
                setProdutosOnCarrinho(data.items);
                
            } else {
                console.error('Erro ao carregar os itens do carrinho');
            }
            } catch (error) {
            console.error('Erro:', error);
            }
        };
    
        fetchRenderItensCarrinho();
    }, [dadosuserlogon]);


    useEffect(() => {

        if (!dadosuserlogon?.id) return;

        const fetchGetEnderecos  = async () => {
            
            try {
                const response = await fetch(`http://localhost:3000/api/get/userenderecos`, {
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json',
                    },
                    body: JSON.stringify({
                        userid: dadosuserlogon.id,
                    })
                })

                if (!response.ok) {
                    throw new Error('Erro ao buscar dados');
                }
    
                const data = await response.json();

                // console.log('resposta da API: ', data);
    
                if (data.success && data.data.length > 0) {  
                    setUserEnderecos(data.data);
                } 
            } catch (err) {
                return console.log(err.message)
            }
        };

        fetchGetEnderecos();
    }, [dadosuserlogon])


    useEffect(() => {
        console.log('GET IMAGENS DISPARADO');
    
        const fetchProductsDB = async () => {
            try {              
                const response = await fetch(`http://localhost:3000/api/get/imgs`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
    
                if (!response.ok) {
                    throw new Error('Erro ao buscar imagens');
                }
    
                const data = await response.json();
    
                if (data.success) {
                    setProdutosDb(data.data);
                    // console.log('imagens recuperada do banco de dados', data);
                } else {
                    setError(data.message);
                }
    
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
    
        fetchProductsDB();
    }, []);



    // console.log('imagens do produto:', imagensprod);
    // console.log('produtos API no provider', produtosapi);
    // console.log('produtos DB no provider', produtosdb);
    // console.log('produto com imagem:', produtosdbImgandProd)

    const value = {

        // produtosapi,
        fetchProductDetails,
        produtosdb,
        loading,
        setLoading,
        error,
        Dadosnewuser,
        setDadosNewUser,
        novocomentario,
        setNovocomentario,
        productdetails, 
        setProductDetails,
        produtoid, 
        setProdutoId,
        produtosoncarrinho,
        setProdutosOnCarrinho,
        addonfavorite, 
        setaddonfavorite,
        dadosuserlogon, 
        setDadosUserLogOn,
        configitens,
        setConfigItens,
        searchitem,
        setSearchitem,
        showingpageclicked,
        setShowingpageclicked,
        produtossearched,
        setProdutosSearched,
        prodsearchbar,
        setProdsearchbar,
        newendereco, 
        setNewEndereco,
        userenderecos,
        setUserEnderecos,
        infocartão,
        setInfoCartão,
        dadosuserlogin, 
        setDadosUserLogin,
        idproductview, 
        setIdProductView,
        resumopedido, 
        setResumoPedido,
        freteSelecionado, 
        setFreteSelecionado,
        allprodutosdb, 
        setAllProdutosDb,
        userpedido,
        setUserPedido,
        observacoespedido,
        setObservacoesPedido,
        depositoid,
        setDepositoId

    }
    return (
        <ContextProducts.Provider value={ value }>
            {children}
        </ContextProducts.Provider>
    );
};

Provider.propTypes = {
children: propTypes.any,
}.isRequired;