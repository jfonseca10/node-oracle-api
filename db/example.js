const db = require('./index.js')

async function run () {
  const { ActividadTele } = await db()
  ActividadTele.updateDetalleAutorizador
  ('2d109cf0-859b-11ea-9125-2f7117a0189d', {
    aprobacionJefatura: '18870'
  }).then(console.log).catch(console.log)
}

run()