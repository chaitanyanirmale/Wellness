import { Session } from "../models/session.js";
import { errorHandler } from "../utils/error.js";


export const createSession = async (req, res, next) => {
    try{
        const session = await Session.create(req.body);
        return res.status(201).json(session);
    }catch(error){
        next(error)
    }
}

export const getPublicSessions = async (req, res, next) => {
  try {
    const sessions = await Session.find({ status: 'published' });
    res.status(200).json(sessions);
  } catch (err) {
    next(err);
  }
};

export const getMySessions = async (req, res, next) => {
  try {
    const sessions = await Session.find({ userRef: req.user.id });
    res.status(200).json(sessions);
  } catch (err) {
    next(err);
  }
};


export const getMySessionById = async (req, res, next) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) return next(errorHandler(404, 'Session not found'));
    if (session.userRef.toString() !== req.user.id) {
      return next(errorHandler(403, 'You do not have access to this session'));
    }
    res.status(200).json(session);
  } catch (err) {
    next(err);
  }
};


export const saveDraftSession = async (req, res, next) => {
  try {
    const { _id, title, content, type } = req.body;

    if (_id) {
      const session = await Session.findById(_id);
      if (!session) return next(errorHandler(404, 'Session not found'));
      if (session.userRef.toString() !== req.user.id) {
        return next(errorHandler(403, 'You are not authorized to edit this session'));
      }
      session.title = title;
      session.content = content;
      session.type = type;
      session.status = 'draft';
      session.updated_at = Date.now();
      await session.save();
      res.status(200).json(session);
    } else {
      const newSession = new Session({
        title,
        content,
        type,
        userRef: req.user.id,
        status: 'draft',
      });
      await newSession.save();
      res.status(201).json(newSession);
    }
  } catch (err) {
    next(err);
  }
};

export const publishSession = async (req, res, next) => {
  try {
    const { _id } = req.body;
    const session = await Session.findById(_id);
    if (!session) return next(errorHandler(404, 'Session not found'));
    if (session.userRef.toString() !== req.user.id) {
      return next(errorHandler(403, 'You are not authorized to publish this session'));
    }

    session.status = 'published';
    session.updated_at = Date.now();
    await session.save();

    res.status(200).json(session);
  } catch (err) {
    next(err);
  }
};