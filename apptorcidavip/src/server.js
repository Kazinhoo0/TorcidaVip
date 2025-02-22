const express = require('express');
const app = express();
const uploadUser = require('./middlewares/uploadimage');
const upload = require('./middlewares/uploadimage');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');



// Configuração do banco de dados MySQL


console.log ('API KEY', process.env.API_KEY)
const db = require('./Database/db');
const { error } = require('console');
const { resourceLimits } = require('worker_threads');


app.use(cors({
  origin: ['https://torcidavipoficial-teste.onrender.com/','https://torcidavip.com/'],
  methods: ['POST', 'GET', 'DELETE', 'PUT'],
  credentials: true,

}))
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Função para salvar produtos no banco de dados
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
           SET descricaoprod = ?, preco = ?, estoque = ?
          WHERE codigo = ?
      `, [safeDescricaoCurta, safePreco, safeEstoque, safeCodigo]);
       } else {
       // Insere um novo produto
          console.log(`Produto ${safeCodigo} não encontrado. Inserindo...`);
          await db.execute(`
            INSERT INTO Produtos (precocusto, formato, nome, tamanho, codigo, descricaoprod, preco, estoque, idprodutopai) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
          `, [safePrecoCusto, safeFormato, safeNome, safeTipo, safeCodigo, safeDescricaoCurta, safePreco, safeEstoque, safeIdProdutopai]);
       }
      }
     console.log("Todos os produtos foram processados e salvos com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar produtos no banco:", error);
    }
  };

app.use(express.json());

//  app.get('/api/get/produtos', async (req, res) => {
//    try {
//          const response = await fetch('https://api.bling.com.br/v3/produtos?pagina=4', {
//              method: 'GET',
//              headers: {
//                  Authorization: `Bearer ${process.env.API_KEY}`
//              }
//          });

//          if (!response.ok) {
//              throw new Error(`Erro ao acessar a API do Bling: ${response.status} - ${response.statusText}`);
//          }
//          const data = await response.json();

//          if (!data) {
//            throw new Error('Resposta da API do Bling não contém produtos');
//        }
//          saveProdutosToDB(data.data);

//           console.log('Dados da resposta:', data);
//                  res.json(data.data);
        
//      } catch (error) {
//          console.error('Erro:', error.message);
//          res.status(500).json({ error: 'Erro ao acessar a API do Bling' });
//      }
// });


// Configuração para servir os arquivos estáticos do React
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.post('/api/get/infosprod', async (req, res) => {
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
      const secretKey = "seuSegredoJWT"; // Substitua por um segredo seguro!
      const token = jwt.sign({ id: user.id, email }, secretKey, { expiresIn: '1h' });

      res.status(200).json({
          success: true,
          id: user.id,
          token: token,
          message: 'Login bem-sucedido',
          nomecompleto: user.nome + user.sobrenome
      });

  } catch (error) {
      console.error('Erro na rota de login:', error);
      res.status(500).json({ success: false, message: 'Erro interno no servidor' });
  }
});


app.post('/api/register', async (req, res) => {
  const { nome , sobrenome , senha , confirmarsenha , email, tipoendereco, destinatario, bairro, cep,endereco, numero,cidade,pais } = req.body;

  console.log('body no backend:', req.body);

  // Verifica se todos os campos estão presentes
  if (!req.body) {
    return res.status(400).json({ error: 'O corpo da requisição não foi retornado' });
  }

  if (!nome || !sobrenome || !tipoendereco) {
    console.log('Error sem o tipoendereco')
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
    const queryInsertNewuser = `INSERT INTO users (nome, sobrenome, email, senha) VALUES ( ?, ?, ?, ? )`;
    const [result] = await db.query(queryInsertNewuser, [nome, sobrenome, email, hashedPassword,]);

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
          p.descricaoprod,
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

    const queryGetItensCarrinho = `SELECT * FROM carrinho_compras WHERE user_id = ?`
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

  const {userid , itemid, nomeitem, preco, thumbnail} = req.body;

  console.log('Info itens add carrinho:',req.body);

  console.log('userid vindo do backend :', userid)

  console.log(userid, itemid, nomeitem, preco, thumbnail);
  
  if (!userid || !itemid || !nomeitem || !preco || !thumbnail) {
    return res.status(400).json({error: 'Todos os campos precisam ser preenchidos'})
  }


  try {

    const queryCheckItemCarrinho = `SELECT itemid FROM carrinho_compras WHERE user_id = ? AND itemid = ?`
    const [resultcheck] = await db.query(queryCheckItemCarrinho, [userid, itemid]);

    console.log('resultado do check:', resultcheck)

    if (resultcheck.length > 0) { 
      return res.status(400).json({ success : false, message: 'Item já existe no banco de dados' });
    }

    const queryAddItemCarrinho = `INSERT INTO carrinho_compras (itemid , nomeitem , preco , thumbnail , user_id) VALUES (?,?,?,?,?)`
    const result = await db.query(queryAddItemCarrinho, [itemid , nomeitem , preco, thumbnail, userid]);

    
    return res.status(201).json({
      success: true,
      message: 'Item adicionado ao carrinho!',
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
    const querydeleteitem = `DELETE FROM carrinho_compras WHERE user_id = ? AND itemid = ?  `;
    await db.query(querydeleteitem, [userid, itemid]);

    res.status(200).json({ success: true, message: 'Item removido com sucesso!' });

  } catch (err) {
    console.error('Erro:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});


app.post('/api/post/addfavoriteprod' , async (req,res) => {
  
  const {userid ,itemid, imgprod, title} = req.body;

  console.log(req.body);

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




app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000')
})