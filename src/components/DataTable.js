import React,{useState,useEffect} from 'react';
import axios from "axios"
import DataTable from 'react-data-table-component'; 

const MataTable=()=>{
    const[data,setData]=useState([])
    const[search,setSearch]=useState("")
    const[filteredCountries,setFilteredCountries]=useState([])


    const getData=async()=>{
        try{
            const response=await axios.get("https://restcountries.com/v2/all")
            setData(response.data)
            setFilteredCountries(response.data)

        }catch(error){
            console.log(error)
        }
    }
const coloums=[
    {
        name:'Country Name',
        selector:(row)=>row.name,
        sortable:true
    },
    {
        name:'Country Native Name',
        selector:(row)=>row.nativeName,
    },
    {
        name:'Country Capital',
        selector:(row)=>row.capital,
    },
    {
        name:'Country Flag',
        selector:(row)=><img height={50} width={50} src={row.flag}/>,
    },
    {
        name:'Action',
        cell:(row)=><button className='btn btn-primary'>Edit</button>
    }
        
]
useEffect (()=>{
    getData()
},[])

useEffect(()=>{
    const result = data.filter(country=>{
        return country.name.toLowerCase().match(search.toLowerCase())
    })

    setFilteredCountries(result)
},[search])

return(
    <DataTable
    // title='Data Table'
    columns={coloums}
    data={filteredCountries}
    pagination
    fixedHeader
    fixedHeaderScrollHeight="550px"
    selectableRows
    selectableRowsHighlight
    subHeader
    subHeaderComponent={
        <input type="text" placeholder='Search Here' className='w-25 form-control'
        value={search}
        onChange={(e)=>setSearch(e.target.value)}/>
        
    }  
    />
)
    }
    export default MataTable

