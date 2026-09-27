export default function Hero() {
  return (
    <section className="mx-auto mt-8 max-w-[1200px] px-5">
      <div className="overflow-hidden rounded-2xl border border-[#24272d] bg-[#15171c] px-6 py-10 md:px-10 lg:px-12 lg:py-12">
        <div className="flex min-h-[300px] items-center justify-between gap-8">
          <div className="max-w-[600px]">
            <p className="mb-5 text-[10px] font-bold tracking-[1.5px] text-[#baff00]">
              WORKOUT LIBRARY
            </p>
            <h1 className="font-heading text-4xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-5xl md:text-6xl">
              TRAIN WITH INTENT. LOG
              <br />
              EVERY SET.
            </h1>
            <p className="mt-5 max-w-[500px] text-sm leading-6 text-gray-400">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>
            <a
              href="#library"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#baff00] px-5 py-3 text-[11px] font-bold text-black transition hover:bg-[#c8ff33]"
            >
              BROWSE WORKOUTS
              <span aria-hidden="true">→</span>
            </a>
          </div>

          <div className="hidden shrink-0 md:block">
            <img
              src="/banner.png"
              alt="FitLog Workout Banner Illustration"
              className="h-[240px] w-[240px] object-contain lg:h-[280px] lg:w-[280px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
