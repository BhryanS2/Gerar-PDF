const express = require('express')
const ejs = require('ejs')
const path = require('path')
const pdf = require('html-pdf')

const app = express()

const passengers = [
  {
    name: "Joyce",
    flightNumber: 7859,
    time: "18h00",
  },
  {
    name: "brock",
    flightNumber: 7859,
    time: "18h00",
  },
  {
    name: "Eve",
    flightNumber: 7859,
    time: "18h00",
  },
]

app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'print.ejs')
  ejs.renderFile(filePath, { passengers }, (err, data) => {
    if (err) return console.log(err)

    const options = {
      height: '11.25in',
      width: '8.5in',
      header: {
        height: "20mm"
      },
      footer: {
        height: "20mm"
      }
    }

    //criar o PDF
    pdf.create(data, options).toFile("arquivo.pdf", (err, data) => {
      res.send(err ? "Erro ao gerar PDF" : data)
    })
  })
})

app.listen(8000, () => {
  console.log('http://localhost:8000')
})
