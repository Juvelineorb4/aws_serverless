const pruebaHandler = async (event: any = {}): Promise<any> => {
    const { body } = event
    const userName = JSON.parse(body).userName
    return {
        statusCode: "200",
        body: userName
    }
}
export { pruebaHandler }