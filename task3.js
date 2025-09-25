import { createServer } from "http";
import { parse } from "url";

const calcGcd = (x, y) => {
  if (y === 0) return x;

  return calcGcd(y, x % y);
};

const calcLcm = (x, y) => {
  if (
    typeof x !== "number" ||
    typeof y !== "number" ||
    x < 1 ||
    y < 1 ||
    isNaN(x) ||
    isNaN(y)
  )
    return NaN;

  return (x * y) / calcGcd(x, y);
};

const server = createServer((req, res) => {
  if (req.method === "GET") {
    const parsedUrl = parse(req.url, true);
    const { x, y } = parsedUrl.query;

    res.writeHead(200, { "Content-Type": "text/plain" });

    const result = calcLcm(+x, +y);
    res.end(`${result}`);
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT);
