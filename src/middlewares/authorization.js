import jwt from "jsonwebtoken";
import { UserRole } from "../utils/enum.js";

// const isTokenValid = (req, res, next) => {
//     const token = req.headers.authorization.split(" ")[1];
//     jwt.verify(token, process.env.JWT_SECRET, (err) => {
//         if (err) {
//             return res.status(401).json({ message: "Unauthorized" });
//         }
//         next();
//     });
// }

const isAdmin = (req, res, next) => {
    if (req.user.dataValues.role !== UserRole.ADMIN) {
        return res.status(403).json({ message: "Forbidden" });
    }
    next();
}

const isCustomer = (req, res, next) => {
    if (req.user.dataValues.role !== UserRole.CUSTOMER) {
        return res.status(403).json({ message: "Forbidden" });
    }
    next();
}

const isStaff = (req, res, next) => {
    if (req.user.dataValues.role !== UserRole.STAFF) {
        return res.status(403).json({ message: "Forbidden" });
    }
    next();
}


export {
    isAdmin,
    isCustomer,
    isStaff
};