import jwt from "jsonwebtoken";
import User from "../../models/users.js";
import { response, request } from "express";

export const verifyJWT = async (req = request, res = response, next) => {
  try {
    const token = req.headers["jwt"];

    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
    const id = await User.findOne({ _id: decoded.id }, {_id: 1, rol: 1});

    if (!id._id) return res.status(401).json({
        result: "La sesion se cerro vuelve a iniciar sesion"
    });

    req.body.user = id;
    next();
  } catch (err) {
    res.status(401).json({
      result: "La sesion se cerro. Porfavor vuelve a iniciar sesion."
    });
  } 
};

export const verifyTokenAdmin = async(req = request, res = response, next) => {
  try {
    const token = req.headers["jwt"];

    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
    const id = await User.findOne({ _id: decoded.id, rol: "ADMIN" }, {_id: 1});

    if (!id._id) return res.status(401).json({
        result: "No eres administrador"
    });

    req.body.id = id._id;
    next();
  } catch (error) {
    res.status(401).json({
      result: "La sesion se cerro. Porfavor vuelve a iniciar sesion."
    });
  }
};