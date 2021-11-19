/**
 * Create container inside the defined selector
 *
 * @param {string} selector the selector of the existing element in the DOM.
 * @param {string} [containerId = "custom-space-element"] Optional. Used as the id of generated container.
 * @param {boolean} [isAppendToLast = false] true will append the element. false will prepend the element.
 *
 * @returns {HTMLElement} the generated element.
 *
 * @todo 仕様書の日本語の訳
 */

export const createContainer = (
  selector,
  containerId = 'custom-space-element',
  isAppendBefore = false
) => {

  document.getElementById(containerId)?.remove();

  const DOMRoot = document.querySelector(selector);
  const container = document.createElement('span');
  container.id = containerId;

  if (isAppendBefore) {
    DOMRoot.prepend(container);
  } else {
    DOMRoot.append(container);
  }

  return document.getElementById(containerId);
};