import React, { useEffect, useState } from 'react';
import axios from "axios";

export default function MainPagee() {
    // State for the form fields
    const [date, setDate] = useState(null);
    const [sourceCurrency, setSourceCurrency] = useState("");
    const [targetCurrency, setTargetCurrency] = useState("");
    const [amountInSourceCurrency, setAmountInSourceCurrency] = useState(0);
    const [amountInTargetCurrency, setAmountInTargetCurrency] = useState(0);
    const [currencyNames,setCurrencyNames] = useState([]);
    const [loading,setLoading]=useState(true)
    const handleSubmit = async(e) => {
        e.preventDefault(); // Corrected typo here
try {
    
    const responce = await axios.get("http://localhost:5000/convert",{
        params:{
            date,
            sourceCurrency,
            targetCurrency,
            amountInSourceCurrency,
        },
    });

    setAmountInTargetCurrency(responce.data);
    setLoading(false)



} catch (error) {
    console.log(error)
    
}

        console.log(
            date,
            sourceCurrency,
            targetCurrency,
            amountInSourceCurrency
        );
    }

    useEffect(()=>{
        const getCurrencyName=async()=>{
            try {
                const resposnce =await axios.get(
                    "http://localhost:5000/getAllCurrencies"
                );
                setCurrencyNames(resposnce.data);
            } catch (err) {
                console.log(err)
                
            }
        }
        getCurrencyName();
    },[])
  return (
    <div>
    <h1 className="lg:mx-32 text-5xl font-bold text-green-500">Convert Your Currencies Today</h1>
    <p className='lg:mx-32 opacity-40 py-6'>Experience the Ease and Precision of Currency Conversion with Our 
    Innovative Solution, Empowering You to Navigate International 
    Markets and Seize Global Opportunities With Confidence</p>

    <div className='mt-5 flex items-center justify-center flex-col'>
        <section className='w-full lg:w-1/2'>
            <form mb-4 onSubmit={handleSubmit}>
            <div>
            <label
            htmlFor={date} className="block mb-2 text-sm font-medium text-white-900 dark:text-white">Date</label>
            <input type="Date" onChange={(e)=>setDate(e.target.value)} 
            id={date}
            name={date}
            value={date}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
            </div>

            <div>
            <label
            htmlFor={sourceCurrency} className="block mb-2 mt-4 text-sm font-medium text-white-900 dark:text-white">Source Currency</label>
            <select onChange={(e)=>setSourceCurrency(e.target.value)} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-blue-500" placeholder="select curruncy'
             name={sourceCurrency}
             id={sourceCurrency}
             value={sourceCurrency}>
                <option value="">Select Source Currency</option>
                {Object.keys(currencyNames).map((currency)=>(
                    <option className='p-1' key={currency} value={currency}>
                        {currencyNames[currency]}
                    </option>
                ))}
             </select>
            
            </div>

            <div>
            <label
            htmlFor={targetCurrency} className="block mb-2 mt-4 text-sm font-medium text-white-900 dark:text-white">
            Target Currency
            </label>
            <select onChange={(e)=>setTargetCurrency(e.target.value)} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-blue-500" placeholder="select curruncy'
             name={targetCurrency}
             id={targetCurrency}
             value={targetCurrency}>
                <option value="">Select Target Currency</option>
                {Object.keys(currencyNames).map((currency)=>(
                    <option className='p-1' key={currency} value={currency}>
                        {currencyNames[currency]}
                    </option>
                ))}
             </select>
            
            </div>

            <div>
            <label
            htmlFor={amountInSourceCurrency}  className="block mb-2 mt-4 text-sm font-medium text-white-900 dark:text-white">
            Amount in Source Currency
            </label>
            <input
            onClick={() => setAmountInSourceCurrency("")}
            onChange={(e)=>setAmountInSourceCurrency(e.target.value)}
             type="number" 
            id={amountInSourceCurrency} 
            value={amountInSourceCurrency}
            name={amountInSourceCurrency}
            className="bg-gray-50 border mb-2  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-blue-500" placeholder="Amount in source currency" required />
            </div>

            <button type='' className='bg-green-600 hover:bg-green-800 text-white font-medium py-2 px-4 rounded-md'>Get the target Currency</button>


            </form>
        </section>
    </div>
    {!loading?<section className='mt-5 lg:mx-60 text-2xl text-white-200 font-light' >
    {amountInSourceCurrency} {currencyNames[sourceCurrency]} is equals to {""}
     <span className='text-green-500 font-bold'>{amountInTargetCurrency}</span> {currencyNames[targetCurrency]}
    </section>:"" }
    
    
    </div>
  )
}
