import { App } from "@/infra/http";

const port = Number(process.env.PORT);
const app = new App();

app.listen(port);
