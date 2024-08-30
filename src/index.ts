import express, { json, Request, Response } from 'express';

const THIS_APP_PORT = 2000;
const REP_APP_LINK = 'http://localhost:3000';

const app = express();
const port = process.env.PORT || THIS_APP_PORT;



startServer(app);


function startServer(_app : express.Application){
  _app.get('/', async (req: Request, res: Response) => {
    

    let th = JSON.parse(JSON.stringify(req.query.th));
    console.log(th);
    let report = await getReport(getRequest(th));
    //console.log(report);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(Buffer.from(report));
  });
  _app.listen(port, () => {
      console.log(`Server is running at  http://localhost:${THIS_APP_PORT}/`);
      console.log(`example request http://localhost:${THIS_APP_PORT}/?th=[%22name%22,%22occupation%22]`);
    });
}

async function getReport(req: RequestInfo){
  let data;
  await fetch(req)
  .then(response => response.arrayBuffer())
  .then(res => {
    data = res as ArrayBuffer;
  });
  return data as unknown as ArrayBuffer;
}

function getRequest(th: string[]){
  return new Request(`${REP_APP_LINK}/rep`, {
    method: 'POST',
    body: JSON.stringify({
        name: 'Nick',
        tablename: 'report',
        tableheads: th,
    }),
    headers: {
        'Content-Type': 'application/json',
    },
  });
}