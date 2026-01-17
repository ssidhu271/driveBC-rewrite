import {EVENTS_CONFIG } from "./constants";

export default async function getIncidents() {
    const data = await fetch(`https://api.open511.gov.bc.ca/events?limit=${EVENTS_CONFIG.LIMITVALUE}&format=${EVENTS_CONFIG.DATAFORMAT}`)
    
    return (await data.json()).events;
    
}