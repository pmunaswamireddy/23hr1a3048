# Logging Middleware

This is a simple helper middleware for logging info/error/debug messages to the central evaluation logging server.

## How to use:

1. Import it in your code:
```javascript
const { Log, configure } = require("./logging-middleware");
```

2. Set the token (done automatically at startup):
```javascript
configure(accessToken);
```

3. Call the Log function:
```javascript
await Log("backend", "info", "route", "server started on port 3001");
```

## Options:
* stacks: backend, frontend
* levels: debug, info, warn, error, fatal
* packages: cache, controller, cron_job, db, domain, handler, repository, route, service, auth, config, middleware, utils
