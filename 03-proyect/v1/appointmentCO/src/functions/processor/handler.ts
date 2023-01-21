const processorHandler = async (event: any = {}): Promise<any> => {
  return {
    statusCode: 200,
    body: { status: "Message received CO", body: event }
  };
};

export { processorHandler };