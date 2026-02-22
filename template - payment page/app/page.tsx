'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import PaymentForm from '@/components/payment-form'
import OrderSummary from '@/components/order-summary'
import LoadingPage from '@/components/loading-page'

const PLANS = {
  starter: { id: 'starter', name: 'Starter', price: 9.99 },
  pro: { id: 'pro', name: 'Professional', price: 29.99 },
  enterprise: { id: 'enterprise', name: 'Enterprise', price: 99.99 },
}

const ONE_TIME_ITEMS = [
  { name: 'Premium Product', price: 49.99 },
  { name: 'Setup Fee', price: 0 },
  { name: 'Processing Fee', price: 2.5 },
]

export default function PaymentPage() {
  const [isSubscription, setIsSubscription] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [showLoading, setShowLoading] = useState(true)

  // Calculate total amount
  const total = (() => {
    if (isSubscription && selectedPlan) {
      const plan = PLANS[selectedPlan as keyof typeof PLANS]
      const subtotal = plan.price
      const tax = Math.round(subtotal * 0.1 * 100) / 100
      return Math.round((subtotal + tax) * 100) / 100
    } else {
      const subtotal = ONE_TIME_ITEMS.reduce((sum, item) => sum + item.price, 0)
      const tax = Math.round(subtotal * 0.1 * 100) / 100
      return Math.round((subtotal + tax) * 100) / 100
    }
  })()

  return (
    <>
      <LoadingPage onLoadComplete={() => setShowLoading(false)} />
      {!showLoading && (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 py-8 px-4 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 text-balance">
            Complete Your Purchase
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 text-balance">
            Choose your plan and secure payment method
          </p>
        </div>

        {/* Payment Type Toggle */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex gap-2 bg-white dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => {
                setIsSubscription(false)
                setSelectedPlan(null)
              }}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                !isSubscription
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              One-Time Purchase
            </button>
            <button
              onClick={() => {
                setIsSubscription(true)
                setSelectedPlan(null)
              }}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                isSubscription
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Subscription
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="md:col-span-2">
            {/* Plan Selection */}
            {isSubscription && (
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-8">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
                  Choose Your Plan
                </h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    {
                      id: 'starter',
                      name: 'Starter',
                      price: 9.99,
                      description: 'For individuals',
                      features: ['10 projects', '5GB storage', 'Email support'],
                    },
                    {
                      id: 'pro',
                      name: 'Professional',
                      price: 29.99,
                      description: 'For teams',
                      features: ['Unlimited projects', '100GB storage', 'Priority support'],
                    },
                    {
                      id: 'enterprise',
                      name: 'Enterprise',
                      price: 99.99,
                      description: 'For enterprises',
                      features: ['Everything', 'Custom storage', '24/7 dedicated support'],
                    },
                  ].map((plan, index) => (
                    <button
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan.id)}
                      style={{ animationDelay: `${index * 100}ms` }}
                      className={`p-4 rounded-lg border-2 transition-all text-left animate-scale-in hover:scale-105 ${
                        selectedPlan === plan.id
                          ? 'border-blue-600 bg-blue-50 dark:bg-slate-700 dark:border-blue-500'
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                      }`}
                    >
                      <div className="font-semibold text-slate-900 dark:text-white mb-1">
                        {plan.name}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                        {plan.description}
                      </div>
                      <div className="text-2xl font-bold text-slate-900 dark:text-white">
                        ${plan.price}
                        <span className="text-sm font-normal text-slate-600 dark:text-slate-400">
                          /mo
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Payment Methods */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
                Payment Method
              </h2>
              <Tabs defaultValue="stripe" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="stripe" className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M13.76 5.783c-.645 0-1.044.399-1.044 1.044 0 .645.399 1.044 1.044 1.044.645 0 1.044-.399 1.044-1.044 0-.645-.399-1.044-1.044-1.044zM11 9h5.5v1H11z" />
                    </svg>
                    Stripe
                  </TabsTrigger>
                  <TabsTrigger value="paypal" className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M9.5 7c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5z" />
                    </svg>
                    PayPal
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="stripe">
                  <PaymentForm provider="stripe" amount={total} />
                </TabsContent>

                <TabsContent value="paypal">
                  <PaymentForm provider="paypal" amount={total} />
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Order Summary */}
          <OrderSummary
            isSubscription={isSubscription}
            selectedPlan={selectedPlan}
          />
        </div>

        {/* Security Notice */}
        <div className="text-center text-sm text-slate-600 dark:text-slate-400">
          <p className="flex items-center justify-center gap-2">
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            Your payment information is encrypted and secure
          </p>
        </div>
      </div>
      </div>
      )}
    </>
  )
}
