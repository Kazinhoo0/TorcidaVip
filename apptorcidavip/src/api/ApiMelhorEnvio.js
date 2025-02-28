let fetch;
if (parseInt(process.version.slice(1).split('.')[0]) < 18) {
  
  fetch = require('node-fetch');
} else {

  fetch = global.fetch;
}

const API_BASE_URL = 'https://api.melhorenvio.com.br'; 
const API_KEY = 'za5EVL3MGruDLV6zblCQHAZHA9KoJqN2nlshLIRU'; 

const getFrete = async (dados) => {
  const url = `${API_BASE_URL}/api/cotacaoFrete/${queryParams}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(dados)
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao obter frete:', error);
    throw error;
  }
};

module.exports = { getFrete };