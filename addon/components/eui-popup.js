import Ember from 'ember';
import renderOnBody from '../mixins/render-on-body';

import '../utilities/position';

export default Ember.Component.extend(renderOnBody, {
  tagName: 'eui-popup',
  classNames: ['eui-popup'],
  attributeBindings: ['tabindex'],

  popupElementClassName: '.eui-popup--positioner',

  attachment: 'right top',
  target: null,
  targetAttachment: 'right bottom',

  width: null,

  // We don't really want to popup to be focusable, but we nede to focus on it
  // to catch all key presses
  tabindex: 0,

  setup: Ember.on('didInsertElement', function() {
    let element = this.$().find(this.get('popupElementClassName'))[0];

    this.positionPopup().then(() => {
      this.animateIn(element).then(() => {
        this.$().focus();
      });
    });
  }),

  breakdown() {
    let element = this.$().find(this.get('popupElementClassName'))[0];
    return this.animateOut(element);
  },

  positionPopup() {
    return new Ember.RSVP.Promise((resolve, reject) => {
      Ember.run.next(this, () => {
        let { element, attachment, target, targetAttachment } = this.getProperties('element', 'attachment', 'target', 'targetAttachment');

        element = $(element).find(this.get('popupElementClassName'))[0];

        $(element).position({
          my: attachment,
          at: targetAttachment,
          of: target,
          collision: 'flipfit'
        })

        resolve();
      });
    });
  },

  animateIn(element) {
    return new Ember.RSVP.Promise((resolve, reject) => { resolve });
  },

  animateOut(element) {
    return new Ember.RSVP.Promise((resolve, reject) => { resolve });
  },

  keyDown(event) {
    // ESC
    if (event.which === 27) {
      this.send('cancel');
    }
  },

  actions: {
    close(object) {
      this.breakdown().then(() => {
        this.attrs.onClose(object);
      });
    },

    // When using the {{action}} helper in the template it by default passes
    // in the event as a paramater to the action. This means we can't directly
    // use the cancel action and we need a middle action that strips out the event.
    cancel() {
      this.send('close');
    }
  }
});
