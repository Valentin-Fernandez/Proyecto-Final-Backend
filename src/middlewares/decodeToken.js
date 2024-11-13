import jwt from 'jsonwebtoken'

export const decodeToken = (req, res, next) => {
    const token = req.cookies.token; // Asume que el token está en una cookie
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.PRIVATE_KEY); // Reemplaza 'tu_clave_secreta' con tu clave secreta real
            req.user = decoded;
        } catch (error) {
            console.error('Error al decodificar el token:', error);
        }
    }
    next();
};