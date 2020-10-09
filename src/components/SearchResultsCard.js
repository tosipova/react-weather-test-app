import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { LineChart, XAxis, Tooltip, CartesianGrid, Line, YAxis, Legend } from 'recharts'
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

function SearchResultsCard({ name, country, forecast, index, onRemove }) {


    const tempForecast = forecast.map((el) => ({ celsius: el.main.temp, name: el.dt_txt }));
    // const tempForecastByDay = forecast.reduce((accumulator, currentValue, idx, arr) => {

    //     if (!(idx % 8)) {
    //         accumulator.push([])
    //     }

    //     return accumulator;
    // }, []);

    const tempAverage = tempForecast.reduce((accumulator, currentValue) => (accumulator + currentValue.celsius), 0) / tempForecast.length;
    const tempAverageRound = Math.round(tempAverage * 10) / 10;

    const onRemoveCity = () => {
        return onRemove(index);
    }

    // TODO: Взять температуру за каждый день и отобразить на графике (5 lines на одном чарте)

    const data = [
        {
            name: '9:00', day_1: 22, day_2: 18, day_3: 18, day_4: 21, day_5: 18
        },
        {
            name: '12:00', day_1: 18, day_2: 19, day_3: 18.5, day_4: 21, day_5: 23
        },
        {
            name: '15:00', day_1: 14, day_2: 17, day_3: 23, day_4: 26, day_5: 28
        },

        {
            name: '18:00', day_1: 18, day_2: 19, day_3: 19, day_4: 17, day_5: 19
        },
        {
            name: '21:00', day_1: 16, day_2: 16, day_3: 19, day_4: 21, day_5: 18
        },

        {
            name: '24:00', day_1: 16, day_2: 16, day_3: 19, day_4: 21, day_5: 18
        },

        {
            name: '03:00', day_1: 16, day_2: 16, day_3: 19, day_4: 21, day_5: 18
        },

        {
            name: '06:00', day_1: 16, day_2: 16, day_3: 19, day_4: 21, day_5: 18
        },

    ];

    return (
        <Card className="card">
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {name}, {country}

                    <IconButton
                        aria-label="delete"
                        onClick={onRemoveCity}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Typography>

                <Typography gutterBottom variant="body1">
                    Average temp {tempAverageRound} Cº
                    </Typography>

                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="day_1" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="day_2" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="day_3" stroke="#8A2BE2" />
                    <Line type="monotone" dataKey="day_4" stroke="#00FFFF" />
                    <Line type="monotone" dataKey="day_5" stroke="#DC143C" />
                </LineChart>

            </CardContent>
        </Card>
    )
}

export default SearchResultsCard;