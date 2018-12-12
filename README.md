# Meteor React Latest

Start kit repository using:
- Meteor (build tool, backend/frontend setup)
- GraphQL with Apollo (apollo server and apollo react client)
- React (view)
- Material-UI (UI component library)
- Flexbox (css feature to organize HTML elements)

The goal is always to keep this repository up-to-date dependency-wise and with great organization. We can also extract common parts and publish npm and meteor packages, that way this repository can be cloned or forked to start new products with this stack.

Maybe in the future we have a simple skeleton here that depends on external packages without any code to be deleted after cloned to create a new product. Right now we have sample and start kit code together.

To have a path to follow we choose to build a TODO App as a working sample, we know, there are a lot of them out there, it is just to practice and learn.

## How to setup
`
meteor npm install && npm run mgp
`
## How to run
`
npm start
`
## How to format before commit
`
meteor npm run style
`

# Auth setup

To control access to resources, this boilerplate implements auth centered around
Meteor's own accounts system.

Once you are logged in, you will be able to grab your user id via
`Meteor.userId()` anywhere on the front/back-end _except_ for in publish functions.

_In a publish function_, use `this.userId` in place of `Meteor.userId()`

## Enforcing resource ownership

Add a `userId` prop to mongo documents, set it to the current user's id using Meteor.userId(). See `imports/api/tasks/methods.js` for examples.

To enforce that a resource is being retrieved by the correct user, add `{ userId: this.userId }` to the graphQL query in the resource publication. See `imports/api/tasks/server/publications.js` for an example.

### Tokens

- `meteor-redux` uses Meteor login tokens to manage user sessions and login
- Setting `{ auth: true }` on a Meteor method will
  - Pass up the user's loginToken from the clientside to server through GQL and
  - Once on the server, will check the token against what is saved to the user.
  This is done by adding a graphQL field `token` on methods. See `imports/api/tasks/methods` for an example.

# How to Contribute with Ideas
Follow these steps:
- Open an issue with what you think will be good to have
- Mention a maintainer
- Discuss with the maintainer on the solution until you reach consensus
- Let clear on the issue what is the result expected to consider this issue done

# How to Contribute with Code
Follow these steps:
- Open an issue with what you want to do and how you would do
- Mention any maintainer
- Agree with the maintainer on the solution
- Fork the repo
- Let crystal clear that you will start to work on that
  - it is important to avoid two people doing the same thing at the same time
- Start a Pull Request
  - watch how to do it in the first 15 minutes of this [video](https://www.youtube.com/watch?v=TNoGHLZaTRg&t=4343s)
- Send your code
  - don't forget to format your code before commit and have zero eslint erros/warnings
  - commit message should contains the issue id with #
- Warn the maintainer that you are done
- Wait for the merge
- Start again :)

# Troubleshooting
If you get an error that references not being able to find `yarn:meteor-apollo-accounts`
- You can remedy this by running `npm run mgp` then starting the app again.

# Useful Links
- [Material-UI V1 Demo](https://material-ui-next.com/demos/app-bar/)
- [material.io Official Icons](https://material.io/icons/)
- [material.io Color Pallet](https://material.io/guidelines/style/color.html)
- [Material Community Icons](https://materialdesignicons.com/)
- [Flexbox Tricks](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [What We Can Do - PWA](https://whatwebcando.today/)
- [React Router API](https://reacttraining.com/react-router/web/api/BrowserRouter)
- [Apollo React Docs](https://www.apollographql.com/docs/react/)
- [Recompose API](https://github.com/acdlite/recompose/blob/master/docs/API.md)
- [Meteor Guide](https://guide.meteor.com/)
- [Meteor History](https://github.com/meteor/meteor/blob/devel/History.md)
- [Moment.js Docs](https://momentjs.com/docs/#/parsing/)
- [Immutable JS Docs](https://facebook.github.io/immutable-js/docs/#/)
