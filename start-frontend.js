const args = [ 'start' ];
const opts = { stdio: 'inherit', cwd: 'src/frontend', shell: true };
require('child_process').spawn('npm', args, opts);