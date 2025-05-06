"use strict"

import express from 'express'
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { dbConnection } from './mongo.js'
import apiLimiter from '../src/middleware/rate-limit-validator.js'
import createAdmin from '../src/auth/auth.controller.js'
import authRoutes from "../src/auth/auth.routes.js"
import postRoutes from '../src/post/post.routes.js';
import commentRoutes from '../src/comment/comment.routes.js';
import { swaggerDocs, swaggerUi } from "./swagger.js";



const middlewares = (app) => {
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))
    app.use(apiLimiter)
}

const conectarDB = async () => {
    try{
        await dbConnection()
    }catch(err){
        console.log(`Database connection failed: ${err}`)
    } 
}

const routes = (app) =>{
    app.use("/blog/v1/auth", authRoutes)
    app.use('/blog/v1/posts', postRoutes);
    app.use('/blog/v1', commentRoutes);
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

}

export const initServer = () => {
    const app = express()
    try {
        conectarDB()
        createAdmin()
        middlewares(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server runing  on port: ${process.env.PORT}`)
    } catch (err) {
        console.log(`Server init failed: ${err}`)
    }
}