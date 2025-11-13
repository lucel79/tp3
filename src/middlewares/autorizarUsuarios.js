export default function autorizarUsuarios(perfilAutorizado = [] ) {
    return (req, res, next) => {
      const usuario = req.user;

      if (!usuario || !perfilAutorizado.includes(usuario.tipo_usuario) ) {
        return res.status(401).json({
          estado: "Falla",
          mensaje: 'Acceso Denegado'
        });
      }
    next();
     }
   }