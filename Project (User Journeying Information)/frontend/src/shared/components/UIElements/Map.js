import React, { useRef, useEffect } from 'react'

const Map = (props) => {
    // const mapRef = useRef();

    // const { center, zoom } = props;

    // useEffect(() => {
    //     const map = new window.google.maps.Map(mapRef.current, {
    //         center: center,
    //         zoom: zoom
    //     });

    //     new window.google.maps.Marker({
    //         position: center,
    //         map: map
    //     })
    // }, [center, zoom])



    return (
        <div className={`map ${props.className}`} style={props.style}>
            <h1>THE MAP!!!</h1>
            <hr />
            <h2>{props.title}</h2>
            <h3>Coordinates: </h3>
            <span> Latitude:{props.center.lat}</span>
            <span>,  Longitude:{props.center.lng}</span>
        </div>
    )
}

export default Map