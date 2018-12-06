[![npm version](https://badge.fury.io/js/%40microsoft%2Fmezzurite-react.svg)](https://badge.fury.io/js/%40microsoft%2Fmezzurite-react)

# Mezzurite-React

## Requirements:


**For component tracking:** 
```json
    "@microsoft/mezzurite-core": "^1.0.1",
    "intersection-observer": "^0.5.0", // legacy browser support
    "react": "^16.4.2"
```
**for full app tracking:**
```json
    "@microsoft/mezzurite-core": "^1.0.1",
    "intersection-observer": "^0.5.0", // legacy browser support
    "react": "^16.4.2",
    "react-dom": "^16.4.2",
    "react-router": "^4.3.1"
```

## Onboarding


### Installation
Install mezzurite from npm:
```javascript
  npm install "@microsoft/mezzurite-react"
```

** **You will be adding Mezzurite functionality through the use of Higher Order Components (HOC), which is a component structure that takes in an existing component and return a modified version** **

### Full Application Implementation (ALT, VLT, Components)
** **If you do not have access to the application's routing service, skip to next section on "Tracking Components"** **
1. Inside main App module, add following import statement:
```javascript
import {withMezzuriteRouter} from '@microsoft/mezzurite-react';
```
2. Wrap your exported component in the **withMezzuriteRouter** higher order component. This will add Mezzurite functionality to your app router:
```javascript
// old export
export default App;

// new export
export default withMezzuriteRouter(App);
```
If using Redux, you will need to use the compose component:
```javascript
// add to imports
import {compose} from 'redux';

...

// old Redux export
export default connect(mapStateToProps, mapDispatchToProps)(App);

// new Redux export using Mezzurite
export default compose(connect(mapStateToProps, mapDispatchToProps), withMezzuriteRouter)(App);
```

### Tracking Components
1. In the component you want to track, add an import statement for mezzurite-react:
```javascript
import {withMezzurite} from '@microsoft/mezzurite-react';
```
2. Wrap your exported component in the **withMezzurite** higher order component. This will add Mezzurite functionality to this specific component:
```javascript
// old export
export default ExampleComponent;

// new export
export default withMezzurite(ExampleComponent);
```

