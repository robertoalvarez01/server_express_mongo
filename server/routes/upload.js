const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

const Usuario = require('../models/usuario');
const Producto = require('../models/producto');

app.use(fileUpload({ useTempFiles: true }));

const fs = require('fs');
const path = require('path');


app.put('/upload/:tipo/:id', (req, res) => {

    let { tipo, id } = req.params;

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'No se ha seleccionado ningun archivo para subir'
            }
        });
    }

    //validar tipos
    let tiposValidos = ['producto', 'usuario'];
    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'El tipo ingresado no es válido'
            }
        });
    }

    let archivo = req.files.archivo;

    //Extensiones Permitidas
    let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];
    let nombreCortado = archivo.name.split('.');
    let extension = nombreCortado[nombreCortado.length - 1];

    if (extensionesValidas.indexOf(extension) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'La extension del archivo no es válida'
            }
        });
    }


    //Cambiar el nombre al archivo
    let nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extension}`;


    archivo.mv(`uploads/${tipo}/${nombreArchivo}`, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        //Se llama la funcion que actualiza en la DB
        if (tipo === 'usuario') {
            imagenUsuario(id, res, nombreArchivo, tipo);
        }

        if (tipo === 'producto') {
            imagenProducto(id, res, nombreArchivo, tipo);
        }
    });

});


function imagenUsuario(id, res, nombreArchivo, tipo) {
    Usuario.findById(id, (err, usuarioDB) => {
        if (err) {
            borrarImagen(nombreArchivo, tipo);
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!usuarioDB) {
            borrarImagen(nombreArchivo, tipo);
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'No se ha encontrado usuario con ese ID'
                }
            });
        }

        // Se borra la imagen anterior
        borrarImagen(usuarioDB.img, tipo);

        usuarioDB.img = nombreArchivo;

        usuarioDB.save((err, usuarioGuardado) => {
            res.json({
                ok: true,
                usuario: usuarioGuardado,
                img: nombreArchivo
            });
        });

    });
}


function imagenProducto(id, res, nombreArchivo, tipo) {
    Producto.findById(id, (err, productoDB) => {
        if (err) {
            borrarImagen(nombreArchivo, tipo);
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            borrarImagen(nombreArchivo, tipo);
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'No se ha encontrado usuario con ese ID'
                }
            });
        }

        // Se borra la imagen anterior
        borrarImagen(productoDB.img, tipo);

        productoDB.img = nombreArchivo;

        productoDB.save((err, productoGuardado) => {
            res.json({
                ok: true,
                producto: productoGuardado,
                img: nombreArchivo
            });
        });

    });
}



function borrarImagen(nombreArchivo, tipo) {
    let pathImagen = path.resolve(__dirname, `../../uploads/${tipo}/${nombreArchivo}`);
    if (fs.existsSync(pathImagen)) {
        fs.unlinkSync(pathImagen);
    }
}

module.exports = app;