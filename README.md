# Itinerary, by travel.cloud

# Temporary extra step (remove once call to actual bookings endpoint has been completed)
Install `json-server` (`npm i -g json-server`), and run `json-server db.json` from the root of this project. You'll need to keep this command running in order to serve the mock data that the application is using.

# Development

Pre-requisite: Elm 0.19 (https://guide.elm-lang.org/install.html)

To build the app, you need to compile src/Main.elm to public/itinerary.js. Do this with:

```elm make src/Main.elm --output=public/itinerary.js```

For development, you'll probably want to add the `--debug` flag, but if you're finished development and want to upload, use `--optimize`.

For a live-reload environment, you can use elm-live. Install it globally with npm install -g elm-live, and then start it with ```elm-live --dir public -- src/Main.elm --output=public/itinerary.js --debug```
