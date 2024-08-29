import express, { json, Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 2000;


startServer(app);

let preq: RequestInfo = new Request(`http://localhost:3000/rep`, {
    method: 'POST',
    body: JSON.stringify({
        name: 'Nick',
        tablename: 'report',
        tableheads: ['name', 'occupation'],
    }),
    headers: {
        'Content-Type': 'application/json',
    },
  });




function startServer(_app : express.Application){
  _app.get('/', (req: Request, res: Response) => {
    let report = getReport(preq);
    console.log(report);
    res.status(200).json(report);
  });
  
  _app.listen(port, () => {
      console.log(`Server is running at  http://localhost:2000/`);
    });
}

function getReport(req: RequestInfo) {
    return fetch(req)
    .then(response => response.json())
    .then(data => console.log(data));
    /*return fetch('http://localhost:3000/')
     .then(response => response.json())
     .then(data => console.log(data))
     .catch(error => console.error('Error:', error));*/
}


interface Report {
    message: string;
}