export default function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white shadow-card">
      <div className="h-[220px] bg-shimmer-gold bg-[length:200%_100%] animate-shimmer bg-gold-50" />
      <div className="p-4 space-y-3">
        <div className="h-3 w-20 rounded bg-shimmer-gold bg-[length:200%_100%] animate-shimmer bg-gold-50" />
        <div className="h-4 w-4/5 rounded bg-shimmer-gold bg-[length:200%_100%] animate-shimmer bg-gold-50" />
        <div className="h-4 w-1/2 rounded bg-shimmer-gold bg-[length:200%_100%] animate-shimmer bg-gold-50" />
        <div className="flex gap-2 pt-2">
          <div className="h-11 flex-1 rounded-xl bg-shimmer-gold bg-[length:200%_100%] animate-shimmer bg-gold-50" />
          <div className="h-11 w-11 rounded-xl bg-shimmer-gold bg-[length:200%_100%] animate-shimmer bg-gold-50" />
        </div>
      </div>
    </div>
  )
}
