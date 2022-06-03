import React, { useEffect } from 'react';
import axios from "axios";
import { useState } from 'react';
import { Link } from 'react-router-dom';


const CountriesSelect = () => {
    const [loading, setLoading] = useState(true)
    const [countryName, setCountryName] = useState([])
    const [data, setData] = useState()
    console.log(data)
    // const [coutriesName, setcoutriesName] = useState([])
 const handleChange = (e) => {
    console.log(e.target) 
    setData(e.target.value)}
    useEffect(() => {
      
        const fetchData=async()=> {
            try {
                const countries = await axios.get("https://restcountries.com/v3.1/all")
                console.log(countries)
                setCountryName(countries.data)
                setLoading(false)
                console.log(countryName)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])
    
    



  return (
    <div>
        <label>Choose country</label>
        <select name="Counties_list" id="countries_list" onChange={handleChange} >
        <option value={data} >--Please choose a country--</option>
        {
            loading? <h2>Loading .....</h2>
            : countryName.map(el=> 
                <option value={el.name.common} key={el.name.common}   > 
                 {el.name.common}
                    </option>
                
                )
        }

        </select>

        {
            countryName.filter(el=>el.name.common===data).map(country=>
                <div  key={country.name.common}>
                    <img src={country.flags.png} alt="" />
                    
                </div>
                )
        }

    </div>
  )
}

export default CountriesSelect