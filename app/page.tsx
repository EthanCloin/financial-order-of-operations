import Image from "next/image";

// TODO: make this a nice landing page
export default function Home() {
  return (
    <main>
      <div className="w-screen h-1/5 bg-mg-sky text-mg-navy-600 p-4 pt-12 font-bold space-y-4">
        <p className="text-xl font-semibold md:text-3xl">
          The Financial Order of Operations
        </p>
        <p className="text-4xl md:text-6xl">
          9 Steps Toward a Beautiful Tomorrow
        </p>
      </div>
      <div className="bg-slate-200 p-4 pl-1 pr-0">
        <p className="bg-slate-50 p-4 border-mg-orange-600 border-l-8 ml-2 text-lg text-mg-navy-800 md:text-2xl">
          The Money Guys' Financial Order of Operations is a foundational
          resource, outlining a set of milestones that guide you along your
          financial journey.
        </p>
        <div className="flex justify-center">
          <Image
            src="/FOO-9-step-summary.png"
            alt="summary of the 9 steps"
            width="985"
            height="985"
            className="py-4"
          />
        </div>
        {/* TODO: Add a link to their /foo page and a blurb + link to quiz */}
      </div>
    </main>
  );
}
