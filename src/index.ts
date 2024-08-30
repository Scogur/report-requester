import express, { json, Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 2000;


startServer(app);

//getReport(getRequest());


function startServer(_app : express.Application){
  _app.get('/', async (req: Request, res: Response) => {
    let report = await getReport(getRequest())
    //console.log(report);
    //res.sendFile(report);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(Buffer.from(report));
  });
  
  _app.listen(port, () => {
      console.log(`Server is running at  http://localhost:2000/`);
    });
}

async function getReport(req: RequestInfo){
  //let data: string | undefined;
  let data;
  //let blob;
  await fetch(req)
  .then(response => response.arrayBuffer())
  .then(res => {
    data = res as ArrayBuffer;
  });


  return data as unknown as ArrayBuffer;
}




function getRequest(){
  return new Request(`http://localhost:3000/rep`, {
    method: 'POST',
    body: JSON.stringify({
        name: 'Nick',
        tablename: 'report',
        tableheads: ['name', 'occupation', 'phonenumber'],
    }),
    headers: {
        'Content-Type': 'application/json',
    },
  });
}