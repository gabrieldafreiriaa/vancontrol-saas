import 'dotenv/config';
import app from './main.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`van control API rodando na porta ${PORT}`);
});
