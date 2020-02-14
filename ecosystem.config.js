module.exports = {
    apps: [{
      name: 'tss-api',
      script: 'npm run dev',
      // error_file: '/var/log/pm2/err.log',
      // out_file: '/var/log/pm2/out.log',
      // log_file: '/var/log/pm2/combined.log',
      time: true,
      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'development'
      },
      env_staging: {
        NODE_ENV: 'test'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }],
    deploy : {
      production : {
        'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
      }
    }
  };