import { useState, useEffect } from 'react';
import ContextProducts from './ContextProduct';
import propTypes from 'prop-types';
import { jwtDecode } from "jwt-decode";




export default function Provider ({ children }) {

    const [produtosapi, setProdutosApi] = useState([]);

    const [produtosdb, setProdutosDb] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    const [configitens, setConfigItens] = useState({
        codigo: '',
        tamanho: '',
        cor: '',
        descricao: ''
    })

    const [searchitem, setSearchitem] = useState('');

    const [novocomentario , setNovocomentario] = useState({
        title:'',
        description: '',
        avaliacao: ''
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
        endereco:'',
        numero:'',
        bairro:'',
        cidade:'',
        pais: ''
    });


    const [dadosuserlogin, setDadosUserLogin] = useState ({
        email: '',
        senha: ''
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

    const [productdetails, setProductDetails] = useState({});

    const [produtoid, setProdutoId] = useState('');

    const [addonfavorite, setaddonfavorite] = useState([]);

    const [produtosoncarrinho , setProdutosOnCarrinho] = useState([]);

    const [showingpageclicked, setShowingpageclicked] = useState(null);

    const [produtossearched, setProdutosSearched] = useState([]);
    
    const [prodsearchbar, setProdsearchbar] = useState([]);

    // console.log('productdetails no provider', productdetails)
   
    //  useEffect(() => {
    //      console.log("useEffect foi disparado!");
    
    //      const fetchProdutosApi = async () => {
    //          try {
    //              const response = await fetch('http://localhost:3000/api/get/produtos');
    //              if (!response.ok) {
    //                  throw new Error(`Erro: ${response.statusText}`);
    //              }
    //              const data = await response.json();
    //              if (data && Array.isArray(data)) {
    //                  const produtosUnicos = data.filter((produto, index, self) => 
    //                      index === self.findIndex((p) => (
    //                          p.idProdutoPai === produto.idProdutoPai
    //                      ))
    //                  );
    //                  setProdutosApi(produtosUnicos);
    //              } else {
    //                  throw new Error("A resposta não contém dados válidos.");
    //              }
    //          } catch (err) {
    //              setError(err.message);
    //          } finally {
    //              setLoading(false);
    //          }
    //      };  
    
    //      fetchProdutosApi();
    //  }, []);


    useEffect(() => {
        console.log('Useeffect do banco de dados disparado');
    
        const fetchProductsDB = async () => {
            try {              
                const response = await fetch(`https://torcidavipoficial-teste.onrender.com/api/get/infosprod`, {
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
                    setProdutosDb(data.data);
                    // console.log('produtos do db no provider', data);
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


    useEffect(() => {
        console.log('GET IMAGENS DISPARADO');
    
        const fetchProductsDB = async () => {
            try {              
                const response = await fetch(`https://torcidavipoficial-teste.onrender.com/api/get/imgs`, {
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
        produtosapi,
        produtosdb,
        loading,
        error,
        Dadosnewuser,
        setDadosNewUser,
        dadosuserlogin,
        setDadosUserLogin,
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