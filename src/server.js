const express = require('express')
const ejs = require('ejs')
const path = require('path')
const puppeteer = require("puppeteer")

const app = express()

// passageiros a ser gerados
const passengers = [
  {
    name: "Joyce",
    flightNumber: 7859,
    time: "18h00",
  },
  {
    name: "brock",
    flightNumber: 7859,
    time: "18h30",
  },
  {
    name: "Eve",
    flightNumber: 7859,
    time: "19h00",
  },
]

// rota inicial
app.get('/', (req, res) => {
  // dirname é diretorio em que esta esse arquivo
  const filePath = path.join(__dirname, 'print.ejs')

  // essa engne irá renderizar tudo
  ejs.renderFile(filePath, { passengers }, (err, data) => {
    // if (err) return res.send(err)
    res.send(err ? err : data)
  })
})

// aqui é onde gera o PDF
app.get('/pdf', async (req, res) => {
  // vai abrir o edge sem mostrar ele em tela
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
  })

  // abre uma nova guia
  const page = await browser.newPage()

  // vai para a porta 8080 e espera carregar
  await page.goto('http://localhost:8080', {
    waitUntil: 'networkidle0'
  })

  // o pdf pega o background e formata em carta
  const pdf = await page.pdf({
    printBackground: true,
    format: 'letter',
  })

  // espera o browser fechar
  await browser.close()

  // ele manda o pdf para a rota
  res.contentType("aplication.pdf")

  // mostra o pdf em tela
  return res.send(pdf)
})

// abre a porta 8080
app.listen(8080, () => {
  console.log('http://localhost:8080')
})
