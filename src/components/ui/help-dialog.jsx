import { Dialog, Disclosure } from "@headlessui/react";
import { XMarkIcon, MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";

const searchExamples = [
  {
    category: "Demographics",
    examples: [
      "Compare population growth between Seattle and Portland from 2018-2023",
      "Show age distribution in Miami-Dade County",
      "What is the racial diversity trend in Chicago neighborhoods?"
    ]
  },
  {
    category: "Economics",
    examples: [
      "Analyze median household income by education level in Boston",
      "Compare unemployment rates between urban and rural areas in Texas",
      "Show income inequality trends in major metropolitan areas"
    ]
  },
  {
    category: "Housing",
    examples: [
      "How has housing affordability changed in San Francisco since 2020?",
      "Compare rental prices in NYC boroughs",
      "Show homeownership rates by age group in Atlanta"
    ]
  }
];

const faqs = [
  {
    question: "How do I use the advanced search?",
    answer: "Our advanced search understands natural language queries. You can ask specific questions, request comparisons, or analyze trends. Try phrases like 'Compare', 'Show trends', 'Analyze', or 'What is the relationship between'. The more specific your question, the better the results."
  },
  {
    question: "How does the AI-powered search work?",
    answer: "Our AI processes your natural language query to understand your intent, identifies relevant data points, and generates appropriate visualizations. It can handle complex relationships, temporal analysis, and multi-variable comparisons. The AI also provides context and insights about the data it presents."
  },
  {
    question: "How often is the data updated?",
    answer: "Our data is synchronized with the U.S. Census Bureau's releases. Most datasets are updated annually, while some economic indicators are updated monthly or quarterly. Each visualization shows the last update date in its details."
  },
  {
    question: "What types of questions can I ask?",
    answer: "You can ask about trends, comparisons, correlations, and distributions. For example: 'What is the correlation between education and income in California?', 'Show population density changes in urban areas', or 'Compare healthcare access across different income levels'."
  },
  {
    question: "How can I compare data across different regions?",
    answer: "You can use our comparison tools to analyze data across different geographic levels - from national to state, county, and city levels. Simply use the AI search with a comparison query or use the comparison feature in any visualization."
  }
];

export function HelpDialog({ isOpen, onClose }) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/60 backdrop-blur-[2px]" />
      
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel className="relative w-full max-w-3xl rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-xl">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-2 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
            >
              <span className="sr-only">Close</span>
              <XMarkIcon className="h-5 w-5" />
            </button>

            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Welcome to Cobble</h2>
            
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
              Your comprehensive platform for exploring and analyzing U.S. Census Bureau data. 
              Our intuitive interface and powerful AI capabilities make it easy to discover insights 
              and trends across demographics, economics, housing, and more.
            </p>
            
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Advanced Search</h3>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 space-y-3">
                <p className="text-sm text-gray-700 dark:text-gray-400">Try these example queries:</p>
                <div className="grid gap-6 md:grid-cols-3">
                  {searchExamples.map((category) => (
                    <div key={category.category} className="space-y-3">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {category.category}
                      </h4>
                      <ul className="space-y-2">
                        {category.examples.map((example) => (
                          <li
                            key={example}
                            className="text-xs text-gray-700 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer transition-colors"
                          >
                            "{example}"
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Frequently Asked Questions</h3>
              <dl className="mt-4 space-y-6 divide-y divide-gray-200 dark:divide-gray-700">
                {faqs.map((faq) => (
                  <Disclosure as="div" key={faq.question} className="pt-6 first:pt-0">
                    {({ open }) => (
                      <>
                        <dt>
                          <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900 dark:text-gray-100">
                            <span className="text-sm font-semibold">{faq.question}</span>
                            <span className="ml-6 flex h-7 items-center">
                              {open ? (
                                <MinusSmallIcon className="h-6 w-6" />
                              ) : (
                                <PlusSmallIcon className="h-6 w-6" />
                              )}
                            </span>
                          </Disclosure.Button>
                        </dt>
                        <Disclosure.Panel as="dd" className="mt-2 pr-12">
                          <p className="text-sm text-gray-700 dark:text-gray-300">{faq.answer}</p>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </dl>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}