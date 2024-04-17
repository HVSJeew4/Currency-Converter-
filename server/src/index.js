const express = require("express");
const cors= require("cors"); 
const axios =require("axios");

const app =express();

//middle ware

app.use(express.json());
app.use(cors());

app.get("/getAllCurrencies",async(req,res)=>{
    const nameURL =`https://openexchangerates.org/api/currencies.json?app_id=ed422c41f6cc418f92a0bdc3f146184c`
    
    try {
    const nameResponce =await axios.get(nameURL)
    const nameData =nameResponce.data;

    return res.json(nameData);

    } catch (error) {
        console.log(error)
    }

})

app.get("/convert", async (req, res) => {
    const { date, sourceCurrency, targetCurrency, amountInSourceCurrency } = req.query;
    try {
        const dataurl = `https://openexchangerates.org/api/historical/${date}.json?app_id=ed422c41f6cc418f92a0bdc3f146184c`;
        const dataResponse = await axios.get(dataurl);
        const rates = dataResponse.data.rates;

        const sourceRate = rates[sourceCurrency];
        const targetRate = rates[targetCurrency];
        const targetAmount = sourceRate !== 0 ? (targetRate / sourceRate) * amountInSourceCurrency : 0;
        return res.json(targetAmount.toFixed(2));
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
app.listen(5000,()=>{
    console.log("Server Started")
})