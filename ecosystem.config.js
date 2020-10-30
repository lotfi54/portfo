module.exports = {
  apps : [{
    script: '/pages/index.js',
    watch: '.'
  }, {
    script: './service-worker/',
    watch: ['./service-worker']
  }],

  deploy : {
    production : {
      user : 'root',
      host : '82.165.254.105',
      ref  : 'origin/master',
      repo : 'git@github.com:lotfi54/portfo.git',
      path : '/var/www',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
