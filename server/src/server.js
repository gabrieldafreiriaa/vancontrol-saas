/* 
===================================
---------LIGA O SERVIDOR-----------
===================================
*/

import app from './main.js';
import { env } from './config/env.js';

app.listen(env.PORT, () => {
  console.log(`VanControl API running on port ${env.PORT}`);
});
