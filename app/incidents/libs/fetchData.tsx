import {EVENTS_CONFIG } from "./constants";

export async function getIncidents() {
    const data = await fetch(`https://api.open511.gov.bc.ca/events?limit=${EVENTS_CONFIG.EVENTLIMITVALUE}&format=${EVENTS_CONFIG.DATAFORMAT}`)
    
    return (await data.json()).events;
    
}

export async function getSpecificIncidents(driveBCID:string) {
    const data = await fetch(`https://api.open511.gov.bc.ca/events?id=drivebc.ca/${driveBCID}&format=${EVENTS_CONFIG.DATAFORMAT}&limit=${EVENTS_CONFIG.SPECIFICLIMITVALUE}`)

    if(!data) {
        return null
    } else if (!data.ok) {
        return null
    } else {
        return (await data.json()).events[0];
    }
     
}