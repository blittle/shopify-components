import { createCustomAttribute, CustomAttribute } from "../custom-attribute";
import { cartEmitter } from "../event-emitter";

interface CartUpdateEvent extends Event {
  detail?: {
    checkoutUrl?: string;
  };
}

class Checkout extends CustomAttribute {
  setHref: EventListener;

  constructor(el: Element) {
    super(el);
    this.setHref = (event: CartUpdateEvent) => {
      const checkoutUrl = event?.detail?.checkoutUrl;
      if (checkoutUrl) {
        el.setAttribute("href", checkoutUrl);
      }
    };
  }

  connectedCallback(): void {
    cartEmitter.on("cart:initialized", this.setHref);
  }

  disconnectedCallback(): void {
    cartEmitter.off("cart:initialized", this.setHref);
  }
}

createCustomAttribute("checkout", Checkout);
