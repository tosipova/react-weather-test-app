import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { LineChart, XAxis, Tooltip, CartesianGrid, Line, YAxis, Legend } from 'recharts'
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

function SearchResultsCard({ name, country, forecast, index, onRemove }) {
    const tempForecast = forecast.map((el) => ({ celsius: el.main.temp, name: el.dt_txt }));
    const tempForecastByDay = forecast.reduce((accumulator, currentValue, idx) => {
        const arrIdx = idx % 8;
        const date = new Intl.DateTimeFormat('de').format(new Date(currentValue.dt_txt));

        if (!(accumulator[arrIdx])) {
            accumulator.push({}); 
        }

        if (!(accumulator[arrIdx].name)) {
            const time = new Intl.DateTimeFormat('de', { hour: 'numeric', minute: "numeric" }).format(new Date(currentValue.dt_txt));

            accumulator[arrIdx].name = time
        }

        accumulator[arrIdx][date] = currentValue.main.temp;
        return accumulator;

    }, []);

    const days = Object.keys(tempForecastByDay[0]).filter(currentValue => currentValue !== 'name'); // ['10/12/2020', 'name', '11/12/2020'] => ['10/12/2020', '11/12/2020']
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'DC143C'];

    const tempAverage = tempForecast.reduce((accumulator, currentValue) => (accumulator + currentValue.celsius), 0) / tempForecast.length;
    const tempAverageRound = Math.round(tempAverage * 10) / 10;

    const onRemoveCity = () => {
        return onRemove(index);
    }
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
                    data={tempForecastByDay}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {
                        days.map((currentValue, idx) => {
                            return <Line type="monotone"
                                key={currentValue}
                                dataKey={days[idx]}
                                stroke={COLORS[idx % COLORS.length]}
                            />
                        })
                    }

                </LineChart>

            </CardContent>
        </Card>
    )
}

export default SearchResultsCard;