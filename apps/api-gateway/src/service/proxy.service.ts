import { HttpService } from '@nestjs/axios';
import axios from 'axios';
import {
    HttpException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { catchError } from 'rxjs';

@Injectable()
export class ProxyService {
    private readonly urls: any;
    constructor(private readonly httpService: HttpService) {
        this.urls = {
            transaction: process.env.MICRO_TRANSACTION,
            client: process.env.MICRO_CLIENT,
        };
    }
    async proxy(type: 'transaction' | 'client', req: Request) {
        const base = this.urls[type];
        if (!base)
            throw new InternalServerErrorException('Tipo de proxy não aceito');

        const url = `${base}${req.url}`;
        const config: any = {
            url,
            method: req.method,
            headers: {
                authorization: String(process.env.INTERNAL_ACCESS_TOKEN),
            } as any,
            data: req.body,
        };
        try {
            const resp = await axios(config);
            return resp.data
        } catch (error) {
            throw new HttpException(error.response.data, error.status);
        }
    }
}
