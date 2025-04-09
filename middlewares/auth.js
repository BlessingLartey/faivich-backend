


import jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {
    console.log(req.headers);
    // Get authorization header
    const authorization = req.headers.authorization;
    // Check the presence of authorization
    if (!authorization) {
        return res.status(401).json('Authorization header does not exist!')
    }
    // Get access token from authorization 
    const token = authorization.split(' ')[1];
    // Check if token exists
    if (!token) {
        return res.status(401).json('Access token not provided!');
    }
    // Verify and decode the access token
    const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET_KEY,
        (error, decoded) => {
            if(error) {
                return res.status(401).json(error);
            }
            // Add decoded to request object
    req.user = decoded;
    // Proceed to next handler
    next();
        }
    );
    
}