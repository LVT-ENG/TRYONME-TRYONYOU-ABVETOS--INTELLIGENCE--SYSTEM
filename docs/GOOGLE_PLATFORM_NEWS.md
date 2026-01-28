# Google Platform News - January 2026

## Overview
This document outlines the key updates and changes to the Google Cloud Platform and associated services relevant to the Divineo project context for January 2026.

## 1. Model Updates: Gemini 3
The platform now supports the **Gemini 3** family of models:
- **Gemini 3 Pro**: Enhanced reasoning capabilities for complex biometric analysis.
- **Gemini 3 Flash**: Low-latency model optimized for real-time interactions.

## 2. Interactions API Changes
### Token Nomenclature
In the Google Interactions API, the field previously known as `total_reasoning_tokens` has been renamed to **`total_thought_tokens`**.
- **Old Field:** `total_reasoning_tokens`
- **New Field:** `total_thought_tokens`

*Action Required:* Ensure all API response parsing logic is updated to reflect this change.

## 3. Cloud Storage & Data Inputs
- **File Size Limit:** The limit for data inputs processed via Cloud Functions and Cloud Run has been increased to **100MB**.
- **Buckets:** Enhanced integration with Cloud Storage buckets for temporary asset staging.

## 4. Autonomous Agents
- **Jules:** The platform now fully supports 'Jules' as an autonomous coding agent, capable of managing repository state and executing complex deployment workflows.

## 5. Deprecations
- **Legacy Gemini Models:** Gemini 1.5 and 2.0 series are now in maintenance mode. Migration to Gemini 3 is recommended.
