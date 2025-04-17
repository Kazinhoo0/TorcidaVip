const express = require('express');
const app = express();
app.use(express.json());
const uploadUser = require('./middlewares/uploadimage');
const upload = require('./middlewares/uploadimage');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const mercadopago = require('mercadopago');
const {Payment, MercadoPagoConfig}  = require('mercadopago');


// Configuração do banco de dados MySQL
console.log ('API KEY', process.env.API_KEY)
const db = require('./Database/db');
const { error } = require('console');
const { useContext } = require('react');
const { default: ContextProducts } = require('./context/ContextProduct');


app.use(cors({
  origin: ['https://torcidavipoficial-teste.onrender.com/','https://torcidavip.com','http://localhost:3000'],
  methods: ['POST', 'GET', 'DELETE', 'PUT'],
  credentials: true,

}))

app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const client = new mercadopago.MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_PUBLIC_KEY,
  options: { sandbox: true }
});

// const payment = new Payment(client);

const saveProdutosToDB = async (produtos) => {
  try {
    for (const produto of produtos) {
      const { 
        precoCusto, 
        formato, 
        nome, 
        tipo, 
        codigo, 
        descricaoCurta, 
        preco, 
        idProdutoPai
      } = produto;

      const safePrecoCusto = precoCusto || null; 
      const safeFormato = formato || ''; 
      const safeNome = nome || ''; 
      const safeTipo = tipo || '';  
      const safeCodigo = codigo || '';
      const safeDescricaoCurta = descricaoCurta || ''; 
      const safePreco = preco || 0;
      const safeEstoque = produto.estoque && produto.estoque.saldoVirtualTotal !== undefined 
        ? produto.estoque.saldoVirtualTotal 
        : 0; 
        const safeIdProdutopai = idProdutoPai !== undefined ? idProdutoPai : null; 
      
      // Log para depuração
      console.log(`Processando produto: ${safeNome} (Código: ${safeCodigo})`);

      // Verifica se o produto já existe no banco
      const [rows] = await db.execute('SELECT nome, codigo FROM Produtos WHERE nome = ? OR codigo= ?', [safeNome,safeCodigo]);

     if (rows.length > 0) {
       // Atualiza o produto se já existir
       console.log(`Produto ${safeCodigo} já existe. Atualizando...`);
        await db.execute(`
          UPDATE Produtos 
          SET descricaolonga = ?, preco = ?, estoque = ?
          WHERE codigo = ?
    `, [safeDescricaoCurta, safePreco, safeEstoque, safeCodigo]);
     } else {
     // Insere um novo produto
        console.log(`Produto ${safeCodigo} não encontrado. Inserindo...`);
        await db.execute(`
          INSERT INTO Produtos (precocusto, formato, nome, tamanho, codigo, descricaolonga, preco, estoque, idprodutopai) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [safePrecoCusto, safeFormato, safeNome, safeTipo, safeCodigo, safeDescricaoCurta, safePreco, safeEstoque, safeIdProdutopai]);
     }

    }
  } catch (err) {
    console.log(err)
  }
}


// app.get('/api/get/produtos', async (req, res) => {
//   try {
//     let allProducts = [];
//     for (let cont = 1; cont <= 4; cont++) {
//       const response = await fetch(`https://api.bling.com.br/v3/produtos?pagina=${cont}`, {
//         method: 'GET',
//         headers: {
//             Authorization: `Bearer ${process.env.API_KEY}`
//         }
//       });

//       if (!response.ok) {
//           throw new Error(`Erro ao acessar a API do Bling: ${response.status} - ${response.statusText}`);
//       }
//       const data = await response.json();

//       if (!data || !data.data) {
//         console.log(`Página ${cont} não contém produtos ou o formato da resposta é inesperado`);
//         break; // Sair do loop se não houver mais dados
//       }

//       if (!data) {
//         throw new Error('Resposta da API do Bling não contém produtos');
//       }
//       await saveProdutosToDB(data.data);

//       console.log('Dados da resposta:', data);
//       allProducts = allProducts.concat(data.data);
//     }

//     res.json(allProducts);

//     } catch (error) {
//       console.error('Erro:', error.message);
//       res.status(500).json({ error: 'Erro ao acessar a API do Bling' });
//     }    
    
//  });


  app.get('/api/get/deposito', async (req, res) => {
    try {
      const response = await fetch('https://api.bling.com.br/Api/v3/depositos', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`
        }

      });

      if (!response.ok) {
        throw new Error(`Erro ao acessar a API do Bling: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();

      if (!data) {
        throw new Error('Resposta da API do Bling não contém produtos');
      }
      console.log('Dados do deposito:', data);
      res.json(data.data);
    } catch (error) {
      console.error('Erro:', error.message);
      res.status(500).json({ error: 'Erro ao acessar a API do Bling' });
    }
  });

   app.post('/api/post/notasfiscais', async (req, res) => {

   const {userid, totalpedido, produtosoncarrinho, observacoes, dadosuserlogon} = req.body

   // Verificar cada campo individualmente
   if (!userid) console.error("Campo userid não informado");
   if (!totalpedido) console.error("Campo totalpedido não informado");
   if (!produtosoncarrinho) console.error("Campo produtosoncarrinho não informado");
   if (!observacoes) console.error("Campo observacoes não informado");
   if (!dadosuserlogon) console.error("Campo dadosuserlogon não informado");

   if (!userid || !totalpedido || !produtosoncarrinho || !observacoes || !dadosuserlogon) {
    return res.status(400).json({
      success: false,
      message: 'Todos os campos são obrigatórios'
    })
   }
   
    const queryGetInfosEndereco = `SELECT * FROM enderecos WHERE user_id = ? `

   try {
    const [resultEndereco] = await db.query(queryGetInfosEndereco, [userid]);

    if(!resultEndereco || resultEndereco.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Endereço nao encontrado para esse usuário'
      })
    }

    console.log("Endereço encontrado:", resultEndereco[0]);

    const itens = produtosoncarrinho.map(produto => {
      return {
        codigo: produto.codigo,
        descricao: produto.nome || "Produto",
        unidade: "UN",
        quantidade: Number(produto.quantidade),
        valor: Number(produto.preco),
        tipo: "P", 
        origem: 0,  
        informacoesAdicionais: observacoes.substring(0, 100)
      };
    });

    
    const response = await fetch('https://api.bling.com.br/Api/v3/nfe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.API_KEY}`
        },
        body: JSON.stringify({
          tipo: 1,
          dataOperacao: new Date().toISOString().replace('T', ' ').substring(0, 19),
          contato: {
            nome:dadosuserlogon.nome + dadosuserlogon.sobrenome,
            tipoPessoa: 'F',
            numeroDocumento:dadosuserlogon.cpf,
            contribuinte: 9,
            telefone:dadosuserlogon.telefone,
            email:dadosuserlogon.email,
            endereco: {
              endereco:resultEndereco[0].endereco,
              numero:resultEndereco[0].numero,
              complemento:resultEndereco[0].complemento,
              bairro:resultEndereco[0].bairro,
              cep:resultEndereco[0].cep,
              municipio:resultEndereco[0].estado
            }
          },
          itens : itens
        })
      });

      const data = await response.json();

      console.log('NOTA FISCAL:' , data);
      console.log('Resposta bling, nota fiscal: ',data)
      
      if (!response.ok) {
        throw new Error(`Erro na API Bling: ${response.status} - ${JSON.stringify(data)}`);
      }

      res.status(200).json({
        success: true,
        data: data,
        message: 'Nota fiscal criada com sucesso'
      })

     } catch (error) {
      console.log('Erro', error);
      res.status(500).json({
      success: false,
      message: error.message || "Erro ao criar nota fiscal"
    });
     }
   });


app.post('/api/post/upload/estoques',  async (req,res) => {

    const {produtosoncarrinho} = req.body

    console.log('produtosoncarrinho:', produtosoncarrinho, 'depositoid:')

    if(!produtosoncarrinho) {
      return res.status(400).json({
        success: false,
        message:"é obrigatório que todos os campos estejam preechidos "
      })
    }

    try {
      const resultados = [];

       for (const produto of produtosoncarrinho) {
          const quantidadeSaida = parseFloat(produto.quantidade).toFixed(2);

          const response = await fetch(`https://api.bling.com.br/Api/v3/estoques`, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              Authorization: `Bearer ${process.env.API_KEY}`

            },
            body: JSON.stringify({
              produto: {
                id: produto.idproduto
              },
              deposito: {
                id: 12117381634
              },
              operacao: 'S',
              quantidade: quantidadeSaida

            })
          });

          const data = await response.json();
          resultados.push(data);
          
          if (!response.ok) {
            throw new Error(`Erro na API Bling: ${response.status} - ${JSON.stringify(data)}`);
          }
       } 

      res.status(200).json({
        success: true,
        message: "Estoques atualizados com sucesso",
        data: resultados
      });
      
    } catch (err) {
      console.log('Erro', err);
      res.status(500).json({
      success: false,
      message: err.message || "Erro ao atualizar estoques"
    });
    }  
})

app.post('/api/post/sucessocompra' , async (req,res) => {

  const {userid, totalpedido, produtosoncarrinho, observacoes, depositoid} = req.body;

  // const operacao = 'S'
  // const tipo = 'P'
  // const situacao = 'A'
  // const formato = 'S'

  console.log('Itens na api sucessocompra: ',userid, totalpedido, produtosoncarrinho, observacoes, depositoid)

  if(!userid || !totalpedido || !produtosoncarrinho || !depositoid) {
    return res.status(400).json({success: false, message:'Todos os campos são obrigatórios'})
  }
 
  try{

    for (const produto of produtosoncarrinho) {
      // const produtosJSON = JSON.stringify(produtosoncarrinho);
      const queryNovoPedido = 'INSERT INTO Pedidos (userid,totalpedido,quantidade, observacoes, itemid,nomeitem,preco,marca,estoque,tamanho,thumbnail,idproduto) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)'
      await db.query(queryNovoPedido, [
        userid,
        totalpedido,
        produto.quantidade,
        produto.observacoes, 
        produto.itemid,
        produto.nomeitem, 
        produto.preco,
        produto.marca, 
        produto.estoque,
        produto.tamanho,
        produto.thumbnail,
        produto.idproduto
      ])
    }
    
    for (const produto of produtosoncarrinho) {
      const queryRemoveitenscarrinho = 'DELETE FROM carrinho_compras WHERE userid = ? AND nomeitem = ? '
      await db.query(queryRemoveitenscarrinho, [userid, produto.nomeitem])


      // handleupdateestoque(produto.idproduto, produto.preco,depositoid);

    //   fetch(`https://api.bling.com.br/Api/v3/estoques`, {
    //     method: 'POST',
    //     headers: { 
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${process.env.API_KEY}` 
    //     },
    //     body: JSON.stringify({
    //       estoque: {
    //         produto: {
    //           id: produto.idproduto,
    //           codigo: '003006090105'
    //         },
    //         deposito: {
    //           id: depositoid
    //         },
    //         operacao: 'S',
    //         preco: produto.preco,
    //         custo: 60.80,
    //         quantidade: 1.00,
    //         observacoes: 'teste'
    //       }
    //     })
    //  });
      // const calculoestoque = parseFloat(produto.estoque) - parseFloat(produto.quantidade);
      
      // await fetch(`https://api.bling.com.br/Api/v3/estoques`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     produto: {
      //       id: produto.idproduto
      //     },
      //     deposito: {
      //       id: depositoid
      //     },
      //     operacao: 'S',
      //     quantidade: 1.00
      //   })
      // });


      const queryAtualizaEstoque = 'UPDATE Produtos SET estoque = estoque - ? WHERE idproduto = ?';
      await db.query(queryAtualizaEstoque, [produto.quantidade, produto.idproduto]);
    }
   
    res.status(200).json({         
      success: true,
      message:'Pedido efetuado com sucesso',
    })


  } catch (err) {
    console.error('Erro:', err)
    res.status(500).json({ error: 'Erro no servidor' });
  }

});

// Configuração para servir os arquivos estáticos do React
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.post('/api/get/infoprodpai', async (req, res) => {
    try {
        const query = `SELECT * FROM Produtos WHERE idprodutopai IS NULL`;
        const [rows] = await db.execute(query); 

        if (rows.length > 0) {
            res.status(200).json({
                success: true,
                message: "Produtos retornados com sucesso!",
                data: rows,
            });
          } else {
          return res.status(404).json({
            success: false,
            message: "Nenhum produto encontrado",
          });
    }
  } catch (erro) {
    console.error(error)
  }
});



app.post('/api/get/infoallprod', async (req, res) => {
  try {
      const query = `SELECT * FROM Produtos WHERE idprodutopai IS NOT NULL`;
      const [rows] = await db.execute(query); 

      if (rows.length > 0) {
          res.status(200).json({
              success: true,
              message: "Produtos retornados com sucesso!",
              data: rows,
          });
        } else {
        return res.status(404).json({
          success: false,
          message: "Nenhum produto encontrado",
        });
  }
} catch (erro) {
  console.error(error)
}
});


app.post('/api/login', async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
      return res.status(400).json({ success: false, message: 'Email e senha são obrigatórios' });
  }

  try {
      // Consulta o usuário pelo email
      const queryLoginUser = `SELECT * FROM users WHERE email = ?`;
      const [rows] = await db.query(queryLoginUser, [email]);

      if (rows.length === 0) {
          return res.status(400).json({ success: false, message: 'Email não encontrado' });
      }

      const user = rows[0];

      // Garante que a senha existe no banco
      if (!user.senha) {
          console.error('Senha ausente para o usuário:', user);
          return res.status(500).json({ success: false, message: 'Erro interno: senha não encontrada' });
      }

      // Compara a senha informada com a senha criptografada no banco
      const isPasswordValid = bcrypt.compareSync(senha, user.senha);

      if (!isPasswordValid) {
          return res.status(400).json({ success: false, message: 'Senha incorreta' });
      }

      // Gera um token JWT
      const secretKey = process.env.JWT_KEY; 
      const token = jwt.sign({ id: user.id, email:user.email, nome: user.nome, sobrenome: user.sobrenome, cpf:user.cpf, telefone:user.telefone}, secretKey, { expiresIn: '1h' });

      res.status(200).json({
          success: true,
          id: user.id,
          token: token,
          email: user.email,
          nome: user.nome,
          message: 'Login bem-sucedido',
          sobrenome: user.sobrenome,
          cpf: user.cpf,
          telefone: user.telefone
      });

  } catch (error) {
      console.error('Erro na rota de login:', error);
      res.status(500).json({ success: false, message: 'Erro interno no servidor' });
  }
});


app.post('/api/register', async (req, res) => {
  const { nome , sobrenome , senha , confirmarsenha , email, tipoendereco, destinatario, bairro, cep, endereco, numero, cidade, pais, cpf, telefone } = req.body;

  console.log('body criação de nova conta:', req.body);

  // Verifica se todos os campos estão presentes
  if (!nome || !sobrenome || !senha || !confirmarsenha || !email || !tipoendereco || !destinatario || !bairro || !cep || !endereco || !numero || !cidade || !pais || !cpf || !telefone) {
    return res.status(400).json({ error: 'Preencha todos os campos obrigatórios.' });
  }

  // Verifica se as senhas coincidem
  if (senha != confirmarsenha) {
    return res.status(400).json({ error: 'As senhas não coincidem.' });
  }

  // Criptografa a senha
  const hashedPassword = bcrypt.hashSync(senha, 10);
  console.log('Senha criptografada:', hashedPassword);

  try {
    // Verifica se o email já existe no banco de dados
    const queryCheckEmail = `SELECT email FROM users WHERE email = ?`;
    const [rows] = await db.query(queryCheckEmail, [email]);

    if (rows.length > 0) {  
      return res.status(400).json({ success: false, error: 'Já existe uma conta criada com este email.' });
    }

    // Insere o novo usuário no banco de dados
    const queryInsertNewuser = `INSERT INTO users (nome, sobrenome, email, senha, cpf, telefone) VALUES ( ?, ?, ?, ?, ?, ? )`;
    const [result] = await db.query(queryInsertNewuser, [nome, sobrenome, email, hashedPassword,cpf, telefone]);

    const userId = result.insertId

    const queryInsertNewEndereco = `INSERT INTO enderecos (user_id, tipo, bairro, endereco, cidade , pais ,numero , destinatario, cep) VALUES ( ? ,? ,? ,? ,? ,? ,?, ?, ? )`;
    await db.query(queryInsertNewEndereco, [userId, tipoendereco, bairro ,endereco ,cidade ,pais , numero , destinatario , cep]);

    res.status(200).json({ success: true, message: 'Usuário registrado com sucesso!' });

  } catch (err) {
    console.error('Erro ao acessar o banco de dados:', err);
    res.status(500).json({ success: false, error: 'Erro ao registrar o usuário.' });
  }
});


app.post('/api/add/newcomment', upload.array('image', 10), async (req, res) => {

  const {userid,idproduto , title , description, avaliacao} = req.body;
  
  console.log('req.body no backend:', req.body);
  console.log(idproduto);
  

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({error: 'nenhuma imagem encontrada'})
  }


  if (!idproduto) {
    return res.status(400).json({ error: 'idprodutopai é obrigatório' });
  }

  try {
    // Cria um array de URLs das imagens
    const imagensUrls = req.files.map(file => `/uploads/${file.filename}`);

    // Para adicionar cada imagem ao banco associada ao idprodutopai
    for (const caminho of imagensUrls) {
      const queryInsertNewComment = 'INSERT INTO comentarios (titulo, descricao ,user_id, produto_id , userimgprod, avaliacao) VALUES (?, ? , ? , ?, ?, ?)';
      await db.execute(queryInsertNewComment, [title, description , userid, idproduto, caminho, avaliacao]);
    }

    console.log('Imagens salvas no banco de dados');
    
    return res.json({
      erro: false,
      mensagem: 'Comentário enviado com sucesso!',
      imagens: imagensUrls
    });

  } catch {
    console.error(error)
    return res.status(500).json({erro: true , mensagem: 'Erro ao salvar imagens'})
  }

});


app.post('/api/get/infocomments', async (req, res) => {

  const {idproduto} = req.body;

  try {
      const queryGetComments = `
      SELECT * FROM comentarios WHERE produto_id = ? 
      `;
      
      const [rows] = await db.execute(queryGetComments, [idproduto]); 

      if (rows.length > 0) {
          return res.status(200).json({
              success: true,
              message: "comentários retornados com sucesso!",
              data: rows,
          });
      } else {
          return res.status(404).json({
              success: false,
              message: "Nenhum comentário encontrado",
          });
      }
  } catch (erro) {
      console.error("Erro ao buscar comentários:", erro);
      return res.status(500).json({
          success: false,
          message: "Erro interno do servidor",
          error: erro.message
      });
  }
});


app.post('/upload-image', uploadUser.single('image'), async (req, res) => {

    console.log(req.file)

    const {filename} = req.file;

    try {
        const query = 'INSERT INTO users (imgprofile) VALUES (?) ';
        await db.execute(query, [filename])

        console.log('Upload Salvo no banco de dados!')
        return res.json ( {
            erro:false,
            mensagem: 'Upload realizado com sucesso!'
        })
    } catch (error) {
        console.error('Erro ao adicionar imagem ao banco de dados', error)
        return res.json ( {
            erro:true,
            mensagem: 'Erro ao salvar no banco de dados!'
        })
    }

})


// app.get('/api/get/prodandimg', (req, res) => {
//   const query = `SELECT 
//     p.id, 
//     p.nome, 
//     p.preco, 
//     i.caminho AS imagem
//   FROM 
//     Produtos p
//   LEFT JOIN 
//     imagensprod i ON p.id = i.produto_id`;

//   db.query(query, (err, results) => {
//     if (err) {
//       return res.status(500).json({ success: false, message: 'Erro ao buscar produtos', error: err });
//     }
//     // Retornar dados com a estrutura esperada no front-end
//     res.json({ success: true, data: results });
//   });
// });


app.post('/api/get/imgs', async (req, res) => {
  try {
      const query = `
        SELECT 
        p.id AS produto_id, 
          p.nome, 
          p.preco,
          p.estoque, 
          i.caminho AS imagem
        FROM Produtos p
        LEFT JOIN imagensprod i ON p.id = i.produto_id
        WHERE p.idprodutopai IS NULL;
      `;
      
      const [rows] = await db.execute(query); 

      if (rows.length > 0) {
          return res.status(200).json({
              success: true,
              message: "Produtos retornados com sucesso!",
              data: rows,
          });
      } else {
          return res.status(404).json({
              success: false,
              message: "Nenhum produto encontrado",
          });
      }
  } catch (erro) {
      console.error("Erro ao buscar produtos:", erro);
      return res.status(500).json({
          success: false,
          message: "Erro interno do servidor",
          error: erro.message
      });
  }
});


app.post('/upload-image/product', upload.array('image', 10), async (req, res) => {

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({error: 'nenhuma imagem encontrada'})
  }

  const {idproduto} = req.body;

  if (!idproduto) {
    return res.status(400).json({ error: 'idprodutopai é obrigatório' });
  }

  try {
    // Cria um array de URLs das imagens
    const imagensUrls = req.files.map(file => `/uploads/${file.filename}`);

    // Para adicionar cada imagem ao banco associada ao idprodutopai
    for (const caminho of imagensUrls) {
      const query = 'INSERT INTO imagensprod (caminho, produto_id) VALUES (?, ?)';
      await db.execute(query, [caminho, idproduto]);
    }

    console.log('Imagens salvas no banco de dados');
    
    return res.json({
      erro: false,
      mensagem: 'Imagens enviadas e salvas',
      imagens: imagensUrls
    });

  } catch {
    console.error(error)
    return res.status(500).json({erro: true , mensagem: 'Erro ao salvar imagens'})
  }

});


app.post('/viewproduct/:id', async (req, res) => {
  const { id } = req.params;  

  console.log('id backend: ',id)
  try {
      const query =
       `SELECT 
          p.id AS produto_id, 
          p.nome, 
          p.preco,
          p.marca,
          p.idproduto, 
          p.codigo,
          p.descricaolonga,
          p.descricaodetalhada,
          p.cor,
          i.caminho AS imagem
      FROM Produtos p
      LEFT JOIN imagensprod i ON p.id = i.produto_id
      WHERE p.idprodutopai IS NULL
        AND p.id = ?;`;
        
      const [rows] = await db.execute(query, [id]); 

      if (rows.length > 0) {
          res.status(200).json({
              success: true,
              message: "Produtos retornados com sucesso!",
              data: rows,
          });
      } else {
          return res.status(404).json({
              success: false,
              message: "Nenhum produto encontrado",
          });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({
          success: false,
          message: "Erro interno do servidor"
      });
  }
});


app.post('/api/post/renderitenscarrinho' , async (req,res) => {

  const {userid} = req.body;

  if (!userid) {
    return res.status(400).json({err: 'erro ao buscar o userid'})
  };

  console.log('render itenscarrinho userid', userid)

  try {

    const queryGetItensCarrinho = `SELECT * FROM carrinho_compras WHERE userid = ?`
    const [result] = await db.query(queryGetItensCarrinho, [userid])
    // console.log("Resultado da query:", result);

    res.status(200).json({ 
      success: true,
      message:'itens retornados com sucesso', 
      items: result
    })
   

  } catch (err) {
    console.error('Erro ao buscar itens do carrinho:', err)
    res.status(500).json({success: false , message: err.message})
  };
})


app.post('/api/post/additemcarrinho', async (req, res) => {

  const {
    userid,
    itemid,
    nomeitem,
    preco,
    thumbnail,
    tamanho, 
    marca, 
    estoque,
    quantidade,
    idproduto,
    codigo
  } = req.body;

  console.log({
    userid: userid,
    itemid: itemid,
    nomeitem: nomeitem,
    preco: preco,
    thumbnail: thumbnail,
    tamanho: tamanho,
    marca: marca,
    estoque: estoque,
    quantidade: quantidade,
    idproduto: idproduto,
    codigo: codigo
  });
  
  if (!userid || !itemid || !nomeitem || !preco || !thumbnail || !tamanho || !marca || !estoque || !quantidade || !idproduto || !codigo) {
      return res.status(400).json({error: 'Todos os campos precisam ser preenchidos'})
  }


  try {

    const queryCheckItemCarrinho = `SELECT itemid FROM carrinho_compras WHERE userid = ? AND itemid = ?`
    const [resultcheck] = await db.query(queryCheckItemCarrinho, [userid, itemid]);

    console.log('resultado do check:', resultcheck)

    if (resultcheck.length > 0) { 
      return res.status(400).json({ success : false, message: 'Item já existe no banco de dados' });
    }

    const queryAddItemCarrinho = `INSERT INTO carrinho_compras (itemid , nomeitem , preco , thumbnail , userid, tamanho, marca, estoque, quantidade, idproduto, codigo) VALUES (?,?,?,?,?,?,?,?,?,?,?)`
    const result = await db.query(queryAddItemCarrinho, [itemid , nomeitem , preco, thumbnail, userid, tamanho, marca, estoque, quantidade, idproduto, codigo]);

    return res.status(201).json({
      success: true,
      message: 'Item adicionado ao carrinho!',
      body: result
    })

    } catch (err) {
      console.error('Erro:', err)
      res.status(500).json({success:false, error: err.message })
    }

})


app.post('/api/post/removeitemcarrinho', async (req, res) => {
  const { userid, itemid } = req.body;

  console.log('Userid para remover:', userid);
  console.log('itemid para remover:', itemid);

  // Verifica se todos os campos estão presentes
  if (!itemid || !userid) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  try {
    // Insere os itens comprados no banco de dados
    const querydeleteitem = `DELETE FROM carrinho_compras WHERE userid = ? AND itemid = ?  `;
    await db.query(querydeleteitem, [userid, itemid]);

    res.status(200).json({ success: true, message: 'Item removido com sucesso!' });

  } catch (err) {
    console.error('Erro:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});


app.post('/api/post/addfavoriteprod' , async (req,res) => {
  
  const {userid ,itemid, imgprod, title} = req.body;

  console.log(userid,itemid,imgprod,title);

  console.log('userid addonfavorite:' , userid)

  if (!itemid || !imgprod || !title) {
    return res.status(500).json({message: 'todos os campos precisam ser preenchidos'})
  }

  try {

    const queryCheckItemFavorite = `SELECT itemid FROM produtos_favoritos WHERE user_id = ? AND itemid = ?`
    const [resultcheck] = await db.query(queryCheckItemFavorite, [userid, itemid]);

    console.log('resultado do check:', resultcheck)

    if (resultcheck.length > 0) { 
      return res.status(400).json({ success : false, message: 'Item já favoritado' });
    }

    const queryAddfavotireprod = `INSERT INTO produtos_favoritos (user_id, imgprod, title, itemid) VALUES (?,?,?,?)`;
    const [result] = await db.query(queryAddfavotireprod, [userid, imgprod, title, itemid])

    return res.status(200).json({
      success: true,
      message:'Item adicionado ao favorito!',
      data: result
    })
   

  } catch ( err) {
    return res.status(400).json({success: false, message: 'erro ao inserir item no favotiro'})
  }

});


app.post('/api/get/addfavoriteprod' , async (req,res) => {
  
  const {userid} = req.body

  console.log(req.body);

  try {


    const queryGetFavoriteProd = `SELECT * FROM produtos_favoritos WHERE user_id = ? `;
    const [result] = await db.query(queryGetFavoriteProd, [userid])

    console.log(result)
    
    res.status(200).json({
      success: true,
      message:'Itens recuperados com sucesso!',
      data: result

    })

  } catch ( err) {
    return res.status(400).json({success: false, message: err})
  }

});


app.post('/api/post/removeitemfavorito', async (req, res) => {
  const { userid, itemid } = req.body;

  console.log('Userid para remover:', userid);
  console.log('itemid para remover:', itemid);

  // Verifica se todos os campos estão presentes
  if (!itemid || !userid) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  try {
    // Insere os itens comprados no banco de dados
    const querydeleteitem = `DELETE FROM produtos_favoritos WHERE user_id = ? AND itemid = ?  `;
    await db.query(querydeleteitem, [userid, itemid]);

    res.status(200).json({ success: true, message: 'Item removido com sucesso!' });

  } catch (err) {
    console.error('Erro:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});


app.post ('/api/configitens' , async (req , res) => {

  const { marca ,codigo, tamanho, descricaoLonga, descricaoDetalhada , cor} = req.body


  console.log('req.body no backend: ' ,req.body)

  try {

    const queryAddConfigItens = `UPDATE Produtos SET marca = ?,tamanho = ?, descricaolonga = ? , descricaodetalhada = ?, cor = ? WHERE codigo = ?`;
    const [result] = await db.query(queryAddConfigItens, [marca , tamanho, descricaoLonga, descricaoDetalhada , cor , codigo]);
  

    if (result.affectedRows > 0) {
      return res.status(200).json({
        success: true,
        message: 'configuracoes adicionadas com sucesso',
        data: result
      })
    } else (err) => {
      return res.status(400).json({
        success: false,
        message: 'erro ao adicionar',
        erro: err.message
      })
    }
    

  } catch (err) {
    res.status(500).json({messagem: 'Erro interno do servidor' , erro: err.message})
  }

});


app.post('/api/get/searchbar' , async (req, res) => {

  const {nome} = req.body;


  // console.log('item sendo pesquisado ', nome)

  try {

    const queryGetSearchbaritens = ` SELECT 
    p.id AS produto_id, 
    p.nome, 
    p.preco, 
    (SELECT i.caminho 
     FROM imagensprod i 
     WHERE i.produto_id = p.id 
     ORDER BY i.id ASC 
     LIMIT 1) AS imagem -- Garante apenas uma imagem por produto
FROM Produtos p
WHERE p.idprodutopai IS NULL 
AND p.nome LIKE CONCAT('%', ?, '%');`
    const [result] = await db.query(queryGetSearchbaritens, [`%${nome}%`])


    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        message: 'Buscando itens!',
        data: result
      })
    } else {
      return res.status(500).json ({
        success: false,
        message: 'erro ao buscar itens'
      })
    }

  } catch (err) {
    return res.status(500).json({message:'Erro ao buscar item', error: err.message})
  }

});


app.post('/auth/google', async (req,res) => {

  try {
    const {credential} = req.body; 

    console.log(req.body);

    if (!credential) {
      return res.status(400).json({
        success: false,
        message: 'credential não encontrado'
      })
    }

    const decodefic = jwt.decode(credential);


    if (!decodefic) {
      return res.status(400).json({
        error:'Token inválido'
      })
    }

    const {email, name, picture} = decodefic

    console.log('decode dados:', decodefic);

    const queryCheckuser = `SELECT * FROM users WHERE email = ?`
    const [result] = await db.query(queryCheckuser, [email]);

    if (result.length > 0) {
      const user = result[0]
      const secretKey =  process.env.JWT_KEY
      const token = jwt.sign({ id: user.id, email, nome: user.nome }, secretKey, { expiresIn: '1h' });

      return res.json({
        success: true,
        login: true,
        message:'Usuário encontrado, Login efetuado com sucesso!',
        data: { id: user.id, nome: user.nome, email: user.email },
        token: token
      })

    } else {
      return res.json({
        success: true,
        login : false,
        data: decodefic,
        message: 'Usuário não encontrado, crie uma conta!',
      })
    }
   
  } catch (err) {
    console.log('Erro:', err);
    return res.status(500).json({
      success: false,
      message: 'Erro ao autenticar usuário',
      error: err.message
    })
  }
});

app.post('/api/get/produtobuscado', async (req,res) => {

  const {nome} = req.body

  try {

    const querygetprodsearched = `SELECT 
      p.id AS produto_id, 
      p.nome, 
      p.preco,
      p.estoque,
      p.tamanho, 
      (SELECT i.caminho 
      FROM imagensprod i 
      WHERE i.produto_id = p.id 
      ORDER BY i.id ASC 
      LIMIT 1) AS imagem -- Garante apenas uma imagem por produto
  FROM Produtos p
  WHERE p.idprodutopai IS NULL 
  AND p.nome LIKE CONCAT('%', ?, '%');` 

  const [result] = await db.query(querygetprodsearched, [`%${nome}%`]);

  if (result.length > 0) {
    return res.status(200).json({
      success: true,
      message: 'Produto pesquisado',
      data: result
    })
  } else {
    return res.status(400).json({
      success: false,
      message: 'erro na API',
    })
  }
    
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    })
  }
})



app.post("/calcular-frete", async (req, res) => {
  try {
      const { cep_destino , qtnprodoncarrinho } = req.body;

      if (qtnprodoncarrinho === 0) {
        var peso = ''
      }

      if (qtnprodoncarrinho === 1) {
        peso = 0.150
      }

      if (qtnprodoncarrinho === 2) {
        peso = 0.300
      } 

      if (qtnprodoncarrinho === 5) {
        peso = 0.600
      } 

      if (!cep_destino) {
          return res.status(400).json({ error: "CEP de destino é obrigatório" });
      }

      console.log(peso)

      const cep_origem = "24812128";
      const largura = 20;
      const altura = 4;
      const comprimento = 20;
      const Token = process.env.MELHOR_ENVIO_TOKEN;

      const response = await fetch("https://www.melhorenvio.com.br/api/v2/me/shipment/calculate", {
          method: "POST",
          headers: {
              "Authorization": `Bearer ${Token}`,
              "Content-Type": "application/json",
              "Accept": "application/json"
          },
          body: JSON.stringify({
              from: { postal_code: cep_origem },
              to: { postal_code: cep_destino },
              package: {
                  weight: peso,
                  width: largura,
                  height: altura,
                  length: comprimento
              },
              services: "1,2" // IDs dos serviços de transporte
          })
      });

      const textResponse = await response.text(); // Pegando a resposta como texto

      if (!textResponse) {
          console.error("Resposta vazia da API Melhor Envio");
          return res.status(500).json({ error: "Resposta vazia da API Melhor Envio" });
      }

      let data;
      try {
          data = JSON.parse(textResponse); // Convertendo a resposta para JSON manualmente
      } catch (jsonError) {
          console.error("Erro ao converter resposta para JSON:", textResponse);
          return res.status(500).json({ error: "Resposta inválida da API Melhor Envio" });
      }

      res.json(data);
  } catch (error) {
      console.error("Erro ao calcular o frete:", error.message);
      res.status(500).json({ error: "Erro ao calcular o frete" });
  }
});



app.post('/api/newendereco', async (req, res) => {

  const { userid , nomeendereco, cep , endereco , numero , complemento , bairro , cidade , estado , destinatario } = req.body;

  console.log('body no backend:', req.body);

  // Verifica se todos os campos estão presentes
  if (!req.body) {
    return res.status(500).json({ error: 'O corpo da requisição não foi retornado' });
  }

  try {
    // Verifica se o endereço já existe no banco de dados
      const queryCheckEndereco = `
      SELECT endereco 
      FROM enderecos 
      WHERE user_id = ? AND (endereco = ? OR nomeendereco = ?)
    `;
    const rows = await db.query(queryCheckEndereco, [userid, endereco, nomeendereco]);

    console.log(rows)

    if (rows[0].length > 0) {  
      return res.status(400).json({ success: false, message: 'Endereço ou nome do endereço já cadastrado.' });
    }
    // Insere o novo endereço no banco de dados
    const queryInsertNewEndereco = `INSERT INTO enderecos (endereco, cidade, estado, numero, destinatario, cep, bairro, nomeendereco, complemento, user_id ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )`;
    const result = await db.query(queryInsertNewEndereco, [endereco, cidade, estado, numero, destinatario, cep, bairro, nomeendereco, complemento, userid ]);

    if (result.affectedRows > 0) {
      return res.status(200).json({ success: true, message: 'Novo endereço registrado!' });
    }
   
  } catch (err) {
    console.error('Erro ao acessar o banco de dados:', err);
    res.status(500).json({ success: false, error: 'Erro ao registrar o endereço.' });
  }
});



app.post('/api/get/userenderecos', async (req,res) => {

  const {userid} = req.body;


  if (!req.body || !userid) {
    return res.status(500).json({success: false, message: 'Erro ao buscar endereços, dados não encontrados'})
  }


  try {

    const queryGetEnderecos = `SELECT * FROM enderecos WHERE user_id = ?`
    const [result] = await db.query(queryGetEnderecos, userid);

    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        message: 'Sucesso ao buscar endereços',
        data: result
      })
    } else {
      return res.status(400).json({success: false, message: 'Erro na api'})
    }

  } catch {
    console.log('Caiu no catch')
  }

});



app.post("/process_payment", async (req, res) => {
  try {
    const paymentData = {
      token: req.body.token,
      issuer_id: req.body.issuer_id || 24,
      payment_method_id: req.body.payment_method_id,
      transaction_amount: req.body.transaction_amount,
      installments: req.body.installments,
      payer: {
        email: req.body.payer.email,
        identification: req.body.payer.identification
      },
      description: req.body.description
    };

    if (!paymentData) {
      console.log('Todos os campos precisam ser preenchidos')
    }

    console.log(paymentData)

    if (!req.body.token || !req.body.payment_method_id || !req.body.transaction_amount) {
      return res.status(400).send({ error: "Todos os campos precisam ser preenchidos" });
    }
  
    const payment = new mercadopago.Payment(client);
    const result = await payment.create({ body: req.body });
    
    console.log('teste')
    res.status(200).send({
      success: true,
      payment,
      id: result.id,
      status: result.status,
      payment_method: result.payment_method_id,
      amount: result.transaction_amount

    });


  } catch (error) {
    console.error("Erro no pagamento:", error);
    res.status(500).send({ error: error.message });
  }
});


app.post('/criarpix', async (req, res) => {
  try {
    const payment = new Payment(client);
    
    const body = {
      transaction_amount: Number(req.body.transaction_amount),
      description: req.body.description,
      payment_method_id: 'pix',
      payer: {
        email: req.body.email,
        identification: {
          type: req.body.identificationType,
          number: req.body.number
        }
      }
    };

    const result = await payment.create({ body });
    
    // Capturar dados relevantes do PIX
    const pixData = {
      qr_code: result.point_of_interaction.transaction_data.qr_code,
      qr_code_base64: result.point_of_interaction.transaction_data.qr_code_base64,
      transaction_id: result.id
    };

    res.status(200).json(pixData);

  } catch (error) {
    console.error('Erro no pagamento:', error);
    res.status(500).json({ error: 'Erro ao processar pagamento' });
  }
});


app.post('/api/deleteaccount' , async (req,res) => {

  const {userid} = req.body;


  if(!userid) {
    return res.status(400).json({message: 'Erro ao excluir conta', success: false})
  }

  try{

    const querydeleteaccount = 'DELETE FROM users WHERE id = ?'
    const result = await db.query(querydeleteaccount, [userid])

    if (result.affectedRows > 0) {
      return res.status(200).json({success: true, message:'Conta Deletada com sucesso', data: result})
    } 
  } catch {
    res.status(500).json({ error: 'Eroo no servidor' });
  }

});



app.post('/api/get/infospedido' , async (req,res) => {

  const {userid} = req.body;

  console.log('API RETORNA OS PEDIDOS:', userid)

  if(!userid) {
    return res.status(400).json({success: false, message:'Todos os campos são obrigatórios'})
  }
 
  try{

    const queryReturnPedido = 'SELECT * FROM Pedidos WHERE userid = ? '
    const [result] = await db.query(queryReturnPedido , [userid])

    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        message:'Pedidos retornados com sucesso',
        data: result
      })
    } else {
      // Se nenhum pedido foi encontrado, você pode retornar uma mensagem ou um array vazio.
      return res.status(200).json({
        success: true,
        message: 'Nenhum pedido encontrado para esse usuário',
        data: []
      });
    }
  } catch {
    res.status(500).json({ error: 'Erro no servidor' });
  }

});



app.post('/api/post/quantprodbuy' , async (req,res) => {

  const {userid, produtos} = req.body;

  console.log('Quantitativo do produto:', userid, produtos)

  if(!userid || !produtos || !Array.isArray(produtos) || produtos.length === 0) {
    return res.status(400).json({success: false, message:'Todos os campos são obrigatórios'})
  }
 
  try{
    for (const produto of produtos) {
      const queryquantprodbuy = 'UPDATE carrinho_compras SET quantidade = ? WHERE userid = ? AND itemid = ?'
      await db.query(queryquantprodbuy, [produto.quantidade,userid,produto.itemid])
    }

    return res.status(200).json({
      success: true,
      message: 'Atualizacao executada no backend'
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({success: false, message: 'Erro no servidor'})
  }
});


app.post('/api/get/filterproducts', async ( req,res) => {

  const {filterstate, nameitem} = req.body

  if (!filterstate  || !nameitem) {
    return res.status(400).json({
      success: false,
      message:'Não foi possível achar estados para filtrar'
    })
  }

  console.log({
    filterstate: filterstate,
    nameitem: nameitem
  })

  let conditions = ['p.idprodutopai IS NULL']
  let params = [];


  if (filterstate.tamanho) {

    if(Array.isArray(filterstate.tamanho) && filterstate.tamanho.length > 0) {
      const placeholders = filterstate.tamanho.map(() => 'p.tamanho = ?').join(' OR ');
      conditions.push('(' + placeholders + ')')
      params.push(...filterstate.tamanho);
    } 

    else if (!Array.isArray(filterstate.tamanho) && filterstate.tamanho) {
      conditions.push(' p.tamanho = ? ');
      params.push(filterstate.tamanho);
    }

  }



  if (filterstate.cor) {

    if(Array.isArray(filterstate.cor) && filterstate.cor.length > 0) {
      const placeholders = filterstate.cor.map(() => 'p.cor = ?').join('OR');
      conditions.push('(' + placeholders + ')')
      params.push(...filterstate.cor);
    } 

    else if (!Array.isArray(filterstate.cor) && filterstate.cor) {
      conditions.push(' p.cor = ? ');
      params.push(filterstate.cor);
    }
    
  }


  if (filterstate.marca) {

    if(Array.isArray(filterstate.marca) && filterstate.marca.length > 0) {
      const placeholders = filterstate.marca.map(() => 'p.marca = ?').join(' OR ');
      conditions.push('(' + placeholders + ')')
      params.push(...filterstate.marca);
    } 

    else if (!Array.isArray(filterstate.marca) && filterstate.marca) {
      conditions.push(' p.marca = ? ');
      params.push(filterstate.marca);
    }
    
  }

  console.log(filterstate)
    
  const Query = conditions.length > 0 ? ' WHERE ' + conditions.join(" AND ") 
  :  ''


  const queryFilterProduct = `SELECT 
    p.idproduto AS produto_id, 
    p.nome, 
    p.preco,
    p.marca,
    p.estoque,
    p.tamanho,
    (SELECT i.caminho 
    FROM imagensprod i 
    WHERE i.produto_id = p.id 
    ORDER BY i.id ASC 
    LIMIT 1) AS imagem -- Garante apenas uma imagem por produto
    FROM Produtos p
    ${Query} AND p.nome LIKE ?
    GROUP BY p.idproduto, p.nome, p.preco, p.marca, p.estoque;`

    console.log('queryfilterproduct:', queryFilterProduct);
    console.log('parametros:', params);
    console.log('query montada:', Query);

  try {
    const finalParams = [...params, `%${nameitem}%`];
    const [resultfilter] = await db.query(queryFilterProduct, finalParams);

    if(resultfilter.length > 0) {
      return res.status(200).json({
        success: true,
        message: 'Sucesso ao filtrar produtos',
        filterproducts: resultfilter
      })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      error: err.message
    })
  }

})



app.listen(5000, () => {
    console.log('Servidor iniciado na porta 5000')
})