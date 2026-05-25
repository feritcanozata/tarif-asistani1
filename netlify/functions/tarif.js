exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const API_KEY = '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';

  try {
    const body = JSON.parse(event.body);
    const malzemeler = body.malzemeler || '';

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1000,
        system: `Sen Türkçe konuşan sevecen bir aile yemek tarifi asistanısın. Yanıtını SADECE geçerli JSON olarak ver. Başka hiçbir şey yazma. Format: {"yemek":"...","sure":"...","kisilik":"...","malzemeler":["..."],"adimlar":["1. ...","2. ..."],"ipucu":"..."}`,
        messages: [{ role: 'user', content: `Malzemelerim: ${malzemeler}` }]
      })
    });

    const data = await response.json();
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
