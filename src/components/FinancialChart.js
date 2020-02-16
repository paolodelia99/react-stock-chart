import React,{useState,useRef,useLayoutEffect} from 'react';
import LineChart from "./Plots/LineChart";
import CandleStickChart from "./Plots/CandleStickChart";

const FinancialChart = () => {
    const [financialData,setFinancialData] = useState({
        finacialItem : {
            financialChartXValuesFunction: [],
            financialChartCloseValuesFunction : [],
            financialChartOpenValuesFunction : [],
            financialChartHighValuesFunction : [],
            financialChartLowValuesFunction : [],
            financialChartVolumeValuesFunction : [],
        }
    });
    const [typeOfChart,setTypeOfChart] = useState('line');
    const firstUpdate = useRef(true);

    const fetchFinancialItem = () => {
        const API_KEY = 'HGJWFG4N8AQ66ICD';
        let finItemSymbol = 'FB';
        let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${finItemSymbol}&outputsize=compact&apikey=${API_KEY}`;
        let financialChartXValuesFunction = [];
        let financialChartCloseValuesFunction = [];
        let financialChartOpenValuesFunction = [];
        let financialChartHighValuesFunction = [];
        let financialChartLowValuesFunction = [];
        let financialChartVolumeValuesFunction = [];

        fetch(API_Call)
            .then(
                function(response) {
                    return response.json();
                }
            )
            .then(
                function(data) {
                    console.log(data);

                    for (let key in data['Time Series (Daily)']) {
                        financialChartXValuesFunction.push(key);
                        financialChartCloseValuesFunction.push(data['Time Series (Daily)'][key]['4. close']);
                        financialChartOpenValuesFunction.push(data['Time Series (Daily)'][key]['1. open']);
                        financialChartHighValuesFunction.push(data['Time Series (Daily)'][key]['2. high']);
                        financialChartLowValuesFunction.push(data['Time Series (Daily)'][key]['3. low']);
                        financialChartVolumeValuesFunction.push(data['Time Series (Daily)'][key]['6. volume'])
                    }

                    // console.log(stockChartXValuesFunction);
                    setFinancialData({...financialData,
                        finacialItem : {
                            financialChartXValuesFunction: financialChartXValuesFunction,
                            financialChartCloseValuesFunction : financialChartCloseValuesFunction,
                            financialChartOpenValuesFunction : financialChartOpenValuesFunction,
                            financialChartHighValuesFunction : financialChartHighValuesFunction,
                            financialChartLowValuesFunction : financialChartLowValuesFunction,
                            financialChartVolumeValuesFunction : financialChartVolumeValuesFunction,
                    }})
                }
            )
    }

    useLayoutEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            fetchFinancialItem()
            return;
        }

    },[]);

    const handleChartChange = e => {
        setTypeOfChart(e.target.value);
    };

    const displayTheRightPlot = () => {
        switch (typeOfChart) {
            case 'line':
                return (<LineChart
                    color='green'
                    financialItem={forex}
                    financialItemName={forex.forexName}
                />);
            case 'candlestick':
                return (<CandleStickChart
                    financialItem={forex}
                    financialItemName={forex.forexName}
                />);
            default:
                return (<LineChart
                    color='green'
                    financialItem={forex}
                    financialItemName={forex.forexName}
                />);
        }
    };

    return (
        <div>
            <div></div>
            <div>
                {financialData ? null : displayTheRightPlot()}
            </div>
            <div></div>
        </div>
    );
};

export default FinancialChart;