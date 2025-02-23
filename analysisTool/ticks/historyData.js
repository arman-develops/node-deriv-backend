import { getWsConnection } from "../cfg/config.js";
import { writeToFile } from "../saver/saveToFlatFile.js";
const {connection, api} = getWsConnection();

function getHistoryData(tickData, symbol, tickSize) {
    const ticks_history_request = {
        ticks_history: symbol,
        adjust_start_time: 1,
        count: tickSize,
        end: 'latest',
        start: 1,
        style: 'ticks',
    };
        
    const ticksHistoryResponse = async (res) => {
        const data = JSON.parse(res.data);
        if (data.error !== undefined) {
            console.log('Error : ', data.error.message);
            connection.removeEventListener('message', ticksHistoryResponse, false);
            await api.disconnect();
            // reject(data.error)
        }
        if (data.msg_type === 'history') {
            // console.log(data.history);
            // return data.history.prices;
            // tickData.setMaxSize(tickSize);
            for(const tick of data.history.prices) {
                tickData.push(tick);
                writeToFile(`${symbol}.txt`, `${tick}\n`)
            }
            
        }
        connection.removeEventListener('message', ticksHistoryResponse, false);
    };
    
    const getTicksHistory = async () => {
        connection.addEventListener('message', ticksHistoryResponse);
        await api.ticksHistory(ticks_history_request);
    };
    
    getTicksHistory();
}

export {getHistoryData};