import { getSpecificIncidents } from "../libs/fetchData"

export default async function DetailPage({ params }: { params: Promise<{ cleanID: string }> }) {
    const { cleanID } = await params

    const events: Open511EventFullDetails = await getSpecificIncidents(cleanID)

    if (events == null) {
        return (
            <main className="mx-auto max-w-4xl p-6">
                <div className="rounded-base border border-default bg-neutral-primary-soft p-6 shadow-xs">
                    <h5 className="text-2xl font-semibold tracking-tight text-heading leading-8">
                        Refresh page — too many queries
                    </h5>
                    <p className="mt-2 text-body">
                        The upstream API returned no data. This can occur after repeated requests in a short period.
                    </p>
                </div>
            </main>
        )
    }

    const Badge = ({ children }: { children: React.ReactNode }) => (
        <span className="inline-flex items-center rounded-full border border-default bg-white px-3 py-1 text-sm text-heading">
            {children}
        </span>
    )

    const Field = ({ label, value }: { label: string; value?: React.ReactNode }) => {
        if (value === undefined || value === null || value === "") return null
        return (
            <div className="space-y-1">
                <div className="text-sm text-body/70">{label}</div>
                <div className="text-base text-heading wrap-break-word">{value}</div>
            </div>
        )
    }

    const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
        <section className="rounded-base border border-default bg-white p-6 shadow-xs">
            <h2 className="text-lg font-semibold tracking-tight text-heading">{title}</h2>
            <div className="mt-4">{children}</div>
        </section>
    )

    const [lon, lat] = events.geography?.coordinates ?? []
    const hasCoords = typeof lat === "number" && typeof lon === "number"
    const mapsHref = hasCoords ? `https://www.google.com/maps?q=${lat},${lon}` : undefined

    return (
        <main className="mx-auto max-w-6xl p-6">
            <header className="rounded-base border border-default bg-neutral-primary-soft p-6 shadow-xs">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap items-center gap-2">
                        {events.status && <Badge>{events.status}</Badge>}
                        {events.severity && <Badge>{events.severity}</Badge>}
                        {events.event_type && <Badge>{events.event_type}</Badge>}
                        {events.event_subtypes?.length ? <Badge>{events.event_subtypes.join(", ")}</Badge> : null}
                    </div>

                    <h1 className="text-3xl font-semibold tracking-tight text-heading leading-tight">
                        {events.headline ?? "Incident details"}
                    </h1>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <Field label="Created" value={events.created} />
                        <Field label="Updated" value={events.updated} />
                        <Field label="Event ID" value={events.id} />
                        {/* <Field label="Linear reference (km)" value={events["+linear_reference_km"]} /> */}
                    </div>
                </div>
            </header>

            <div className="mt-6 grid gap-6 lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2">
                    <Section title="Summary">
                        <Field
                            label="Description"
                            value={
                                events.description ? (
                                    <p className="whitespace-pre-line text-body">{events.description}</p>
                                ) : undefined
                            }
                        />
                        {/* <Field
                            label="IVR message"
                            value={
                                events["+ivr_message"] ? (
                                    <p className="whitespace-pre-line text-body">{events["+ivr_message"]}</p>
                                ) : undefined
                            }
                        /> */}
                    </Section>

                    <Section title="Roads">
                        {events.roads?.length ? (
                            <ul className="space-y-4">
                                {events.roads.map((road, idx) => (
                                    <li key={idx} className="rounded-base border border-default bg-neutral-primary-soft p-4">
                                        <div className="grid gap-3 sm:grid-cols-3">
                                            <Field label="Name" value={road.name} />
                                            <Field label="From" value={road.from} />
                                            <Field label="Direction" value={road.direction} />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-body">No road information provided.</p>
                        )}
                    </Section>

                    <Section title="Areas">
                        {events.areas?.length ? (
                            <ul className="space-y-4">
                                {events.areas.map((area, idx) => (
                                    <li key={idx} className="rounded-base border border-default bg-neutral-primary-soft p-4">
                                        <div className="grid gap-3 sm:grid-cols-3">
                                            <Field label="Name" value={area.name} />
                                            <Field label="Area ID" value={area.id} />
                                            <Field
                                                label="Area URL"
                                                value={
                                                    area.url ? (
                                                        <a className="text-blue-600 hover:underline break-all" href={area.url}>
                                                            {area.url}
                                                        </a>
                                                    ) : undefined
                                                }
                                            />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-body">No area information provided.</p>
                        )}
                    </Section>
                </div>

                <aside className="space-y-6">
                    <Section title="Location">
                        {hasCoords ? (
                            <div className="space-y-4">
                                <Field label="Latitude" value={lat} />
                                <Field label="Longitude" value={lon} />
                                {mapsHref ? (
                                    <a className="inline-block text-blue-600 hover:underline" href={mapsHref}>
                                        Open in Google Maps
                                    </a>
                                ) : null}
                            </div>
                        ) : (
                            <p className="text-body">No coordinates provided.</p>
                        )}
                    </Section>

                    <Section title="Schedule">
                        {events.schedule?.intervals?.length ? (
                            <ul className="list-disc pl-5 text-body space-y-2">
                                {events.schedule.intervals.map((interval, idx) => (
                                    <li key={idx} className="wrap-break-word">{interval}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-body">No schedule intervals provided.</p>
                        )}
                    </Section>
                </aside>
            </div>
        </main>
    )
}
