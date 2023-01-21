import { handlerPath } from '@libs/handler-resolver';

export default {
    handler: `${handlerPath(__dirname)}/handler.receiveHandler`,
    // aqui no se manejan eventos por lo tanto no se necita un api gateway
}