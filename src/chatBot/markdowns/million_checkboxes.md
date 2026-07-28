# 1 Million Checkboxes — Real-Time Scaled App

## What is 1 Million Checkboxes?
1 Million Checkboxes is a **full-stack real-time application** built by Mehul Arora that successfully scales to handling one million interactive checkboxes, all synced in real-time across users. It's inspired by the viral "One Million Checkboxes" concept and demonstrates Mehul's backend engineering and scaling abilities.

## Live Demo
- **Website:** https://checkboxes.mehularora.dev/
- **GitHub:** https://github.com/MEHULARORA11/1-Million-CheckBoxes

## Tech Stack
- **React** — frontend UI
- **Node.js** — backend server
- **Express** — HTTP framework
- **Redis** — state management and pub/sub for real-time sync across multiple server instances
- **WebSocket** — real-time bidirectional communication

## How It Scales
Scaling checkbox state to 1 million items across concurrent users is a real engineering challenge:

1. **WebSockets** handle the real-time sync — when one user checks a box, all other connected users see it update instantly
2. **Redis** serves as the central state store and pub/sub broker — even if you have multiple Node.js server instances, Redis ensures they all share the same checkbox state
3. **Bitfield storage** — storing 1 million boolean values efficiently in Redis using bitfields rather than individual keys (massive memory savings)
4. **Delta updates** — only sending the changed checkbox index over WebSocket, not the entire state, keeping bandwidth minimal

## Why It's Impressive
- Demonstrates real understanding of **WebSocket architecture** at scale
- Shows knowledge of **Redis pub/sub** for multi-instance coordination
- Memory-efficient data structures (bitfields for boolean arrays)
- A project that looks simple on the surface but has deep engineering challenges underneath
- This is exactly the kind of system design knowledge that excites engineering teams
