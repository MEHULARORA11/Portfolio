# 1 Million Checkboxes — Real-Time Multiplayer Checkbox Grid

## What is 1 Million Checkboxes?

1 Million Checkboxes is a real-time, multiplayer web application where anyone on the internet can toggle any of **exactly 1,000,000 individually clickable checkboxes**. Every toggle is instantly broadcast to every other connected user via WebSockets — you can watch the board change live as other people click. The entire board state lives in a single **125 KB Redis bitfield** in memory.

It was inspired by the viral "One Million Checkboxes" concept and was designed as a full-stack engineering challenge: how do you serve and sync one million interactive UI elements in real time, at scale, without crashing the browser or the server?

Live: https://checkboxes.mehularora.dev/
GitHub: https://github.com/MEHULARORA11/1-Million-CheckBoxes

---

## How It Works

### State Storage — Redis Bitfield

All 1,000,000 checkbox states are stored in a single Redis key (`checkboxes`) as a **bitfield**:
- Each checkbox = 1 bit (0 = unchecked, 1 = checked)
- Total storage: 1,000,000 bits = 125,000 bytes = **~125 KB**
- The entire board can be loaded in one Redis call: `redis.getBuffer("checkboxes")`
- The backend returns it as a base64-encoded string; the frontend decodes it into a `Uint8Array` and reads bits directly

### Real-Time Sync — Socket.IO + Redis Pub/Sub

- The backend runs **Socket.IO** for real-time WebSocket connections
- When any user toggles a checkbox, the server:
  1. Runs the atomic Lua script on Redis
  2. Publishes the change to a Redis pub/sub channel (`internal:server:checkbox:changev1`)
  3. All backend instances (if scaled horizontally) receive the pub/sub message and emit `server:checkbox:change` to every connected Socket.IO client
- This architecture allows **horizontal scaling** — run multiple backend instances behind a load balancer and they all stay in sync via Redis pub/sub

### Atomic Toggle — Lua Script

The most critical piece: checkbox toggling is handled by a **custom Lua script** registered on Redis as `toggleCheckbox`. This runs atomically (Redis single-threaded execution), eliminating race conditions when many users click the same checkbox simultaneously.

The Lua script handles:
- Checking the current bit value before writing
- Ownership verification (guest vs authenticated user)
- Setting/clearing the bit atomically
- Incrementing the global click counter atomically
- Managing owner metadata (who checked this box)
- TTL management for guest checkboxes

### Guest vs Authenticated Users

**Guests** (unauthenticated):
- Can check/uncheck any unchecked checkbox
- Their claim expires after **180 seconds (3 minutes)** — TTL is set on the ownership key
- Anyone can overwrite or uncheck a guest's checkbox
- TTL expiry is handled by Redis keyspace notifications + a background sweeper interval (runs every 1 second)

**Authenticated users** (signed in with Google):
- Checkbox claims are **permanent** — no TTL
- Only the same user can uncheck their own checkbox (enforced atomically in the Lua script by comparing `userId`)
- Cannot be overwritten by other users or guests

The upgrade path: if an authenticated user clicks a checkbox that a guest checked, the Lua script allows the authenticated user to take ownership.

### Frontend — Virtualized Grid

Rendering 1,000,000 checkboxes in a browser would normally destroy performance. The frontend uses:
- **`react-window` Grid** — virtualizes the checkbox grid, only rendering the checkboxes currently visible in the viewport
- **`Uint8Array`** for state — checkbox state lives in a typed array, not React state. Individual bit reads/writes are done with bitwise operations, not object mutations
- **Selective re-renders** — only the affected checkbox cell is re-rendered on toggle, not the entire grid

### Hover Tooltips (On-Demand Lookups)

When you hover a checked checkbox, the frontend emits `client:checkbox:hover` with the checkbox index. The server:
1. Fetches the ownership key (`checkbox:expiry:{index}`) from Redis via pipeline (key + TTL in one round trip)
2. Returns the owner's name, whether they're a guest, and time remaining before expiry
3. The client shows this as a tooltip

If the ownership key is missing but the bit is still 1 (orphaned state), the server self-heals: it clears the bit and publishes the reset.

### Authentication — Google SSO

- Google Sign-In via `google-auth-library` (`OAuth2Client.verifyIdToken`)
- Sessions stored in Redis with 7-day TTL (`session:{token}` → JSON user object)
- Session token stored in an httpOnly cookie
- Socket.IO middleware reads the session cookie on WebSocket handshake to authenticate the connection

### Active Users Counter

The server tracks connected Socket.IO clients with a simple `userCount` variable. Every `connection` and `disconnect` event emits `online:users` to all clients.

---

## Architecture Diagram

```
Browser (react-window Grid + Uint8Array)
    ↕ Socket.IO
Express + Socket.IO Server (Node.js)
    ↕ Lua Script (atomic toggle)
Redis / Valkey (bitfield + pub/sub + keyspace events)
    ↕ pub/sub channel
Other backend instances (horizontal scale)
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, `react-window` (virtualized grid) |
| Real-time | Socket.IO (client + server) |
| Backend | Node.js, Express 5 |
| Data store | Redis / Valkey (bitfields, pub/sub, keyspace notifications, Lua scripting) |
| Auth | Google Sign-In (`google-auth-library`), httpOnly session cookies |
| Deployment | Docker, Caddy (reverse proxy) |

---

## Key Technical Numbers

- **Checkboxes**: exactly 1,000,000 (constant `CHECKBOX_COUNT = 1000000`)
- **Board size in Redis**: ~125 KB (1 bit per checkbox)
- **Guest TTL**: 180 seconds (3 minutes)
- **Background sweeper**: runs every 1,000ms to expire guest checkboxes
- **Session TTL**: 604,800 seconds (7 days) in Redis

---

## Common Questions

**Q: How are 1 million checkboxes stored?**
A: As a Redis bitfield — one bit per checkbox, stored in a single 125 KB Redis key. The entire board state can be fetched in one network call.

**Q: How does real-time sync work?**
A: Socket.IO for WebSocket connections to browsers. Redis pub/sub for syncing between multiple backend instances. When anyone toggles a checkbox, a Lua script atomically updates Redis, then publishes to the pub/sub channel, which all server instances receive and forward to their connected clients.

**Q: What happens when two people click the same checkbox at the exact same time?**
A: A Redis Lua script handles the toggle atomically. Since Redis is single-threaded and Lua scripts run atomically, only one operation wins — the other gets a rejection response and their UI reverts.

**Q: Why don't guest checkboxes last forever?**
A: To prevent the board from being "used up" permanently. Guest claims expire after 3 minutes via Redis keyspace notifications and a background sweeper. Authenticated users get permanent claims.

**Q: How does the browser render 1 million checkboxes without crashing?**
A: Using `react-window`'s virtualized grid — only the checkboxes currently visible in the viewport are rendered as DOM nodes. State is stored in a `Uint8Array` with bitwise operations, bypassing React's reconciler for updates.

**Q: Can it scale horizontally?**
A: Yes. Multiple backend instances can run behind a load balancer. They all connect to the same Redis instance and use pub/sub to stay synchronized. The Lua script ensures atomic toggles regardless of which instance receives a request.

**Q: Is Google Sign-In required?**
A: No. Guest mode works without sign-in. Google Sign-In is optional and gives you permanent checkbox claims.
