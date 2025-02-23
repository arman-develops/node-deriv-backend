import { getWsConnection } from "../cfg/config.js";

const {connection, api} = getWsConnection();

function getVolatilitySymbols() {
    return new Promise(async (resolve, reject) => {
        let filteredData = [];
        const active_symbols_request = {
            active_symbols: "brief",
            product_type: "basic"
        }

        const activeSymbolsResponse = async (res) => {
            const data = JSON.parse(res.data);
            
            if (data.error !== undefined) {
                console.log('Error : ', data.error?.message);
                connection.removeEventListener('message', activeSymbolsResponse, false);
                await api.disconnect();
                reject(new Error(data.error?.message));
            }

            if (data.msg_type === 'active_symbols') {
                
                const dataArray = data.active_symbols;

                filteredData = dataArray.filter(object => object.submarket_display_name === "Continuous Indices");
                resolve(filteredData)
            }

            connection.removeEventListener('message', activeSymbolsResponse, false);
        };

        const getActiveSymbols = async () => {
            connection.addEventListener('message', activeSymbolsResponse);
            await api.activeSymbols(active_symbols_request);
        }

        try {
            getActiveSymbols();
        }catch(error) {
            reject(error)
        }
    });
    
}

async function getActiveSymbolNames() {
    try{
        const filteredData = await getVolatilitySymbols();
        const marketNames = filteredData.map(object => object.display_name);
        console.log(marketNames);

        //send market_display_names as JSON

    }catch(err) {
        console.error("Error: ",err);
    }
    
}

async function getVolatilitySymbol(symbolName) {
    try{
        const filteredData = await getVolatilitySymbols();
        // console.log(filteredData);
        const symbolObj = filteredData.find(obj => obj.display_name === symbolName);
        if (symbolObj) {
            return symbolObj.symbol;
        } else {
            throw new Error(`Symbol not found for name: ${symbolName}`);
        }
    }catch(err) {
        console.error("Error: ",err);
    }

}

async function getContractForSymbol(symbol) {
    const contracts_for_symbol_request = {
        contracts_for: symbol,
        currency: 'USD',
        landing_company: 'svg',
        product_type: 'basic',
    };
      
    const contractsForSymbolResponse = async (res) => {
        const data = JSON.parse(res.data);
        
        if (data.error !== undefined) {
            console.log('Error : ', data.error?.message);
            connection.removeEventListener('message', contractsForSymbolResponse, false);
            await api.disconnect();
        }
        
        if (data.msg_type === 'contracts_for') {
            const digitContracts = data.contracts_for.available.filter(object => object.contract_category === "digits")
            console.log(digitContracts.map(object => object.contract_display));

            //map digit contracts to the form here

            
        }
        
        connection.removeEventListener('message', contractsForSymbolResponse, false);
    };
    
    connection.addEventListener('message', contractsForSymbolResponse);
    await api.contractsFor(contracts_for_symbol_request);

}

export {getActiveSymbolNames, getVolatilitySymbol, getContractForSymbol}