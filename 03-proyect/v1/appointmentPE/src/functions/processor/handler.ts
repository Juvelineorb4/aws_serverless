const processorHandler = async (event: any = {}): Promise<any> => {
  return {
    statusCode: 200,
    body: { status: "Message received PE", body: event }
  };
};

export { processorHandler };