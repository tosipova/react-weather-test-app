import React from 'react';
import { TextField } from '@material-ui/core';

let autoComplete;

const GoogleAutocomplete = ({ onChange, onSubmit, value, options, ...restProps }) => {
    const autoCompleteRef = React.useRef(null);
    const onInputChange = event => onChange(event.target.value);

    const loadScript = (url, callback) => {
        let script = document.createElement("script");
        script.type = "text/javascript";

        if (script.readyState) {
            script.onreadystatechange = function () {
                if (script.readyState === "loaded" || script.readyState === "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {
            script.onload = () => callback();
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    };

    function handleScriptLoad(updateQuery, autoCompleteRef) {
        autoComplete = new window.google.maps.places.Autocomplete(
            autoCompleteRef.current,
            { types: ["(cities)"], componentRestrictions: {}, } // => options
        );
        autoComplete.setFields(["address_components", "formatted_address"]);
        autoComplete.addListener("place_changed", () =>
            handlePlaceSelect(updateQuery)
        );
    }

    async function handlePlaceSelect(updateQuery) {
        const addressObject = autoComplete.getPlace();
        const city = addressObject.address_components.find(currentValue => {
            return currentValue.types.includes('locality') || currentValue.types.includes('administrative_area_level_2')
        })
        updateQuery(city.long_name);
        onSubmit();
    }

    React.useEffect(() => {
        loadScript(
            `https://maps.googleapis.com/maps/api/js?key=AIzaSyBYrqEbFwZsTjiPWgGbU4CqKcSChYCdiiw&libraries=places`,
            () => handleScriptLoad(onChange, autoCompleteRef)
        );
    }, [])


    return (
        <TextField
            inputRef={autoCompleteRef}
            value={value}
            onChange={onInputChange}
            {...restProps}
        />
    )
}

export default GoogleAutocomplete;
