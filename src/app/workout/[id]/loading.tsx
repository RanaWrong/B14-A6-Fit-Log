export default function WorkoutDetailLoading() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-[#0b0c0e]">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#292c32] border-t-[#baff00]" />
      <p className="mt-4 text-sm font-medium tracking-wide text-gray-400">
        Loading workout details…
      </p>
    </div>
  );
}
