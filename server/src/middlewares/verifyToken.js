import jwt from "jsonwebtoken";

function verifyToken(req, res, next) {
  // Obtener el token JWT del encabezado de la solicitud
  const token = req.headers.token;

  if (!token) {
    // Si no se proporciona un token, enviar un mensaje de error al cliente
    return res.status(401).json({ mensaje: "No se proporcionó un token" });
  }

  try {
    // Verificar si el token es válido
    const payload = jwt.verify(token, process.env.JWT_KEY);
    console.log(payload);
    // Añadir la información del usuario al objeto de solicitud
    req.user = payload;

    // Llamar al siguiente middleware
    next();
  } catch (error) {
    // Si el token no es válido, enviar un mensaje de error al cliente
    res.status(401).json({ mensaje: "Token inválido" });
  }
}

export default verifyToken;
