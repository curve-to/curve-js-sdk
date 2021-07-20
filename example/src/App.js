import './App.css'
import BaaS from '../../dist/index'

;(async () => {
  // BaaS.init({host: 'http://localhost:1234'});
  BaaS.init({ host: 'https://apiv2.auracloudapp.com' })

  const collection = new BaaS.Collection('dev')
  await collection.findMany()
})()

function App() {
  return <div className="App">123</div>
}

export default App
