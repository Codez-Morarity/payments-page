'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const stripeSchema = z.object({
  cardName: z.string().min(1, 'Cardholder name is required'),
  cardNumber: z
    .string()
    .regex(/^\d{16}$/, 'Card number must be 16 digits'),
  expiryDate: z
    .string()
    .regex(/^\d{2}\/\d{2}$/, 'Format: MM/YY'),
  cvc: z.string().regex(/^\d{3,4}$/, 'CVC must be 3-4 digits'),
  email: z.string().email('Invalid email address'),
})

const paypalSchema = z.object({
  email: z.string().email('Invalid email address'),
  confirmEmail: z.string().email('Invalid email address'),
})

type StripeFormData = z.infer<typeof stripeSchema>
type PayPalFormData = z.infer<typeof paypalSchema>

export default function PaymentForm({
  provider,
  amount,
}: {
  provider: 'stripe' | 'paypal'
  amount: number
}) {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isStripe = provider === 'stripe'
  const schema = isStripe ? stripeSchema : paypalSchema
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: any) => {
    setError(null)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      console.log('[v0] Payment submitted:', { provider, data })
      setSubmitted(true)
      reset()
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000)
    } catch (err) {
      setError('Payment failed. Please try again.')
      console.log('[v0] Payment error:', err)
    }
  }

  if (submitted) {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
        <svg
          className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-3"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
        <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
          Payment Successful!
        </h3>
        <p className="text-green-700 dark:text-green-300 mb-4">
          Thank you for your purchase. A confirmation has been sent to your email.
        </p>
        <Button
          onClick={() => setSubmitted(false)}
          variant="outline"
          className="border-green-300 text-green-700 hover:bg-green-100 dark:border-green-700 dark:text-green-300 dark:hover:bg-green-900/30"
        >
          Make Another Payment
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Payment Amount Display */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex justify-between items-center animate-scale-in animate-pulse-ring">
        <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
          Total Amount to Pay:
        </span>
        <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          ${amount.toFixed(2)}
        </span>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-700 dark:text-red-300">
          {error}
        </div>
      )}

      {isStripe ? (
        <>
          {/* Email */}
          <div className="animate-slide-left animate-delay-100">
            <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
              Email Address
            </label>
            <Input
              type="email"
              placeholder="you@example.com"
              {...register('email')}
              className="w-full"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message as string}</p>
            )}
          </div>

          {/* Card Holder Name */}
          <div className="animate-slide-left animate-delay-200">
            <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
              Cardholder Name
            </label>
            <Input
              placeholder="John Doe"
              {...register('cardName')}
              className="w-full"
            />
            {errors.cardName && (
              <p className="text-red-500 text-sm mt-1">{errors.cardName.message as string}</p>
            )}
          </div>

          {/* Card Number */}
          <div className="animate-slide-left animate-delay-300">
            <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
              Card Number
            </label>
            <Input
              placeholder="4242 4242 4242 4242"
              {...register('cardNumber')}
              maxLength={16}
              className="w-full"
            />
            {errors.cardNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.cardNumber.message as string}</p>
            )}
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Test card: 4242 4242 4242 4242
            </p>
          </div>

          {/* Expiry and CVC */}
          <div className="grid grid-cols-2 gap-4 animate-slide-left animate-delay-400">
            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                Expiry Date
              </label>
              <Input
                placeholder="MM/YY"
                {...register('expiryDate')}
                maxLength={5}
                className="w-full"
              />
              {errors.expiryDate && (
                <p className="text-red-500 text-sm mt-1">{errors.expiryDate.message as string}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                CVC
              </label>
              <Input
                placeholder="123"
                {...register('cvc')}
                maxLength={4}
                className="w-full"
              />
              {errors.cvc && (
                <p className="text-red-500 text-sm mt-1">{errors.cvc.message as string}</p>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          {/* PayPal Email */}
          <div>
            <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
              PayPal Email
            </label>
            <Input
              type="email"
              placeholder="your-paypal@example.com"
              {...register('email')}
              className="w-full"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message as string}</p>
            )}
          </div>

          {/* Confirm Email */}
          <div>
            <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
              Confirm Email
            </label>
            <Input
              type="email"
              placeholder="your-paypal@example.com"
              {...register('confirmEmail')}
              className="w-full"
            />
            {errors.confirmEmail && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmEmail.message as string}</p>
            )}
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-sm text-blue-700 dark:text-blue-300">
            You will be redirected to PayPal to complete your payment securely.
          </div>
        </>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50"
      >
        {isSubmitting ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Processing...
          </div>
        ) : (
          `Pay $${amount.toFixed(2)} with ${provider === 'stripe' ? 'Card' : 'PayPal'}`
        )}
      </Button>

      {/* Security Info */}
      <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
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
        <span>Your payment details are secure and encrypted with SSL</span>
      </div>
    </form>
  )
}
