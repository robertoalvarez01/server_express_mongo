// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 3000;

// ============================
//  Entorno
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ============================
//  Seed de JWT
// ============================

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

// ============================
//  Expiración de JWT
// ============================

// 60 segundos
// 60 minutos
// 24 horas
// -- 30 días --

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// ============================
//  DataBase
// ============================
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost/cafe';
} else {
    urlDB = process.env.MONGO_URL;
}

process.env.URLDB = urlDB;