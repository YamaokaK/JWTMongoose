const swaggerAutogen = require('swagger-autogen')({openapi: '3.1.0'})

const doc = {
    info: {
        version: "1.0.0",
        title: "MVC Exemple",
        description: "showing how to use mvc"
    },
    servers: [
        {
            url: 'http://localhost:3000'
        }
    ],
    components:{
        securitySchemes:{
            bearerAuth:{
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        }
    },
    security: [{
        bearerAuth:[]
    }],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() =>{
    require('./');
});
