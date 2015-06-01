### 0.6.0

- [BREAKING] EmberUI now requires Ember 1.12
- Move to the new computed get/set syntax
- Add tmp/ folder to .npmignore

### 0.6.0

- [BREAKING] EmberUI is now a ember-cli addon. You need to uninstall the current version of EmberUI and re-install using `ember install emberui`. A global build is no longer supported. You can use [ember-giftwrap](https://github.com/ef4/ember-giftwrap) if you really need a global version.
- [ENHANCEMENT] Eliminate the use of an observer in the dropbutton component.
- [ENHANCEMENT] Poplist and Popcal are now a regular components. You can no longer use them by importing them and calling `show()`` on it. Use it via {{eui-poplist}} and {{eui-popcal}}.
- Add a new mixin called `render-on-body`. Mix it into components to have them render on the `body` element instead of where you include them. Useful for modals and popups that need to break out of their current HTML context.
- [ENHANCEMENT] Fix icon spacing on dropbutton.
