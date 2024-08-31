import express, { json, Request, Response } from "express";

const THIS_APP_PORT = 2000;
const REP_APP_LINK = "http://localhost:3000";

const app = express();
const port = process.env.PORT || THIS_APP_PORT;

startServer(app);

function startServer(_app: express.Application) {
  _app.get("/", async (req: Request, res: Response) => {
    let th = JSON.parse(JSON.stringify(req.query.th));
    console.log(th);
    let id = await sendRepRequest(getRepRequest(th));
    console.log(id);
    res.send(`Your file id is ${id}. 
      Get it by link http://localhost:${THIS_APP_PORT}/download?id=${id}`);
  });

  _app.get("/download", async (req: Request, res: Response) => {
    let id = JSON.parse(JSON.stringify(req.query.id)) as number;
    console.log(id);
    let report = await sendFileRequest(getFileRequest(id));
    if (typeof(report) == 'string') {
    res.send(report);
    } else {
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.send(Buffer.from(report));
    }
  });

  _app.listen(port, () => {
    console.log(`Server is running at  http://localhost:${THIS_APP_PORT}/`);
    console.log(
      `example request http://localhost:2000/?th=name&th=occupation&th=phonenumber`
    );
  });
}

async function sendRepRequest(req: RequestInfo) {
  let id;
  await fetch(req)
    .then((response) => response.json())
    .then((response) => (id = JSON.parse(JSON.stringify(response))));
  return id as unknown as number;
}

async function sendFileRequest(req: RequestInfo) {
  console.log('sendFileRequest started');
  let data!: ArrayBuffer | string;
  await fetch(req)
    .then((response) => response.json())
    .then((response) => {
      let res = JSON.parse(JSON.stringify(response))
      if (res.status == 1){
        data = res.data.stream._readableState.buffer[0].data;
      }
      else if((res.status == 2)){
        data = 'Work In Progress';
      }
    });
    return data;    
}

function getRepRequest(th: string[]) {
  return new Request(`${REP_APP_LINK}/rep`, {
    method: "POST",
    body: JSON.stringify({
      name: "Nick",
      tablename: "report",
      tableheads: th,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function getFileRequest(id: number) {
  return new Request(`${REP_APP_LINK}/rep/${id}`, {
    method: "GET",
  });
}
