const express = require('express');
const app = express();
const uploadUser = require('./middlewares/uploadimage');
const cors = require('cors');
const path = require('path');




const db = require('./Database/db')



// Configuração para servir os arquivos estáticos do React
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin' , '*')
    res.header('Access-Control-Allow-Methods' , 'GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers' , 'Content-Type, Authorization')
    app.use(cors());
    next();
})



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

app.listen(3001, () => {
    console.log('Servidor iniciado na porta 3001')
})