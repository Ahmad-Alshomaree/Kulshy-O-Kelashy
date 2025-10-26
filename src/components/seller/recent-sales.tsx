"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentSales() {
  // Mock data for recent sales
  const recentSales = [
    {
      customer: {
        name: "Olivia Martin",
        email: "olivia.martin@email.com",
        avatar: "/placeholder.svg?height=32&width=32&text=OM",
        initials: "OM",
      },
      amount: "$199.00",
      status: "Completed",
      date: "Just now",
    },
    {
      customer: {
        name: "Jackson Lee",
        email: "jackson.lee@email.com",
        avatar: "/placeholder.svg?height=32&width=32&text=JL",
        initials: "JL",
      },
      amount: "$39.00",
      status: "Completed",
      date: "2 minutes ago",
    },
    {
      customer: {
        name: "Isabella Nguyen",
        email: "isabella.nguyen@email.com",
        avatar: "/placeholder.svg?height=32&width=32&text=IN",
        initials: "IN",
      },
      amount: "$149.00",
      status: "Processing",
      date: "36 minutes ago",
    },
    {
      customer: {
        name: "William Kim",
        email: "will.kim@email.com",
        avatar: "/placeholder.svg?height=32&width=32&text=WK",
        initials: "WK",
      },
      amount: "$89.00",
      status: "Completed",
      date: "3 hours ago",
    },
    {
      customer: {
        name: "Sofia Davis",
        email: "sofia.davis@email.com",
        avatar: "/placeholder.svg?height=32&width=32&text=SD",
        initials: "SD",
      },
      amount: "$129.00",
      status: "Completed",
      date: "5 hours ago",
    },
  ]

  return (
    <div className="space-y-8">
      {recentSales.map((sale, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={sale.customer.avatar || "/placeholder.svg"} alt={sale.customer.name} />
            <AvatarFallback>{sale.customer.initials}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{sale.customer.name}</p>
            <p className="text-sm text-muted-foreground">{sale.customer.email}</p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-sm font-medium">{sale.amount}</p>
            <div className="flex items-center justify-end">
              <div
                className={`h-2 w-2 rounded-full mr-1 ${sale.status === "Completed" ? "bg-green-500" : "bg-amber-500"}`}
              />
              <p className="text-xs text-muted-foreground">{sale.date}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
