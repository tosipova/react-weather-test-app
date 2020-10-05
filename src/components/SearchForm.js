import React from 'react';
import { TextField, Button } from '@material-ui/core';


function SearchForm({
    onSubmit,
    onChange,
    query,
}) {
    return (
        <form
            onSubmit={onSubmit}
        >
            <TextField variant="outlined"
                value={query}
                onChange={onChange}
                size="small"
            />
            <Button variant="contained" color="primary" type="submit">
                Search city
            </Button>
        </form>
    )
}

export default SearchForm;
