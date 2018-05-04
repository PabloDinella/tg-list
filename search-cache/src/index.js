const http = require('http')
const fs = require('fs');
const path = require('path');
const port = 3000
const ip = 'localhost'

let data

const server = http.createServer((req, res) => {

  if (req.url == '/') {
    res.end('<h1>Home</h1>' + JSON.stringify(data))
  }

  res.end('<h1>URL sem resposta definida!</h1>')
})

server.listen(port, ip, () => {
  setInterval(() => {
    data = readJson();
  }, 1000 * 30)
  console.log(`Servidor rodando em http://${ip}:${port}`)
  console.log('Para derrubar o servidor: ctrl + c');
})

function readJson() {
  console.log('lendo');
  return JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json')));
}
