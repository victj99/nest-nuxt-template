import { InternalServerErrorException, Logger } from "@nestjs/common";
import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime";

export class PrismaClientException extends InternalServerErrorException {
    constructor(error) {
        const log = new Logger('PrismaException')
        if (error instanceof PrismaClientKnownRequestError) {
            log.error(`RequestError\nmessage: ${error.message}\nfields: ${error.meta}`)
            super(`${error.name}: ${error.message}`)
        }
        if (error instanceof PrismaClientValidationError) {
            log.error(`ValidationError ${error.message}`);
            super(`${error.name}: Fallo en el servidor`)
        }

    }
}