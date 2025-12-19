import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const DATA_DIR = path.join(__dirname,'..','data')
fs.mkdirSync(DATA_DIR, { recursive: true })

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname,'..','public')))

// Seed catalog if empty
const catalogPath = path.join(DATA_DIR,'tryonyouCatalog.json')
if(!fs.existsSync(catalogPath)){
  const seed = [
    { id:'dress1', name:'Peacock Silk Dress', style:'luxury', baseFit:0.86, img:'/mockups/mockup_1.svg' },
    { id:'jacket1', name:'Gold Tailored Jacket', style:'luxury', baseFit:0.81, img:'/mockups/mockup_2.svg' },
    { id:'tee1', name:'Street Tee', style:'street', baseFit:0.74, img:'/mockups/mockup_3.svg' },
    { id:'sneak1', name:'Sport Sneaker', style:'sport', baseFit:0.77, img:'/mockups/mockup_4.svg' }
  ]
  fs.writeFileSync(catalogPath, JSON.stringify(seed, null, 2))
}

const qPath = path.join(DATA_DIR,'cuestionarios.json')
if(!fs.existsSync(qPath)) fs.writeFileSync(qPath, '[]')

app.post('/api/questionnaire', (req,res)=>{
  const arr = JSON.parse(fs.readFileSync(qPath,'utf-8') || '[]')
  arr.push({ ...(req.body||{}), ts: Date.now() })
  fs.writeFileSync(qPath, JSON.stringify(arr, null, 2))
  res.json({ ok:true })
})

app.get('/api/pau', (req,res)=>{
  const style = (req.query.style||'').toLowerCase()
  const cat = JSON.parse(fs.readFileSync(catalogPath,'utf-8'))
  const scored = cat.map(it => ({ ...it, score: it.baseFit + (style && it.style===style ? 0.1 : 0) }))
                    .sort((a,b)=>b.score-a.score)
  res.json(scored.slice(0,8))
})

const port = process.env.PORT || 3001
app.listen(port, ()=>console.log('API running on :'+port))
