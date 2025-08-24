import Link from "next/link";

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
        <p className="bg-slate-50 p-4 mx-2 border-mg-orange-600 border-l-8 ml-2 text-lg text-mg-navy-800 md:text-2xl md:mb-8">
          The Money Guy's Financial Order of Operations is a foundational
          personal finance resource, outlining a set of milestones to guide you
          along your financial journey.
        </p>
        <div className="flex mb-8 md:justify-center">
          <Link
            href="/quiz"
            className="text-slate-50 font-bold text-xl bg-mg-orange-600 my-4 mx-2 px-4 py-2 rounded hover:bg-mg-orange-400 md:text-2xl"
          >
            Take the Quiz
          </Link>
          <Link
            href="#LearnMore"
            className=" text-mg-orange-600 font-bold text-xl bg-slate-50 my-4 mx-2 px-4 py-2 rounded hover:bg-white md:text-2xl"
          >
            Learn More
          </Link>
        </div>
        <div className="flex justify-center">
          <a href="https://moneyguy.com/resources/">
            <img
              src="/FOO-9-step-summary.png"
              alt="summary of the 9 steps"
              width="985"
              height="985"
              className="p-4 mb-4"
            />
          </a>
        </div>
        <div className="flex flex-col gap-4 px-4 justify-center text-lg text-mg-navy-600 text-left md:text-2xl">
          <p
            id="LearnMore"
            className="text-2xl font-semibold mr-auto md:text-4xl"
          >
            Who are the Money Guys?
          </p>
          <p className="mb-2">
            The Money Guy Show is a dynamic financial-advising duo, focused on
            helping you improve your financial future. Alongside their team, The
            Money Guys create content for their{" "}
            <a
              className="text-mg-orange-600 cursor-pointer hover:border-b-2 "
              href="https://www.youtube.com/@MoneyGuyShow"
              target="_blank"
              rel="noopener noreferrer"
            >
              YouTube channel
            </a>{" "}
            that helps answer questions for everyday Americans who want to
            wisely steward their fiscal lives.
          </p>
          <p className="text-2xl font-semibold mr-auto md:text-4xl">
            Where did this quiz come from?
          </p>
          <p className="mb-2">
            The Financial Order of Operations is one of The Money Guy's free
            resources, codifying a strategy you can use to guide your path
            towards a big, beautiful tommorow. I created this quiz to help you
            see how many of these milestones you have already accomplished. If
            you like the resource, please check out{" "}
            <a
              className="text-mg-orange-600 cursor-pointer hover:border-b-2 transition-transform"
              href="https://moneyguy.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              The Money Guy website
            </a>{" "}
            or{" "}
            <a
              className="text-mg-orange-600 cursor-pointer hover:border-b-2 "
              href="https://www.youtube.com/@MoneyGuyShow"
              target="_blank"
              rel="noopener noreferrer"
            >
              YouTube channel
            </a>{" "}
            and support their work!
          </p>
          <p className="mb-6">
            If you like the work I did putting together this page, I also
            encourage you to visit
            <a
              className="text-green-600 cursor-pointer hover:border-b-2"
              href="https://ethancloin.xyz"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              my personal website
            </a>{" "}
            or
            <a
              className="text-green-600 cursor-pointer hover:border-b-2"
              href="https://linkedin.com/in/ethancloin"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              connect with me on LinkedIn
            </a>
            !
          </p>
          {/* </div> */}
        </div>
      </div>
    </main>
  );
}
