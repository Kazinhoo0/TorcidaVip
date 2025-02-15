import { useState, useEffect } from 'react';
import ContextProducts from './ContextProduct';
import propTypes from 'prop-types';



export default function Provider ({ children }) {

    const [produtosapi, setProdutosApi] = useState([]);

    const [produtosdb, setProdutosDb] = useState([]);

    const [produtosdbImgandProd, setProdutosdbImgandProd ] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

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

    const [productdetails, setProductDetails] = useState({});

    const [produtoid, setProdutoId] = useState('');

    console.log('productdetails no provider', productdetails)
   
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
                const response = await fetch('http://localhost:3000/api/get/infosprod', {
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
    
        fetchProductsDB();
    }, []);

    useEffect(() => {
        console.log('GET IMAGENS DISPARADO');
    
        const fetchProductsDB = async () => {
            try {              
                const response = await fetch('http://localhost:3000/api/get/imgs', {
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
                    console.log('imagens recuperada do banco de dados', data);
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
    console.log('produto com imagem:', produtosdbImgandProd)

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
        produtosdbImgandProd,
        productdetails, 
        setProductDetails,
        produtoid, 
        setProdutoId
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