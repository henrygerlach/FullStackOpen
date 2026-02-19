import { useState } from 'react'
import axios from 'axios'

const base_url = "https://studies.cs.helsinki.fi/restcountries/api"

function App() {
  const [countryList, setCountryList] = useState([])

  const handleFilterChange = (event) => {
    /* get all countries matching the filter */
    const filter = event.target.value.toLowerCase()
    console.log(`Filter: ${filter}`)
    axios.get(`${base_url}/all`).then(response => {
      let countryNames = []
      response.data.forEach((country) => {
        countryNames.push(country.name.common)
      })
      
      countryNames = countryNames.filter((name) => name.toLowerCase().includes(filter))

      console.log(`Length of Filtered List: ${countryNames.length}, First Country: ${countryNames[0]}`)
    })  
  }

  return (
    <div>
      <form>
        <div>
          find countries <input onChange={handleFilterChange} />
        </div>
      </form>
    </div>
  )
}

export default App
