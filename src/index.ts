import express, { json, Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 3000;

let request: RequestInfo = new Request('http://localhost:3000/rep?docId=2342', {
    method: 'GET',
  });


let preq: RequestInfo = new Request('http://localhost:3000/rep', {
    method: 'POST',
    body: JSON.stringify({
        name: 'Nick',
        tablename: 'table1',
        tableheads: ['name', 'occupation'],
    }),
    headers: {
        'Content-Type': 'application/json',
    },
  });

let report = getReport(preq);
console.log(report);

/*
app.get('/', (req: Request, res: Response) => {
  const message = 'Hello, World!';
  res.status(200).json({ message });
});

app.listen(port, () => {
    console.log(`Server is running at  http://localhost:${port}`);
  });
*/
function getReport(req: RequestInfo) {
    fetch(req)
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