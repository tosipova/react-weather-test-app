import React from 'react';
import { Button } from '@material-ui/core';

import GoogleAutoComplete from './GoogleAutocomplete';

function SearchForm({
    onSubmit,
    onChange,
    query,
}) {
    return (
        <form
            onSubmit={onSubmit}
        >
            <GoogleAutoComplete
                value={query}
                onChange={onChange}
                onSubmit={onSubmit}
                size="small"
                variant="outlined"
            />

            <Button variant="contained" color="primary" type="submit">
                Search city
            </Button>
        </form>
    )
}

export default SearchForm;
