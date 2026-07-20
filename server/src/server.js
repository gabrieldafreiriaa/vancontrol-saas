/* 
===================================
---------LIGA O SERVIDOR-----------
===================================
*/

import 'dotenv/config';
import app from './main.js';

const PORT = process.env.PORT; //define que o backend vai utilizar a porta que esta no arquivo .env

app.listen(PORT, () => {
  console.log(`van control API rodando na porta ${PORT}`);
});
