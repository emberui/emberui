EmberUI
=======

A component library for crafting ambitious interfaces.


Documentation, Demos
====================

http://emberui.com

https://speakerdeck.com/jacojoubert/emberui


Project Goals
=============

* comprehensive set of high-quality components

* carefully designed with close attention to detail

* solid implementation that also supports interop with other libraries


Status
======

EmberUI is still an alpha project but is being actively developed and stabilizing quickly.


Get some
========

http://emberjs.jsbin.com/hisogu

**or**

https://github.com/emberui/emberui/tree/master/dist

**or**

```javascript
// yourproject/bower.json
{
  {
  "name": "your-project",
  "dependencies": {
    "handlebars": "~1.1.2",
    "jquery": "^1.11.1",
    "ember": "^1.5.0",
    "ember-resolver": "~0.1.1",
    "loader.js": "git://github.com/stefanpenner/loader.js",
    "ember-list-view": "http://builds.emberjs.com/list-view/list-view-latest.js",
    "emberui": "^0.4.1",
    "momentjs": "~2.6.0",
    "twix": "~0.4.0",
    "velocity": "~0.9.0"
  }
}
```

`$ npm install`

**note:** Until the first beta release is cut, please use `$ bower update emberui` when you need to update EmberUI in your project.

There are also some css files that need to be included. The `emberui.css` stylesheet is required, but `default-theme.css` is optional if you are creating your own theme.

```
<link rel="stylesheet" href="/vendor/emberui/dist/emberui.css">
<link rel="stylesheet" href="/vendor/emberui/dist/default-theme.css">
```

# Contributing

This project uses Github issues for both issue tracking and development planning. If something doesn't seem right open an issue.

The website (http://emberui.com) repo is at https://github.com/emberui/website. Same deal with issues and development.

## Pull Requests

There is still a lot of work left to do with EmberUI and we would love your help. Here is a quick guide to making pull requests (largely cribbed from https://raw.github.com/emberjs/ember.js/master/CONTRIBUTING.md):

1. Fork the repo.

2. Run the tests. Our test coverage isn't great (yet) and we could use some help improving it. See below for build/test instructions.

3. Try to add a test for your change. We understand that certain things are very difficult to isolate in a test (e.g. test that scroll is disabled when select component is open and pointer is not positioned over open select), but do your best. Refactoring and documentation changes don't (necessarily) require new tests.

4. Make the test pass (if you can).

5. Commit your changes. If your pull request fixes an issue specify it in the commit message.
Here's an example: `git commit -m "Close #52 – Fix controller and viewbindings"`

6. Push to your fork and submit a pull request. Please provide us with some explanation of why you made the changes you made. For new features make sure to explain a standard use case to us.

## Syntax

* Two spaces, no tabs.
* No trailing whitespace. Blank lines should not have any space.
* a = b and not a=b.
* Try to keep lines 80 characters or less in length.
* Newline at end of file.
* Follow the conventions you see used in the source already.

## Building and running the project

`$ npm install -g broccoli-cli`

`$ npm install -g testem`

`$ broccoli serve`

*and in another shell*

`$ testem`


# Thanks

@ghedamat for many bug fixes, tooling, tests

@heycarsten for the first version of the calendar

@addepar, @ryanflorence for component code
