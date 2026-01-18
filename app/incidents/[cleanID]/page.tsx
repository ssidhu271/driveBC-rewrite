import { getSpecificIncidents } from "../libs/fetchData"

export default async function DetailPage({params,} : {params: Promise<{cleanID: string}>}) {

    const { cleanID } = await params

    const events:Open511EventFullDetails = await getSpecificIncidents(cleanID)

    if(events == null) {
        return (
            <div>
                <h5 className="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">
                    Refresh Page, too many queries 
                </h5>
            </div>
        )
    }

    return(
        <div className="bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-base shadow-xs">
            <h5 className="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">{events.headline}</h5>
            <p className="text-body mb-6">{events.status}</p>
            <p className="text-body mb-6">{events.created}</p>
            <p className="text-body mb-6">{events.updated}</p>
            <p className="text-body mb-6">{events.description}</p>
            <p className="text-body mb-6">{events.event_type}</p>
            <p className="text-body mb-6">{events.severity}</p>
            <p className="text-body mb-6">{events.roads?.[0]?.name}</p>
            <p className="text-body mb-6">{events.roads?.[0]?.from}</p>
            <p className="text-body mb-6">{events.roads?.[0]?.direction}</p>
            <p className="text-body mb-6">{events.areas?.[0]?.name}</p>
        </div>
    )
}