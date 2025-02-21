import { Suspense } from "react";
import { CheckIcon } from '@heroicons/react/20/solid';
import { BentoGridSkeleton } from "@/components/ui/skeletons";

const tiers = [
  {
    name: 'Free',
    id: 'tier-free',
    href: '#',
    priceMonthly: '$0',
    description: "Perfect for getting started and exploring our basic features.",
    features: [
      'Basic data visualization',
      'Limited API access',
      'Standard support',
      'Up to 100 queries per month',
      'Export data as CSV',
      'Community access'
    ],
    featured: false,
  },
  {
    name: 'Pro',
    id: 'tier-pro',
    href: '#',
    priceMonthly: '$10',
    description: 'Unlock advanced features and premium support for power users.',
    features: [
      'Advanced data visualization',
      'Unlimited API access',
      'Priority support',
      'Unlimited queries',
      'Export in multiple formats',
      'Custom data integration',
      'Advanced analytics',
      'Team collaboration tools'
    ],
    featured: true,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Pricing() {
  return (
    <div className="relative isolate px-6 pt-4 lg:px-8">
      <div aria-hidden="true" className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl">
        <div
          className="mx-auto aspect-[1155/678] w-[60rem] bg-gradient-to-tr from-indigo-500/30 to-indigo-400/30 dark:from-indigo-400/20 dark:to-indigo-300/20 opacity-30"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-sm font-semibold leading-6 text-indigo-600 dark:text-indigo-400">Pricing</h2>
        <p className="mt-2 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Choose your plan
        </p>
      </div>
      <p className="mx-auto mt-2 max-w-2xl text-center text-base text-gray-600 dark:text-gray-300">
        Get access to powerful data analysis tools and insights with our flexible pricing options.
      </p>
      <div className="mx-auto mt-6 grid max-w-lg grid-cols-1 items-center gap-y-4 sm:gap-y-0 lg:max-w-3xl lg:grid-cols-2">
        {tiers.map((tier, tierIdx) => (
          <div
            key={tier.id}
            className={classNames(
              tier.featured ? 'relative bg-white/90 dark:bg-gray-800/90 shadow-2xl backdrop-blur-sm' : 'bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm sm:mx-8 lg:mx-0',
              tier.featured
                ? ''
                : tierIdx === 0
                  ? 'rounded-t-3xl sm:rounded-b-none lg:rounded-bl-3xl lg:rounded-tr-none'
                  : 'sm:rounded-t-none lg:rounded-bl-none lg:rounded-tr-3xl',
              'rounded-3xl p-6 ring-1 ring-gray-900/10 dark:ring-gray-100/10 sm:p-8 transition-all duration-300'
            )}
          >
            <h3 id={tier.id} className="text-sm font-semibold leading-6 text-indigo-600 dark:text-indigo-400">
              {tier.name}
            </h3>
            <p className="mt-4 flex items-baseline gap-x-2">
              <span className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">{tier.priceMonthly}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">/month</span>
            </p>
            <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-300">{tier.description}</p>
            <ul role="list" className="mt-6 space-y-2 text-sm leading-6 text-gray-600 dark:text-gray-300 sm:mt-8">
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon className="h-5 w-4 flex-none text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
            <a
              href={tier.href}
              aria-describedby={tier.id}
              className={classNames(
                tier.featured
                  ? 'bg-indigo-600 text-white shadow hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400'
                  : 'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300 dark:text-indigo-400 dark:ring-indigo-400/20 dark:hover:ring-indigo-400/40',
                'mt-6 block rounded-md px-3 py-2 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:mt-8'
              )}
            >
              Get started
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}