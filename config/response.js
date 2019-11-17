const response = {
  /**
   * Global responses
   */
  authorization: {
    status: 403,
    EN: {
      message: 'Forbidden access.',
    },
  },
  clientIpAuthorization: {
    status: 403,
    EN: {
      message: ip => `Forbidden access for client: ${ip}`,
    },
  },
  invalidData: {
    status: 400,
    message: 'Invalid request data.'
  },
};

export default response;
