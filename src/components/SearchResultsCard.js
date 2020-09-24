import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

function SearchResultsCard({ query = "test", weather  }) {
    return (
        <Card>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {query} 
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                        {weather.weatherType}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                        {weather.temp} C
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default SearchResultsCard;