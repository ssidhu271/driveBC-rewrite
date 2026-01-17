export default function Card({incident}: { incident: Open511Event}) {
    return(
        <div className="bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-base shadow-xs">
            <h5 className="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">{incident.status}</h5>
            <p className="text-body mb-6">{incident.headline}</p>
            <p className="text-body mb-6">{incident.created}, {incident.updated}</p>
            <p className="text-body mb-6">{incident.description}</p>
        </div>
    )
}