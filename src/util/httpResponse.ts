import { Request, Response } from 'express'
import config from '../config/config'
import { THttpResponse } from '../types/types'
import { EApplicationEnvironment } from '../constant/application'
import logger from './logger'

export default (req: Request, res: Response, responseStatusCode: number, responseMessage: string, data: unknown = null): void => {
    const response: THttpResponse = {
        success: true,
        statusCode: responseStatusCode,
        request: {
            ip: req.ip,
            method: req.method,
            url: req.originalUrl
        },
        message: responseMessage,
        data: data
    }
    //log
    logger.info('CONTROLLER_RESPONSE', { meta: response })

    //Prodection Env check
    if (config.ENV === EApplicationEnvironment.PRODUCTION) {
        delete response.request.ip
    }

    res.status(responseStatusCode).json(response)
}
