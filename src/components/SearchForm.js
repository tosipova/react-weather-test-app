import React from 'react';
import { TextField, Button } from '@material-ui/core';
import Autocomplete from 'react-google-autocomplete';


function SearchForm({
    onSubmit,
    onChange,
    query,
}) {
    const onInputChange = event => onChange(event.target.value);

    return (
        <form
            onSubmit={onSubmit}
        >
            <TextField variant="outlined"
                value={query}
                onChange={onChange}
                size="small"
                // InputProps={{
                //     inputComponent: Autocomplete
                // }}
                // onPlaceSelected={(place) => {
                //     if (place.address_components) {
                //         const city = place.address_components.find(currentValue => {
                //             return currentValue.types.includes('locality') || currentValue.types.includes('administrative_area_level_2')
                //         })

                //         console.log(city);

                //         onChange(city.long_name);
                //     }
                // }}
                // types={['(cities)']}
                // language="en"
            />
            {/*  
            <Autocomplete
                style={{ width: '90%' }}
                onChange={onInputChange}
                value={query}
                onPlaceSelected={(place) => {
                    if (place.address_components) {
                        const city = place.address_components.find(currentValue => {
                            return currentValue.types.includes('locality') || currentValue.types.includes('administrative_area_level_2')
                        })

                        console.log(city);

                        onChange(city.long_name);
                    }
                }}
                types={['(cities)']}
                language="en"
            />
            */}
            <Button variant="contained" color="primary" type="submit">
                Search city
            </Button>
        </form>
    )
}

export default SearchForm;
