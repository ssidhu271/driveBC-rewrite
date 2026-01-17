import Link from "next/link"
import IncidentCard from "./components/IncidentCard"
import getIncidents from "./libs/fetchData"

export default async function page() {
    const events = await getIncidents()

    return (
      <div>
          {events.map((event:Open511Event) => {

            let cleanID:string = event.id.replace("drivebc.ca/", "");

            return <Link href={`/incidents/${cleanID}`} key={event.id}><IncidentCard incident={event}/></Link>

          }
        )}
      </div>
    )
}