/* Code based on ember-modal-dialog initializer */
let hasDOM = typeof document !== 'undefined';

function appendContainerElement(rootElementId, id) {
  if (!hasDOM) {
    return;
  }

  if (document.getElementById(id)) {
    return;
  }

  let rootEl = document.querySelector(rootElementId);
  let modalContainerEl = document.createElement('div');
  modalContainerEl.id = id;
  rootEl.appendChild(modalContainerEl);
}

export default function() {
  let application = arguments[1] || arguments[0];


  appendContainerElement(application.rootElement, 'eui-popup-destination');
}
