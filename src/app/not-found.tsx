import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#0b0c0e] px-6 text-center text-white">
      <div>
        <p className="mb-3 text-sm font-bold tracking-widest text-[#baff00]">
          404
        </p>
        <h1 className="mb-3 text-4xl font-black uppercase md:text-5xl">
          PAGE NOT FOUND
        </h1>
        <p className="mb-6 text-gray-400">
          The page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="inline-block rounded-full bg-[#baff00] px-6 py-3 font-bold text-black transition hover:bg-[#caff32]"
        >
          GO HOME
        </Link>
      </div>
    </main>
  );
}
