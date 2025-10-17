"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Phone, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

export default function ContactPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setName("")
      setEmail("")
      setSubject("")
      setMessage("")
    }, 1500)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-palette-darkGreen mb-2">Contact Us</h1>
        <p className="text-palette-darkGreen/70">
          We're here to help. Send us a message and we'll respond as soon as possible.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-palette-cream/50 flex items-center justify-center mb-4 mt-2">
              <Mail className="h-6 w-6 text-palette-olive" />
            </div>
            <h3 className="font-medium text-lg text-palette-darkGreen">Email Us</h3>
            <p className="text-palette-darkGreen/70 mt-1">support@kulshyoklashy.com</p>
            <p className="text-palette-darkGreen/70 text-sm mt-1">We'll respond within 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-palette-cream/50 flex items-center justify-center mb-4 mt-2">
              <Phone className="h-6 w-6 text-palette-olive" />
            </div>
            <h3 className="font-medium text-lg text-palette-darkGreen">Call Us</h3>
            <p className="text-palette-darkGreen/70 mt-1">+1 (555) 123-4567</p>
            <p className="text-palette-darkGreen/70 text-sm mt-1">Mon-Fri, 9am-5pm EST</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-palette-cream/50 flex items-center justify-center mb-4 mt-2">
              <MessageSquare className="h-6 w-6 text-palette-olive" />
            </div>
            <h3 className="font-medium text-lg text-palette-darkGreen">Live Chat</h3>
            <p className="text-palette-darkGreen/70 mt-1">Chat with our support team</p>
            <p className="text-palette-darkGreen/70 text-sm mt-1">Available 24/7</p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white rounded-lg">
        {isSubmitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-palette-darkGreen mb-2">Message Sent!</h3>
            <p className="text-palette-darkGreen/70 mb-6">
              Thank you for contacting us. We'll get back to you shortly.
            </p>
            <Button
              onClick={() => setIsSubmitted(false)}
              className="bg-palette-darkGreen hover:bg-palette-olive text-white"
            >
              Send Another Message
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name" className="text-palette-darkGreen">
                  Your Name
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="mt-1 border-palette-taupe/50 focus:border-palette-olive focus:ring-palette-olive"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-palette-darkGreen">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="mt-1 border-palette-taupe/50 focus:border-palette-olive focus:ring-palette-olive"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="subject" className="text-palette-darkGreen">
                Subject
              </Label>
              <Select value={subject} onValueChange={setSubject} required>
                <SelectTrigger className="w-full mt-1 border-palette-taupe/50 focus:border-palette-olive focus:ring-palette-olive">
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="order">Order Inquiry</SelectItem>
                  <SelectItem value="return">Return/Refund</SelectItem>
                  <SelectItem value="product">Product Information</SelectItem>
                  <SelectItem value="shipping">Shipping Question</SelectItem>
                  <SelectItem value="account">Account Help</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="message" className="text-palette-darkGreen">
                Message
              </Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we help you?"
                className="mt-1 min-h-[150px] border-palette-taupe/50 focus:border-palette-olive focus:ring-palette-olive"
                required
              />
            </div>

            <Button
              type="submit"
              className="bg-palette-darkGreen hover:bg-palette-olive text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
