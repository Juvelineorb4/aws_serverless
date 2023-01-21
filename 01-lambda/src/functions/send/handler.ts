const sendHandler = async (event: any = {}): Promise<any> => {
    return {
        statusCode: "200",
        body: "enviando"
    }
}
export { sendHandler }