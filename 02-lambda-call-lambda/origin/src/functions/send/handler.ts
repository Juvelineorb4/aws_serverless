import * as AWS from 'aws-sdk';
// instancia de lambda
const lambda = new AWS.Lambda();
const sendHandler = async (event: any = {}): Promise<any> => {
    //mensaje a enviar
    const message = {
        action: "update",
        data: {
            id: 1,
            name: "Luis"
        }
    }

    const result: any = await lambda.invoke({
        //funcion lambda a la que se quiere enviar la informacion
        FunctionName: "cursosdev-destination-dev-receive",
        // tipo de invocacion
        InvocationType: "RequestResponse",
        //payload informacion a enviar como cadena de texto
        Payload: JSON.stringify(message)
    }).promise()

    /*
        El resultado de result es una variable de tipo OBJECT JSON, por esa razon al asignarselo al body del
        return de sendHandler hay que transformarlo en cadena de texto.
        
        La respuesta de tipo Json de return que es una respuesta lambda tiene 3 parametros
        {
            StatusCode
            ExecutedVersion
            Payload
        }

        Donde Payload es la del return del lambda vecino y es de tipo cadena de texto (JSON)
    */
    //como result.Payload es cadena le aplicamos un parse para convertirlo en un objecto JS y analizar los datos
    //esto permite la destructuracion ya del objeto parseado 
    /* 
    result.Payload = {
        statusCode...
        body...{status,body}
    }
    */
    const { statusCode, body, ExecutedVersion } = JSON.parse(result.Payload) //ahora son Object
    // estatus code del return del lamda vecino
    //body del return deel lambda vecino {status, body}

    /* 
    Sin embargo la destructuracion del payload puede tener otro Objeto y 
    si tenemos la necesidad de volver a enviar un dato al servidor hay que convertirlo en una cadena de texto
    */
    const statusCodeString = JSON.stringify(statusCode) // sttaus code como cadena de texto
    const bodyString = JSON.stringify(body) // body string como cadena JSON

    return {
        statusCode: 200,
        body: `Message Send: ${result.Payload}`
    };
}
export { sendHandler }