export default function Card({ incident }: { incident: Open511Event }) {
  const status = incident.status ?? "UNKNOWN"
  const severity = incident.severity
  const updated = incident.updated
  const created = incident.created

  return (
    <article className="group rounded-base border border-default bg-white p-5 shadow-xs transition hover:shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full border border-default bg-neutral-primary-soft px-3 py-1 text-xs font-medium text-heading">
            {status}
          </span>

          {severity ? (
            <span className="inline-flex items-center rounded-full border border-default bg-neutral-primary-soft px-3 py-1 text-xs font-medium text-heading">
              {severity}
            </span>
          ) : null}
        </div>

        <span className="text-xs text-body/70">
          {incident.event_type ?? ""}
        </span>
      </div>

      <h3 className="mt-3 text-lg font-semibold leading-snug text-heading">
        {incident.headline ?? "Incident"}
      </h3>

      <div className="mt-3 space-y-2">
        {updated ? (
          <div className="text-sm text-body/80">
            <span className="font-medium text-heading/90">Updated:</span>{" "}
            <span className="wrap-break-word">{updated}</span>
          </div>
        ) : null}

        {created ? (
          <div className="text-sm text-body/80">
            <span className="font-medium text-heading/90">Created:</span>{" "}
            <span className="wrap-break-word">{created}</span>
          </div>
        ) : null}
      </div>

      {incident.description ? (
        <p className="mt-3 text-sm text-body/90 line-clamp-3">
          {incident.description}
        </p>
      ) : (
        <p className="mt-3 text-sm text-body/70">No description provided.</p>
      )}

      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-body/70">{incident.id}</span>
        <span className="text-sm font-medium text-heading transition group-hover:translate-x-0.5">
          View details →
        </span>
      </div>
    </article>
  )
}
