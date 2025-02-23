import { getWsConnection } from "../cfg/config.js";
import { writeToFile } from "../saver/saveToFlatFile.js";
import { evenOddPercentage } from "../Strategies/evenOddPercentage.js";

import { getHistoryData } from "./historyData.js";

const {connection, api} = getWsConnection();

function getTicks(tickData ,symbol, tickSize) {  

    getHistoryData(tickData, symbol, tickSize);

    const tickStream = () => api.subscribe({ ticks: symbol });
    const tickResponse = async (res) => {
        const data = JSON.parse(res.data);
        if (data.error !== undefined) {
            console.log('Error : ', data.error.message);
            connection.removeEventListener('message', tickResponse, false);
            await api.disconnect();
            
        }
        if (data.msg_type === 'tick') {
            console.log(data.tick.quote);
            tickData.push(data.tick.quote);
            writeToFile(`${symbol}.txt`, `${data.tick.quote}\n`)

            if(tickData.isFull()) {
                tickData.pop();
            }
            
            // getOverallPercentage(tickData.array);
            evenOddPercentage(tickData.array)

        }
    };

    const subscribeTicks = async () => {
        await tickStream();
        connection.addEventListener('message', tickResponse);
    };

    subscribeTicks();    
}

export {getTicks};