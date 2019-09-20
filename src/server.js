const http = require('http');
const url = require('url');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getStyle,
  '/success': jsonHandler.success,
  '/badRequest': jsonHandler.badRequest,
  '/unauthorized': jsonHandler.unauthorized,
  '/forbidden': jsonHandler.forbidden,
  '/internal': jsonHandler.internal,
  '/notImplemented': jsonHandler.notImplemented,
  notFound: jsonHandler.notFound,

};


const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
   console.log(parsedUrl);
  //urlStruct[request.url](request, response);


   switch (parsedUrl.pathname) {
    case '/':
      htmlHandler.getIndex(request, response);
      break;
    case '/style.css':
      htmlHandler.getStyle(request, response);
      break;
    case '/success':
      urlStruct['/success'](request, response);
      break;
    case '/badRequest':
      urlStruct['/badRequest'](request, response);
      break;
    case '/unauthorized':
      urlStruct['/unauthorized'](request, response);
      break;
    case '/forbidden':
      urlStruct['/forbidden'](request, response);
      break;
    case '/internal':
      urlStruct['/internal'](request, response);
      break;
    case '/notImplemented':
      urlStruct['/notImplemented'](request, response);
      break;
    default:
      urlStruct.notFound(request, response);
      break;
  } 
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
