import * as AWS from 'aws-sdk';
// instancia de lambda
const lambda = new AWS.Lambda();

enum ISO_COUNTRY {
    COLOMBIA = "CO",
    MEXICO = "MX",
    PERU = "PE",
}

interface Message {
    isoCountry: ISO_COUNTRY;
    patientName: string;
    patientEmail: string;
    patientPhone: string;
    nameSpecialty: string;
    nameDoctor: string;
    appointmentDate: string;
}

//funcion para enviar el mensaje entre lambdas 
const sendMessage = async (information: Message): Promise<any> => {

    const isoCountry = information.isoCountry;
    let lambdaFunctionNameDestination = "";
    switch (isoCountry) {
        case ISO_COUNTRY.COLOMBIA:
            lambdaFunctionNameDestination = "cursosdev-appointment-CO-dev-processor"
            break;
        case ISO_COUNTRY.MEXICO:
            lambdaFunctionNameDestination = "cursosdev-appointment-MX-dev-processor"
            break;
        case ISO_COUNTRY.PERU:
            lambdaFunctionNameDestination = "cursosdev-appointment-PE-dev-processor"
            break;
    }


    return await lambda.invoke({
        //funcion lambda a la que se quiere enviar la informacion
        FunctionName: lambdaFunctionNameDestination,
        // tipo de invocacion
        InvocationType: "RequestResponse",
        //payload informacion a enviar como cadena de texto
        Payload: JSON.stringify(information)
    }).promise()


}

const sendHandler = async (event: any = {}): Promise<any> => {
    //el body viene como cadena de texto JSON no hace falta parsearlo al menos que se requiera analizarlo
    const { body } = event
    const information: Message = JSON.parse(body)
    const result = await sendMessage(information)
    return {
        statusCode: "200",
        body: `Message Send: ${result.Payload}`
    }
}
export { sendHandler }