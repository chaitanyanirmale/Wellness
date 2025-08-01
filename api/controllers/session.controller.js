import { Session } from "../models/session.js";


export const createSession = async (req, res, next) => {
    try{
        const session = await Session.create(req.body);
        return res.status(201).json(session);
    }catch(error){
        next(error)
    }
}