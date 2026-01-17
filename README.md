# Lightweight BC Incident Viewer

## Overview
This project is a lightweight, readable web application that displays road incidents in British Columbia using a list-based interface.

It is inspired by the older DriveBC experience and intentionally avoids heavy, map-centric interactions. The focus is on clarity, performance, and quickly surfacing important information.

## Purpose
The purpose of this project is to:
- Build a clean, maintainable application using modern web tooling
- Practice feature-based project organization
- Emphasize server-side rendering and data-first design
- Create a strong foundation for future expansion

This project is primarily a learning-focused exercise, with deliberate architectural decisions made along the way.

## Current Features
- Fetches real-time road incident data from the BC Open511 API
- Displays incidents using a lightweight card-based layout
- Server-side data fetching for fast initial load
- Feature-scoped components, helpers, and configuration

## To Do
- Focus on active, major incidents
- Sort incidents by most recently updated
- Filter incidents by severity and status
- Add incident detail pages using dynamic routing
- Implement route-based views (e.g., Vancouver → Merritt)
- Integrate camera and weather data along selected routes
- Build a mobile version using React Native (practice and reuse)

## Tech Stack
- Next.js (App Router)
- TypeScript
- React
- Tailwind CSS
- BC Open511 API

## Status
This project is under active development and evolving alongside learning goals.
