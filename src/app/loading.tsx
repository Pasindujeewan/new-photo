export default function Loading() {
  return (
    <main className="min-h-screen bg-bone px-4 pt-24 sm:px-5 sm:pt-32 md:px-8">
      <div className="mx-auto max-w-7xl animate-pulse">
        <div className="h-10 w-2/3 bg-mist sm:h-12" />
        <div className="mt-8 grid gap-5 md:grid-cols-3 md:gap-6">
          {[1, 2, 3].map((item) => <div key={item} className="h-72 bg-mist sm:h-96" />)}
        </div>
      </div>
    </main>
  );
}
