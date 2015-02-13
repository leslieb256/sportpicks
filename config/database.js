// config/database.js
module.exports = {
    'url' : 'mongodb://'+process.env.DATABASE_USER+':'+process.env.DATABASE_PASSWORD+'@'+process.env.DATABASE_SERVER+':'+process.env.DATABASE_PORT+'/'+process.env.DATABASE_NAME // looks like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot
};