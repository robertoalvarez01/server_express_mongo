// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 3000;

// ============================
//  Entorno
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ============================
//  DataBase
// ============================
// if (process.env.NODE_ENV === 'dev') {
//     urlDB = 'mongodb://localhost/cafe';
// } else {
urlDB = 'mongodb+srv://roberto_admin:eUzd1D4TMZxdG83a@cluster0-oqlsz.mongodb.net/cafe';
// }

process.env.URLDB = urlDB;