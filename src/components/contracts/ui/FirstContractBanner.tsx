import Link from "next/link";

export default function FirstContractBanner() {
  return (
    <section
          style={{
            backgroundImage: "url('/images/onboarding_bg.png')",
          }}
          className="p-8 rounded-xl space-y-6 bg-cover bg-center bg-no-repeat"
        >
          <div>
            <article className="space-y-2">
              <p className="text-white sm:text-2xl text-xl font-bold ">
                Create your first contract
              </p>
              <p className="text-[#E8E5FA] font-medium text-xs sm:text-sm leading-[120%]">
                You're one step away! Set up your first contract and start managing payroll.
              </p>
            </article>
          </div>
        <Link href={'/app/contracts/create'}
            className="px-4 py-2 h-12 ml-auto md:py-2 text-primary-500 bg-white font-medium rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 transition-colors duration-200">
            New contract
        </Link>
    </section>
  )
}
