import Link from "next/link"
import IncidentCard from "./components/IncidentCard"
import { getIncidents } from "./libs/fetchData"

export default async function Page() {
    const events = await getIncidents()
    const count = events.length

    return (
        <main className="mx-auto max-w-6xl p-6">
            {/* header */}
            <header className="mb-6">
                <h1 className="text-3xl font-semibold tracking-tight text-heading">
                    Active Incidents
                </h1>
                <p className="mt-2 max-w-2xl text-body">
                    Major active incidents reported by DriveBC using the Open511 feed.
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-body/70">
                    <span>Source: Open511 / DriveBC</span>
                    <span>•</span>
                    <span>{count} incident{count === 1 ? "" : "s"}</span>
                </div>
            </header>

            {/* Content */}
            {count === 0 ? (
                <div className="rounded-base border border-default bg-neutral-primary-soft p-6 shadow-xs">
                    <h2 className="text-lg font-semibold text-heading">
                        No active incidents
                    </h2>
                    <p className="mt-2 text-body">
                        There are currently no major incidents returned by the feed.
                    </p>
                </div>
            ) : (
                <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {events.map((event: Open511Event) => {
                        const cleanID = event.id.replace("drivebc.ca/", "")

                        return (
                            <Link
                                href={`/incidents/${cleanID}`}
                                key={event.id}
                                className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                            >
                                <IncidentCard incident={event} />
                            </Link>
                        )
                    })}
                </section>
            )}
        </main>
    )
}
