import { PrismaClient } from '@prisma/client'
import express from 'express'
const bodyParser = require('body-parser')
import path from "path"

const categoryRoutes = require('./routes/category')
const positionRoutes = require('./routes/position')

const prisma = new PrismaClient()
const app = express()

const port = process.env.PORT || 3000

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(require('cors')())

app.use('/api/category', categoryRoutes)
app.use('/api/position', positionRoutes)

async function main() {
    // ... your Prisma Client queries will go here
}

main()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect())

app.listen(port, () =>
    console.log(`Server has been started on ${port}`),
)