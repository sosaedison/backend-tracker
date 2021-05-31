# Voxel Time Tracker Backend

API for voxel tracker software. This API is built with Node.js and Express. Using a personal MongoDB instance for a datastore.

# Usage

All you need to run this app Node.js and a terminal. cd into the `BACKEND-TRACKER` directory, then run:

- `npm install`
- `npm run dev` to run the dev server with nodemon watching for changes.

## Application Structure

---

This API is run out of server.js with the only routes for the time being living in user.js.

### Models

---

Models is a directory that holds the model schema used in MongoDB requests. The user routes manipulate data from mongo, using the predefined schema.

### Config

---

`Config/` doesn't have much now but it will hold all constant exit/error codes for things not related to REST API status codes.

# Roadmap

May 31, 2021: I would like to finalize this API by the end of June and writing this README is actually a part of a bigger roadmap to get my developer skills up.
