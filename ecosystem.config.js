module.exports = {
  apps: [{
    name: 'server',
    script: './server.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env_production: {
      NODE_ENV: 'production',
      LOG_LEVEL: 'error',
      PUBLIC_SERVER_URL: 'https://meateatr.herokuapp.com',
      PARSE_SERVER_MOUNT: '/api',
      PARSE_VERIFY_USER_EMAILS: true,
      APP_NAME: 'Meat Eatr',
      APP_ID: 'YkEDFRpeXy',
      MASTER_KEY: 'vdfk86HprA',
      READ_ONLY_MASTER_KEY: 'I94aMeHNJQ',
      CURRENCY: 'INR',
      CURRENCY_LOCALE: 'en-US',
      CURRENCY_DISPLAY: 'code',
      CUSTOM_LANG: 'en',
      PUSH_ANDROID_SENDER_ID: 'ANDROID_SENDER_ID',
      PUSH_ANDROID_API_KEY: 'ANDROID_API_KEY',
      PUSH_IOS_BUNDLE_ID: 'com.quanlabs.ionshopv2',
      MAILGUN_API_KEY: 'MAILGUN_API_KEY',
      MAILGUN_DOMAIN: 'mg.quanlabs.com',
      MAILGUN_FROM_ADDRESS: 'QuanLabs <noreply@quanlabs.com>',
      MAILGUN_HOST: 'api.mailgun.net',
      MAILGUN_PUBLIC_LINK: 'https://meateatr.herokuapp.com/',
      MAX_REQUEST_SIZE: '20mb',
      DOKKU_LETSENCRYPT_EMAIL: 'dev@quanlabs.com',
      PARSE_DASHBOARD_USER: 'admin',
      PARSE_DASHBOARD_PASS: '$2y$12$iVSpQJw0uaohKKfIPxYZWeOTGRmVQiYqpAGGFNVUpeL4HNZTttY4C',
      PARSE_DASHBOARD_USER_READ_ONLY: 'admin1',
      PARSE_DASHBOARD_PASS_READ_ONLY: '$2y$12$lXMemR1O009ix5YApYfuLuqfujl2TQkKkcP9f2Urs3VAbT/qoH2FS'
    }
  }, {
    name: 'worker',
    script: './worker.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env_production: {
      NODE_ENV: 'production',
      APP_ID: 'YkEDFRpeXy',
      MASTER_KEY: 'vdfk86HprA',
      PUBLIC_SERVER_URL: 'https://meateatr.herokuapp.com/',
      PARSE_SERVER_MOUNT: '/api',
    }
  }]
};
