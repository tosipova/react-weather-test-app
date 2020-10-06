import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { LineChart, XAxis, Tooltip, CartesianGrid, Line, YAxis, Legend } from 'recharts';

function SearchResultsCard({ query, weather }) {
    const tempForecast = weather.forecast.map((el) => ({ celsius: el.main.temp, name: el.dt_txt }));

    // Сравнить температуру в течение дня между 5 днями
    // => Взять температуру за каждый день и отобразить на графике (5 графиков)

    const tempAverage = tempForecast.reduce((accumulator, currentValue) => (accumulator + currentValue.celsius), 0) / tempForecast.length;
    const tempAverageRound = Math.round(tempAverage * 10) / 10;

    return (
        <Card className="card">
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {query}, {weather.country}
                    </Typography>
                    <Typography gutterBottom variant="body1">
                        Average temp {tempAverageRound} Cº
                    </Typography>
                    <LineChart
                        width={640}
                        height={300}
                        data={tempForecast}
                        margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="celsius" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>

                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default SearchResultsCard;