import express from "express";
import {check} from 'express-validator';

import { validarCampos } from "../../middlewares/validarDatos";

import autorizarUsuarios from '../../middlewares/autorizarUsuarios';

import ReservasControlador from '../../controladores/reservasControlador.js'
const ReservasControlador = new ReservasControlador();

const router = express.Router();

router.get('/:reserva_id', autorizarUsuarios([1,2,3]), ReservasControlador.buscarPorId);

router.get('/', autorizarUsuarios([1,2,3]), ReservasControlador.buscarPorId);

router.get('/', autorizarUsuarios([1,2,3]),
  [
    check ('fecha_reservas', 'La fecha es necesaria').notEmpty(),
    check ('salon_id', 'El salon es necesario').notEmpty(),
    check ('usuario_id', 'El usuario es necesario').notEmpty(),
    check ('turno_id', 'El turno es necesario').notEmpty(),
    check ('servicios', 'Faltan servicios de la reserva')
    .notEmpty()
    .isArray(),
    check('servicios.*.importe')
    .isFloat()
    .withMessage('el importe debe ser numerico'),
    validarCampos

  ],
  reservasControlador.crear);

  export {router};