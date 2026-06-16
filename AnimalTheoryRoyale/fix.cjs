const fs = require('fs');
['generate_vnr202_rq.cjs', 'generate_vnr202_aq.cjs', 'generate_vnr202_raw.cjs', 'generate_vnr202_seed.cjs'].forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  content = content.replace(/\\`/g, '`');
  fs.writeFileSync(f, content);
});
