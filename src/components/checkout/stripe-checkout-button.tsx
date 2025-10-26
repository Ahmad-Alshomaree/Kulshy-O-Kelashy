"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCreateCheckoutSession } from "@/lib/api/orders";
import { toast } from "sonner";
import { Loader2, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";

interface StripeCheckoutButtonProps {
  className?: string;
}

export function StripeCheckoutButton({ className }: StripeCheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { items, clearCart } = useCartStore();
  const { mutateAsync: createCheckoutSession } = useCreateCheckoutSession();

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsLoading(true);

    try {
      // Prepare items for checkout
      const checkoutItems = items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      }));

      // Create checkout session
      const { sessionUrl } = await createCheckoutSession({
        items: checkoutItems,
        successUrl: `${window.location.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/cart`,
      });

      // Redirect to Stripe checkout
      if (sessionUrl) {
        window.location.href = sessionUrl;
      }
    } catch (error: any) {
      console.error("Checkout error:", error);
      toast.error(error.message || "Failed to start checkout");
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleCheckout}
      disabled={isLoading || items.length === 0}
      className={className}
      size="lg"
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <ShoppingCart className="w-4 h-4 mr-2" />
          Proceed to Checkout
        </>
      )}
    </Button>
  );
}
