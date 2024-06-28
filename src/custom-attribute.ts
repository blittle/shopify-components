interface ElementWithCustomAttribute extends Element {
  customAttributeSetup?: boolean;
}

interface CustomAttributeConstructor {
  new (el: Element): CustomAttribute;
}

const attrMap = new Map();

export class CustomAttribute {
  el: Element;
  constructor(el: Element) {
    this.el = el;
  }

  connectedCallback(el: Element) {}
  disconnectedCallback(el: Element) {}
}

export function createCustomAttribute(
  name: string,
  impl: CustomAttributeConstructor
) {
  const cb = setupCustomAttribute.bind(null, impl);

  document.querySelectorAll(`[shopify-${name}]`).forEach((el) => cb(el));

  const observer = new MutationObserver(function () {
    document
      .querySelectorAll(`[shopify-${name}]`)
      .forEach(setupCustomAttribute.bind(null, impl));

    for (const key of attrMap.keys()) {
      if (!document.body.contains(key)) {
        const attr = attrMap.get(key);
        attr.disconnectedCallback(key);
        attrMap.delete(key);
      }
    }
  });

  observer.observe(document.body, {
    attributes: true,
    childList: true,
    subtree: true,
  });
}

function setupCustomAttribute(
  impl: (el: Element) => void,
  el: ElementWithCustomAttribute
) {
  if (el.customAttributeSetup) return;
  el.customAttributeSetup = true;
  const attr = new impl(el);
  attr.connectedCallback();
  attrMap.set(el, attr);
}
