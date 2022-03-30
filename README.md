# Control Panel

## Contents

- [Getting Started](#getting-started)
- [Principles and Design Choices](#principles-and-design-choices)
- [Overall Application Description and Terminology](#overall-application-description-and-terminology)
- [Mobile Responsiveness and Accessibility](#mobile-responsiveness-and-accessiblity)
- [With more time, this app could be improved with](#with-more-time-this-app-could-be-improved-with)
- [Bundling and Development Server](#bundling-and-development-server)
- [Files and Components Explained in Depth ](#files-and-components-explained-in-depth)
  - [index.html](#index.html)
  - [main.ts](#main.ts)
  - [data.ts](#data.ts)
  - [create-control-panel-item.ts](#create-control-panel-item.ts)
  - [theme.ts](#theme.ts)
  - [control-panel-group.ts](#control-panel-group.ts)
  - [control-panel-item.ts](#control-panel-item.ts)
  - [notifications.ts](#notifications.ts)
  - [slider.ts](#slider.ts)
  - [toggle-button.ts](#toggle-button.ts)

#

## Getting started

```
npm ci
npm start
```

Then navigate to `localhost:8080`.

Alternatively to host on a server, you can build the app:

```
npm run build
```

You can then add the `index.html` file in the root of your folder along with the built assets in the `dist` folder to the server of your choice to be served.

#

## Principles and Design Choices

On this project, web components are used to provide reusable and encapsulated items that can be extended and reused to progress the application futher in future.
Typescript is used throughout to help spot errors earlier and to futher increase the maintainabily and extendability of the app.

Slots are used to keep components open so that they do not care about their contents. This makes them much more extensible in future rather than using attributes.

The project does not currently use any third party depenedencies at run time.

The styling of the application is not great and could be massively improved. I chose to spend more time on component architecture and setting the foundations for the app to be extended an improved in future.

#

## Overall Application Description and Terminology

Running the application will give you a webpage with 2 main panels: 'Lights' and 'Other'. These panels are refered to as "Control panel groups". We could in future add more control panel groups such as "Garden" or "Kitchen Appliances"

Each "Control panel group" contains multiple "Control panel items". Each 'item' consists of a label and a Control.

Currently there are 2 different types of Control - Toggle Button and Slider.

Toggle button is used for appliances where there is either an off or on state, e.g a normal light switch.

The slider is used for things that have a range of values, e.g. a Thermostat or a dimmer light.

The application is built in a way that we could easily add a new type of Control such as a timer or standard button.

Each control fires an event on change which can be listened to by any other components and used to do something.

At the top of the application, there is a very quickly put together 'Notification' component. This shows how the applications event system works by listening for events fired by the controls and notifying the user with an (ugly) text prompt.

#

## Mobile Responsiveness and Accessibility

All controls should be fully accessible and controllable by keyboard. Screen readers should also be able to pick up useful and meaningful labels on every control.

Some very basic mobile responsiveness has been added in to ensure that the page works for all screen sizes, but this can be greatly improved.

#

## With more time, this app could be improved with

- much better styling
- separation of CSS, HTML and JS
- including Prettier and ESLint configuration in the app root to allow for multiple devs to use it
- separating the components into a more detailed folder structure like: 'layout' and 'design-system'
- Extending the controls to create different types
- Putting more of the styling into the 'theme' (see theme.js section below)
- Logging and error handling

#

## Bundling and Development Server

Webpack is used to create a dev server for the app and to bundle it in production. There are a number of things that we could do here to improve it:

- minification + uglify the JS to make it smaller when served in production.
- add css loaders to allow the CSS to be extracted into css files (writing CSS inside a string is not as scalable and error prone.)
- add html loaders to allow the html to be extracted into html files (like CSS doing this in a string is error prone and hampers scalability.)

Using webpack also seems like 'overkill' for this site, we could use a much smaller and less complicated bundler.

#

## Files and Components Explained in Depth

<p>&nbsp;</p>

### index.html

There is not much interesting to not here. I only added a title element and meta description to the HTML as good practice.

<p>&nbsp;</p>

### main.ts

This is the entrance point for the application. The HTML at the top creates the frame for the application with a simple header and main section. It also applies the base styles (see `theme.ts` section).

The JS part of `main.ts` takes the HOUSE_CONTROLS and iterates through the groups of controls. For each group it creates a new `control-panel-group` element. It then maps the control data to create and append `control-panel-items` to the document.

<p>&nbsp;</p>

### data.ts

This file holds both the types for the data and the data itself (if the file grows any larger, I would separate these 2 into a types file and a data file). The data is just an object representation of the control panel. This could in future be fetched from an API etc.

We can also easily expand the types to add a new control type.

<p>&nbsp;</p>

### create-control-panel-item.ts

This file has a function that receives a 'control' in object form. It then uses this data to create a `control-panel-item` element. Currently it uses a switch case statement with 2 seperate functions to build toggle and slider controls. This can be easily extended to add new control types.

<p>&nbsp;</p>

### theme.ts

Here is a base file that contains a basic theme in the form of CSS Variables. The idea is that the variables can be used throughout the app to keep it consistent and also allow us in future to change variables in one place and then have that persist throughout the whole app.

With more time, I would move most of the CSS in the app to using the variables in the `theme.ts` file. This would mean that we could even have a panel that allows the user to change the colors and styles of their control panel to have it fit their preferences and needs.

<p>&nbsp;</p>

### notifications.ts

This component is mainly used to show how the event system in the application works.
For each control in the data, we take the 'eventId' prop, and listen for this event being fired.

When an event is fired, we create a message based off the event and control details. We then display that message on the screen for 3 seconds.

If a new event is received before the 3 seconds has elapsed, the new event replaces the old one and the 3 second timer is reset.

This component could be improved with much better styling / fade in / fade out. It would also be better to build it as a queue so that you can show multiple 'events' at the same time. However, this component is mainly to show that all the event mechanisms built into the app work.

All the events are removed on unmount.

<p>&nbsp;</p>

### control-panel-group.ts

This is a very basic layout component. It just renders the title of the group and hosts a slot for all the control panel items to be rendered in.

<p>&nbsp;</p>

### control-panel-item.ts

This is also a basic layout component. It has 2 slots 'label' and 'controller'. These slots are aligned side by side apart from on small screens where we go for an under/over layout.

<p>&nbsp;</p>

### toggle-button.ts

This is a simple toggle. It should follow aria standards to allow it to be easily accessible. At the top of the JS class is the [following documentation](./src/components/toggle-button.ts) explaining the attributes that can be passed in.

On toggle, two things happen:

1. We change the text that accompanies the toggle button in the UI to reflect the state (on/off).
2. If an event ID is supplied, we fire and event to let any listening components know what has changed.

This component could be improved and expanded to have things like a disabled state an styles that are customised using the theme file.

<p>&nbsp;</p>

### slider.ts

This is a sliding scale component. It should follow aria standards to allow it to be easily accessible. At the top of the JS class is the [following documentation](./src/components/slider.ts) explaining the attributes that can be passed in.

On slide, we update the numerical value shown and dispatch an event if and eventId is provided.

This component could be improved or expanded to have things like steps and more customisable styles that use the theme file.

<p>&nbsp;</p>

## Resources

- [This medium block on getting set up with webcomponents and webpack](https://javascript.plainenglish.io/build-your-own-blog-portfolio-with-web-components-typescript-adfbcd917d96)

- [W3 used to get a lot of the styling for the toggle element](https://www.w3schools.com/howto/howto_css_switch.asp)

- [W3 used to get a start on the styling of the slider](https://www.w3schools.com/howto/howto_js_rangeslider.asp)
