import {Request, Response} from "express";

module.exports = (res: Response, error: Request) => {
  res.status(500).json({
    success: false,
    message: error
  })
}