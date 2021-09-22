const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'The blog API',
    description: 'The blog api services,',
  },
  host: 'abduljeleelng-blog-api.herokuapp.com/api/v1',
  basePath: "/",
  schemes: ['https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      "name": "Blog api endpoint",
      "description": "blog api services "
    }
  ],
  securityDefinitions: {
    api_key: {
      type: "bearer",
      name: "token",
      in: "header"
    }
  },
};

const outputFile = './docs/swagger-output.json';
const endpointsFiles = ['./src/app/users/routes/index.js','./src/app/post/routes/index.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);

