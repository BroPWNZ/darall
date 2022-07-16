const errorHandler = require('../utils/errorHandler')
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

module.exports.getAll = async function(req: Request, res: Response) {
  try {
    const category = await prisma.category.findMany()
    res.status(201).json(category)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.getById = async function(req: Request, res: Response) {
  try {
    const category = await prisma.category.findMany({
      where: {
        id: Number(req.params.id)
      }
    })
    res.status(200).json(category)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.remove = async function(req: Request, res: Response) {
  try {
    await prisma.category.delete({
      where: {
        id: Number(req.params.id)
      }
    })
    await prisma.position.deleteMany({
      where: {
        categoryId: Number(req.params.id)
      }
    })
    res.status(200).json({
      message: 'Категория удалена.'
    })
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.create = async function(req: Request, res: Response) {
  try {
    const { title } = req.body
    const category = await prisma.category.create({
      data: {
        title
      }
    })
    res.status(201).json(category)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.update = async function(req: Request, res: Response) {
  try {
    const category = await prisma.category.update({
      where: {
        id: Number(req.params.id)
      },
      data: {
        title: req.body.title
      }
    })
    res.status(200).json(category)
  } catch (e) {
    errorHandler(res, e)
  }
}