import express from 'express'
import {importedNameOfYourController} from 'directory'

let nameOfRoute = express.Router();

tableCreate.get('/yourRoute',importedNameOfYourController)


export default  nameOfRoute