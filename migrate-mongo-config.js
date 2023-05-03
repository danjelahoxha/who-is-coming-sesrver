const config = {
    mongodb: {
      url: 'mongodb://localhost:27017/whoiscomming',
      databaseName: 'whoiscomming',
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    },
    migrationsDir: 'server/migrations',
    changelogCollectionName: 'migrations',
  };
  
  module.exports = config;
  