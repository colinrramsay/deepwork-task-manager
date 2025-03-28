# Deep Work Task Manager
Simple app for tracking to-do tasks with filtering for important, deep work tasks.

![alt tag](http://placecorgi.com/1200/650)

## How It's Made:

**Tech used:** MERN stack, Passport.js google auth + Express sessions, custom CSS

React front end with Node.js Express server handling API fetches for auth, user and task data. API endpoints are protected with auth middleware to verify login before delivering data, and React router redirects based on auth status.

## Optimizations

Tasks are held in state and updated locally to operate independently of fetch calls to Express. State is only fetch response depended on first mount to initialize tasks.

## Lessons Learned:

CORS between React and Express required careful setup to ensure credentials were passed for proper auth checks. Each server call needed to include the browser's session cookie, otherwise res.user and res.session objects would be inaccessible and lead to verification problems and logout issues deleting sessions.

## Future Optimizations:
-Proper date field formatting & task sorting by date
-Edit task option
-Addl task tagging & filtering options
-Addl styling



