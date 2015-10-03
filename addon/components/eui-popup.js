import Ember from 'ember';
import preventPageScroll from '../mixins/prevent-page-scroll';
import renderOnBody from '../mixins/render-on-body';

import '../utilities/position';

export default Ember.Component.extend(preventPageScroll, renderOnBody, {
  tagName: 'eui-popup',
  classNames: ['eui-popup'],

  popupElementClassName: '.eui-popup--positioner',

  attachment: 'right top',
  target: null,
  targetAttachment: 'right bottom',

  width: null,

  setup: Ember.on('didInsertElement', function() {
    let element = this.$().find(this.get('popupElementClassName'))[0];

    this.positionPopup().then(() => {
      this.animateIn(element);
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
          of: target
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

  actions: {
    close(object) {
      this.breakdown().then(() => {
        this.attrs.onClose(object);
      });
    }
  }
});
