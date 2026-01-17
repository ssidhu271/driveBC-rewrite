import IncidentCard from "./components/IncidentCard"
import getIncidents from "./libs/fetchData"

export default async function page() {
    const events = await getIncidents()

    return (
      <div>
          {events.map((event:Open511Event) => (
          <IncidentCard key={event.id} incident={event}/>
        ))}
      </div>
    )
}