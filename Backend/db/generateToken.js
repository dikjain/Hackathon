import jwt from "jsonwebtoken"


const generateToken = (id) => {
    return jwt.sign({ id }, "DTUHACKATHON", { expiresIn: "30d" });
}

export default generateToken