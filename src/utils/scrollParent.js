const SCROLL_REGEX = /(scroll|auto)/;

/**
 * Finds the first scrollable parent of a DOM element.
 * If no scrollable parent is found, returns the document element.
 * If no element is provided, returns the document element.
 *
 * @param {Element} element - The DOM element to search from.
 * @returns {Element} - The first scrollable parent or the document element.
 */
const scrollParent = (element) => {
  if (!element) {
    return document.documentElement;
  }

  const excludeStaticParent = element.style.position === "absolute";
  let parent = element;

  while (parent) {
    // If we reach the top of the DOM tree, return the document element
    if (!parent.parentNode) {
      return document.documentElement;
    }

    const style = window.getComputedStyle(parent);
    const position = style.position;
    const overflow = style.overflow;
    const overflowX = style["overflow-x"];
    const overflowY = style["overflow-y"];

    // Skip static positioned parents if we're looking for non-static ones
    if (position === "static" && excludeStaticParent) {
      parent = parent.parentNode;
      continue;
    }

    // If the parent has scrollable overflow in both directions, return it
    if (
      SCROLL_REGEX.test(overflow) &&
      SCROLL_REGEX.test(overflowX) &&
      SCROLL_REGEX.test(overflowY)
    ) {
      return parent;
    }

    // Otherwise, continue up the DOM tree
    parent = parent.parentNode;
  }

  // If no scrollable parent is found, return the document element
  return document.documentElement;
};

export default scrollParent;
