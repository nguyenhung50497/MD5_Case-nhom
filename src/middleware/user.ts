export const userAuth = (req, res, next) =>{
    if (req.decoded.role === 'owner') {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
}