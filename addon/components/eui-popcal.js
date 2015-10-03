import styleSupport from '../mixins/style-support';
import animationSupport from '../mixins/animation-support';
import popcalLayout from '../templates/components/eui-popcal';
import renderOnBody from '../mixins/render-on-body';

import '../utilities/position';
import '../animations/popcal-open-default';
import '../animations/popcal-close-default';

export default Ember.Component.extend(styleSupport, animationSupport, renderOnBody, {
  layout: popcalLayout,
  classNames: ['eui-popcal'],
  attributeBindings: ['tabindex'],
  tagName: 'eui-popcal',

  animationClass: 'euiPopcal',

  // We don't really want to modal to be focusable, but we do need it to catch
  // all key presses
  tabindex: 0,

  // If the popcal is opened using the keyboard then we use this value to
  // restore the focus where it was after the popcal closes.
  previousFocus: null,

  hide(attrs) {
    if (attrs && attrs.selectionDidChange && attrs.selection) {
      this.sendAction('selectionDidChange', attrs.selection);
    }

    return this.animateOut({
      target: this.get('targetObject').$(),
      complete: () => {
        return this.breakdown();
      }
    });
  },

  setup: Ember.on('didInsertElement', function() {
    this.animateIn();

    this.set('previousFocus', $(document.activeElement));

    // Set status to open
    this.set('isOpen', true);

    // Set user selection to internal selection
    this.set('_selection', this.get('selection'));

    // Positions calendar using fixed positioning
    this.$().find('.eui-component').position({
      my: "center top",
      at: "center bottom",
      of: this.get('targetObject').$(),
      collision: 'flipfit'
    });

    // Focus on popcal to ensure we can catch keyboard input.
    this.$().focus();

    return this.disablePageScroll();
  }),

  breakdown() {
    this.get('previousFocus').focus();

    // Set status to closed
    this.set('isOpen', false);

    this.enablePageScroll();

    // Update selection if it is valid
    if (!(this.get('dateRange') && this.get('_selection') && this.get('_selection.length') === 1)) {
      return this.set('selection', this.get('_selection'));
    }
  },


  actions: {
    closeCalendar() {
      const dateRange = this.get('dateRange');
      const selection = this.get('_selection');

      if (!selection) {
        return;
      }

      // Close if user has a complete date range selected
      if (dateRange && selection.length > 1) {
        this.hide({
          selectionDidChange: true,
          selection: selection
        });

      // Close if single date mode and they have made a selection
    } else if (!dateRange && selection) {
        this.hide({
          selectionDidChange: true,
          selection: selection
        });
      }
    },

    hidePopcal() {
      return this.hide();
    }
  },

  keyUp(event) {
    // ESC
    if (event.keyCode === 27) {
      return this.hide();
    }
  }
});
