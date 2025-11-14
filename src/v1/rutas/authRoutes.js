import express from 'express';

import AuthController from '../../controladores/authController.js';

import {check} from 'express-validator';

import {validarCampos} from '../../middlewares/validarDatos.js' //ver esta ruta


const router = express.Router();

const authController = new AuthController();

router.post('/login', 
    [
        check('nombre_usuario', 'el correo es requerido ').not().isEmpty(),
        check('nombre_usuario', 'Revisar el formato del correo').isEmail(),
        check('contrasenia', ' la contraseña  es requerida').not().isEmpty(),
        validarCampos
    ],
    authController.login);

export {router};    