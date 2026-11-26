# Backend Folder Structure --- Social Media Platform

**Stack:** Node.js, Express.js, MongoDB, Mongoose\
**Architecture:** Modular monolith, feature-based modules, REST API\
**Recommended runtime:** Node.js LTS

This structure is designed for a social media product that may grow to
include authentication, profiles, posts, media uploads, comments, likes,
follows, feeds, notifications, chat, search, and moderation.

------------------------------------------------------------------------

## 1. Recommended project structure

``` text
social-media-backend/
├── src/
│   ├── app.js
│   ├── server.js
│   │
│   ├── config/
│   │   ├── env.js
│   │   ├── database.js
│   │   ├── cors.js
│   │   ├── logger.js
│   │   └── storage.js
│   │
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.routes.js
│   │   │   ├── auth.controller.js
│   │   │   ├── auth.service.js
│   │   │   ├── auth.validation.js
│   │   │   └── auth.constants.js
│   │   │
│   │   ├── users/
│   │   │   ├── user.model.js
│   │   │   ├── user.routes.js
│   │   │   ├── user.controller.js
│   │   │   ├── user.service.js
│   │   │   ├── user.repository.js
│   │   │   └── user.validation.js
│   │   │
│   │   ├── posts/
│   │   │   ├── post.model.js
│   │   │   ├── post.routes.js
│   │   │   ├── post.controller.js
│   │   │   ├── post.service.js
│   │   │   ├── post.repository.js
│   │   │   └── post.validation.js
│   │   │
│   │   ├── comments/
│   │   │   ├── comment.model.js
│   │   │   ├── comment.routes.js
│   │   │   ├── comment.controller.js
│   │   │   ├── comment.service.js
│   │   │   ├── comment.repository.js
│   │   │   └── comment.validation.js
│   │   │
│   │   ├── likes/
│   │   │   ├── like.model.js
│   │   │   ├── like.routes.js
│   │   │   ├── like.controller.js
│   │   │   ├── like.service.js
│   │   │   └── like.repository.js
│   │   │
│   │   ├── follows/
│   │   │   ├── follow.model.js
│   │   │   ├── follow.routes.js
│   │   │   ├── follow.controller.js
│   │   │   ├── follow.service.js
│   │   │   └── follow.repository.js
│   │   │
│   │   ├── feed/
│   │   │   ├── feed.routes.js
│   │   │   ├── feed.controller.js
│   │   │   ├── feed.service.js
│   │   │   └── feed.repository.js
│   │   │
│   │   ├── notifications/
│   │   │   ├── notification.model.js
│   │   │   ├── notification.routes.js
│   │   │   ├── notification.controller.js
│   │   │   ├── notification.service.js
│   │   │   └── notification.repository.js
│   │   │
│   │   ├── conversations/
│   │   │   ├── conversation.model.js
│   │   │   ├── conversation.routes.js
│   │   │   ├── conversation.controller.js
│   │   │   ├── conversation.service.js
│   │   │   └── conversation.repository.js
│   │   │
│   │   ├── messages/
│   │   │   ├── message.model.js
│   │   │   ├── message.routes.js
│   │   │   ├── message.controller.js
│   │   │   ├── message.service.js
│   │   │   └── message.repository.js
│   │   │
│   │   ├── media/
│   │   │   ├── media.routes.js
│   │   │   ├── media.controller.js
│   │   │   ├── media.service.js
│   │   │   └── media.validation.js
│   │   │
│   │   ├── search/
│   │   │   ├── search.routes.js
│   │   │   ├── search.controller.js
│   │   │   └── search.service.js
│   │   │
│   │   └── moderation/
│   │       ├── moderation.routes.js
│   │       ├── moderation.controller.js
│   │       └── moderation.service.js
│   │
│   ├── middleware/
│   │   ├── authenticate.js
│   │   ├── authorize.js
│   │   ├── validateRequest.js
│   │   ├── errorHandler.js
│   │   ├── notFound.js
│   │   ├── rateLimiter.js
│   │   ├── upload.js
│   │   └── requestLogger.js
│   │
│   ├── database/
│   │   ├── connection.js
│   │   ├── indexes.js
│   │   └── migrations/
│   │
│   ├── routes/
│   │   └── index.js
│   │
│   ├── shared/
│   │   ├── errors/
│   │   │   ├── AppError.js
│   │   │   └── errorCodes.js
│   │   ├── utils/
│   │   │   ├── asyncHandler.js
│   │   │   ├── pagination.js
│   │   │   └── pick.js
│   │   ├── constants/
│   │   └── validators/
│   │
│   ├── jobs/
│   │   ├── cleanupUploads.job.js
│   │   └── notificationDelivery.job.js
│   │
│   ├── sockets/
│   │   ├── index.js
│   │   └── chat.socket.js
│   │
│   └── docs/
│       └── openapi.yaml
│
├── tests/
│   ├── integration/
│   ├── unit/
│   ├── fixtures/
│   └── setup.js
│
├── scripts/
│   ├── seed.js
│   └── createAdmin.js
│
├── uploads/                 # Local development only; don't commit
├── logs/                    # Runtime logs; don't commit
├── .env.example
├── .env                     # Local secrets; don't commit
├── .gitignore
├── .prettierrc
├── eslint.config.js
├── package.json
├── package-lock.json
└── README.md
```

> Start with the modules your MVP needs. You do not need to create every
> folder on day one. Add chat, search, moderation, jobs, and sockets
> when those features enter your roadmap.

------------------------------------------------------------------------

## 2. What each layer does

  -----------------------------------------------------------------------
  Layer                               Responsibility
  ----------------------------------- -----------------------------------
  `routes`                            Defines endpoints and connects them
                                      to middleware/controllers

  `controller`                        Handles HTTP request/response;
                                      should stay thin

  `service`                           Contains business rules and
                                      coordinates operations

  `repository`                        Encapsulates database queries (use
                                      when query logic becomes
                                      non-trivial)

  `model`                             Defines Mongoose schema, indexes,
                                      and model

  `validation`                        Validates request params, query
                                      strings, and body

  `middleware`                        Authentication, authorization,
                                      validation, rate limits, error
                                      handling

  `config`                            Environment variables and
                                      external-service configuration

  `shared`                            Reusable utilities, errors,
                                      constants, and common helpers

  `jobs`                              Background and scheduled work

  `sockets`                           Real-time events such as chat and
                                      live notifications
  -----------------------------------------------------------------------

### Typical request flow

``` text
Client
  ↓
Express route
  ↓
Middleware (authentication / validation)
  ↓
Controller
  ↓
Service (business logic)
  ↓
Repository (database operations)
  ↓
Mongoose model → MongoDB
  ↓
Controller sends HTTP response
```

Keep controllers focused on HTTP. Put business rules in services so they
can be tested and reused outside Express routes.

------------------------------------------------------------------------

## 3. Example: Posts module

A post feature could be implemented like this:

**`post.model.js`** - Defines fields such as `author`, `text`, `media`,
`visibility`, and timestamps. - Adds indexes for common queries.

**`post.routes.js`** - `POST /api/v1/posts` -
`GET /api/v1/posts/:postId` - `PATCH /api/v1/posts/:postId` -
`DELETE /api/v1/posts/:postId` - `GET /api/v1/users/:userId/posts`

**`post.controller.js`** - Reads validated input and the authenticated
user's ID. - Calls the appropriate service. - Returns the correct status
code and response shape.

**`post.service.js`** - Checks business rules, ownership, visibility,
and permissions. - Coordinates post creation, media association, and
related actions.

**`post.repository.js`** - Contains Mongoose queries such as create,
find-by-ID, update, and paginated listing.

**`post.validation.js`** - Validates text length, media IDs, visibility
values, and route parameters.

------------------------------------------------------------------------

## 4. Suggested MongoDB collections

Use separate collections for entities that grow independently or have
their own lifecycle.

  -----------------------------------------------------------------------
  Collection                          Example purpose
  ----------------------------------- -----------------------------------
  `users`                             Account credentials, username,
                                      email, profile reference/data

  `posts`                             Post text, author ID, media
                                      references, visibility

  `comments`                          Comment text, post ID, author ID,
                                      optional parent comment

  `likes`                             User ID + target type/ID, with a
                                      unique compound index

  `follows`                           Follower ID + following ID, with a
                                      unique compound index

  `notifications`                     Recipient, actor, type, target,
                                      read state

  `conversations`                     Participants and conversation
                                      metadata

  `messages`                          Conversation ID, sender ID,
                                      content, timestamps

  `media`                             Storage key, URL, MIME type, size,
                                      owner
  -----------------------------------------------------------------------

Prefer storing references (`ObjectId`) for high-growth relationships
such as likes, follows, comments, and messages. Avoid putting an
unbounded array of likes or followers inside a user or post document.

### Important indexes to plan

-   `users`: unique index on normalized email and username.
-   `posts`: compound index on `{ author: 1, createdAt: -1 }`.
-   `comments`: compound index on `{ post: 1, createdAt: -1 }`.
-   `likes`: unique compound index on
    `{ user: 1, targetType: 1, target: 1 }`.
-   `follows`: unique compound index on `{ follower: 1, following: 1 }`.
-   `messages`: compound index on `{ conversation: 1, createdAt: -1 }`.

Choose indexes based on actual query patterns and verify them with
MongoDB explain plans. Indexes improve reads but add write and storage
costs.

------------------------------------------------------------------------

## 5. API organization

Use a versioned API prefix from the beginning:

``` text
/api/v1
```

A possible first version:

  ---------------------------------------------------------------------------------
  Feature                             Endpoints
  ----------------------------------- ---------------------------------------------
  Auth                                `POST /auth/register`, `POST /auth/login`,
                                      `POST /auth/logout`, `POST /auth/refresh`

  Users                               `GET /users/:userId`, `PATCH /users/me`,
                                      `GET /users/:userId/posts`

  Posts                               `POST /posts`, `GET /posts/:postId`,
                                      `PATCH /posts/:postId`,
                                      `DELETE /posts/:postId`

  Comments                            `POST /posts/:postId/comments`,
                                      `GET /posts/:postId/comments`,
                                      `DELETE /comments/:commentId`

  Likes                               `PUT /posts/:postId/like`,
                                      `DELETE /posts/:postId/like`

  Follows                             `POST /users/:userId/follow`,
                                      `DELETE /users/:userId/follow`

  Feed                                `GET /feed`

  Notifications                       `GET /notifications`,
                                      `PATCH /notifications/:notificationId/read`
  ---------------------------------------------------------------------------------

For like/follow actions, `PUT` and `DELETE` make the operation naturally
idempotent. Use cursor pagination for feeds and large timelines rather
than relying on large `skip` values.

------------------------------------------------------------------------

## 6. Architecture rules worth following

1.  **Keep modules feature-based.** A feature's routes, controller,
    service, model, and validation should live together.
2.  **Keep controllers thin.** Do not put MongoDB queries or complex
    business rules directly in controllers.
3.  **Validate at the API boundary.** Use a schema-validation library
    such as Zod, Joi, or express-validator.
4.  **Centralize errors.** Use one error-handling middleware and a
    consistent error response format.
5.  **Separate authentication from authorization.** Authentication
    identifies the user; authorization checks whether that user can
    perform the action.
6.  **Never trust client-supplied ownership.** Derive the acting user ID
    from the authenticated session/token.
7.  **Use transactions selectively.** Use MongoDB transactions when a
    business operation must update multiple documents atomically and
    your deployment supports them.
8.  **Use external object storage for media.** Store file metadata and
    storage keys in MongoDB; avoid storing large image/video binaries
    directly in ordinary documents.
9.  **Use background jobs for slow work.** Examples: email delivery,
    media processing, cleanup, and notification fan-out.
10. **Add tests per module.** Unit-test services and integration-test
    API routes against a test database.
11. **Keep secrets out of Git.** Commit `.env.example`, never `.env`.
12. **Use structured logs and request IDs.** Avoid logging passwords,
    tokens, or private message content.

------------------------------------------------------------------------

## 7. Suggested dependencies

Install only what the current feature set needs.

### Core

``` bash
npm install express mongoose dotenv cors helmet compression
```

### Security and validation

``` bash
npm install bcryptjs jsonwebtoken zod express-rate-limit
```

### Uploads and logging

``` bash
npm install multer pino pino-http
```

For production media, pair Multer (or direct-to-cloud uploads) with
object storage such as S3-compatible storage or Cloudinary. Do not treat
the local `uploads/` folder as durable production storage.

### Development and testing

``` bash
npm install -D nodemon eslint prettier vitest supertest
```

Choose one validation library and one logging stack; avoid adding
overlapping packages without a reason.

------------------------------------------------------------------------

## 8. Environment variables

Example `.env.example`:

``` dotenv
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/social_media
JWT_ACCESS_SECRET=replace_with_a_long_random_secret
JWT_REFRESH_SECRET=replace_with_another_long_random_secret
CLIENT_URL=http://localhost:3000
LOG_LEVEL=debug
```

Validate required environment variables at startup in `config/env.js`.
Use strong, unique secrets in each environment and keep real values in
your deployment secret manager.

------------------------------------------------------------------------

## 9. Build order for the MVP

A practical implementation sequence:

1.  Project setup, environment validation, MongoDB connection, error
    handling.
2.  Authentication: register, login, refresh/logout, password hashing.
3.  User profile: view/update profile, username uniqueness.
4.  Posts: create, read, update, delete, ownership checks.
5.  Media upload and storage integration.
6.  Comments and likes.
7.  Follow/unfollow relationships.
8.  Home feed with cursor pagination.
9.  Notifications.
10. Chat, search, moderation, and background processing.

### Final recommendation

For your project, use a **feature-based modular monolith** first. It
gives you clear separation without the operational complexity of
microservices. Keep each module independent, expose functionality
through its service layer, and split services only when scale or team
ownership gives you a concrete reason.
