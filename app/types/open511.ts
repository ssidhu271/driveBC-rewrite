interface Open511Event {
    id:string,
    headline: string,
    status:string,
    created:string,
    updated:string,
    description:string
}

interface Open511EventFullDetails {
    jurisdiction_url?: string
    url?: string
    id: string
    headline?: string
    status?: string
    created?: string
    updated?: string
    description?: string
    "+ivr_message"?: string
    "+linear_reference_km"?: number
    schedule?: {
        intervals: string[]
    }
    event_type?: string
    event_subtypes?: string[]
    severity?: string
    geography?: {
        type: string
        coordinates: [number, number]
    }
    roads?: {
        name?: string
        from?: string
        direction?: string
    }[]
    areas?: {
        url?: string
        name?: string
        id?: string
    }[]
}