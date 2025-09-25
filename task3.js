import { createServer } from "http";
import { parse } from "url";

const calcGcd = (x, y) => {
  if (y === 0n) return x;

  return calcGcd(y, x % y);
};

const calcLcm = (x, y) => {
  try {
    const bigX = BigInt(x);
    const bigY = BigInt(y);

    if (bigX <= 0n || bigY <= 0n) return null;

    return (bigX * bigY) / calcGcd(bigX, bigY);
  } catch {
    return null;
  }
};

const server = createServer((req, res) => {
  const parsedUrl = parse(req.url, true);
  const { x, y } = parsedUrl.query;
  const pathname = parsedUrl.pathname;

  res.writeHead(200, { "Content-Type": "text/plain" });

  if (pathname === "/kavidmi_gmail_com" || pathname === "/") {
    if (req.method === "GET") {
      const result = calcLcm(x, y);
      res.end(result === null ? "NaN" : `${result}`);
    }
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT);
