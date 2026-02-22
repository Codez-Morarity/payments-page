'use client'

import { useMemo } from 'react'

interface OrderSummaryProps {
  isSubscription: boolean
  selectedPlan: string | null
}

const PLANS = {
  starter: {
    name: 'Starter Plan',
    price: 9.99,
    description: 'For individuals',
  },
  pro: {
    name: 'Professional Plan',
    price: 29.99,
    description: 'For teams',
  },
  enterprise: {
    name: 'Enterprise Plan',
    price: 99.99,
    description: 'For enterprises',
  },
}

const ONE_TIME_ITEMS = [
  { name: 'Premium Product', price: 49.99 },
  { name: 'Setup Fee', price: 0 },
  { name: 'Processing Fee', price: 2.5 },
]

export default function OrderSummary({
  isSubscription,
  selectedPlan,
}: OrderSummaryProps) {
  const summary = useMemo(() => {
    if (isSubscription && selectedPlan) {
      const plan = PLANS[selectedPlan as keyof typeof PLANS]
      const subtotal = plan.price
      const tax = Math.round(subtotal * 0.1 * 100) / 100
      const total = Math.round((subtotal + tax) * 100) / 100

      return {
        items: [
          { label: plan.name, value: `$${subtotal.toFixed(2)}` },
          { label: 'Tax (10%)', value: `$${tax.toFixed(2)}` },
        ],
        subtotal,
        tax,
        total,
        frequency: '/month',
      }
    } else {
      const subtotal = ONE_TIME_ITEMS.reduce((sum, item) => sum + item.price, 0)
      const tax = Math.round(subtotal * 0.1 * 100) / 100
      const total = Math.round((subtotal + tax) * 100) / 100

      return {
        items: [
          ...ONE_TIME_ITEMS.map((item) => ({
            label: item.name,
            value: `$${item.price.toFixed(2)}`,
          })),
          { label: 'Tax (10%)', value: `$${tax.toFixed(2)}` },
        ],
        subtotal,
        tax,
        total,
        frequency: '',
      }
    }
  }, [isSubscription, selectedPlan])

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 h-fit sticky top-4 animate-slide-right animate-delay-300">
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
        Order Summary
      </h2>

      {/* Items */}
      <div className="space-y-4 mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
        {summary.items.map((item, index) => (
          <div key={index} className="flex justify-between text-sm animate-float-up" style={{ animationDelay: `${index * 100}ms` }}>
            <span className="text-slate-600 dark:text-slate-400">
              {item.label}
            </span>
            <span className="text-slate-900 dark:text-white font-medium">
              {item.value}
            </span>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="space-y-3 mb-6 animate-float-up animate-delay-300">
        <div className="flex justify-between">
          <span className="text-slate-600 dark:text-slate-400">Subtotal</span>
          <span className="text-slate-900 dark:text-white font-medium">
            ${summary.subtotal.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-600 dark:text-slate-400">Tax</span>
          <span className="text-slate-900 dark:text-white font-medium">
            ${summary.tax.toFixed(2)}
          </span>
        </div>
        <div className="border-t border-slate-200 dark:border-slate-700 pt-3 flex justify-between">
          <span className="font-semibold text-slate-900 dark:text-white">
            Total
          </span>
          <span className="text-xl font-bold text-blue-600 dark:text-blue-400 animate-pulse-glow">
            ${summary.total.toFixed(2)}{summary.frequency}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
        <p>
          <span className="font-medium text-slate-900 dark:text-white">
            Payment Schedule:
          </span>{' '}
          {isSubscription ? 'Monthly on the 1st' : 'One-time charge'}
        </p>
        {isSubscription && (
          <p>
            <span className="font-medium text-slate-900 dark:text-white">
              Auto-renewal:
            </span>{' '}
            Yes, cancel anytime
          </p>
        )}
        <p>
          <span className="font-medium text-slate-900 dark:text-white">
            Refund Policy:
          </span>{' '}
          30-day money-back guarantee
        </p>
      </div>

      {/* Promo Code */}
      <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
        <details className="cursor-pointer">
          <summary className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
            Have a promo code?
          </summary>
          <div className="mt-3 flex gap-2">
            <input
              type="text"
              placeholder="Enter code"
              className="flex-1 px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
            />
            <button className="px-4 py-2 text-sm font-medium bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
              Apply
            </button>
          </div>
        </details>
      </div>
    </div>
  )
}
