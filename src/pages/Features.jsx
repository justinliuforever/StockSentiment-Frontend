import { ArrowPathIcon, ChatBubbleLeftEllipsisIcon, NewspaperIcon, PresentationChartBarIcon } from '@heroicons/react/24/outline'

const features = [
  {
    name: 'One-Stop Information Hub',
    description:
      'This platform consolidates content from MarketWatch, The Motley Fool, Zacks Investment Research, and other key financial sources, continuously expanding its range.',
    icon: NewspaperIcon,
  },
  {
    name: 'Real time update',
    description:
      'Merging GPT Technology with Financial News for Advanced Forecasting and Analytical Insights into Stock Market Trends, Focusing on Sentiment Analysis and Data-Driven Market Intelligence.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Intuitive content',
    description:
      'Comprehensive Integration of Short-Term and Long-Term Stock Market Forecasts, Including Risk Assessments, Volatility Factors, and Underlying Causes...',
    icon: PresentationChartBarIcon,
  },
  {
    name: 'AILM chat',
    description:
    <>
      <span className="italic text-indigo-300">24/7</span> AI assistance, the sophisticated artificial intelligence language model provides unbiased responses, leveraging news content and historical analysis data for accuracy and depth.
    </>,
    icon: ChatBubbleLeftEllipsisIcon,
  },
]

export default function Features() {
  return (
    <div className="bg-white sm:py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Maximize Your Market Insight
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Effortlessly Stay Ahead in the Stock News Game
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
