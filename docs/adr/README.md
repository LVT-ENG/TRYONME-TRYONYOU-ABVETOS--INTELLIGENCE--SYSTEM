# Architecture Decision Records (ADR)

This directory contains Architecture Decision Records (ADRs) for the TRYONYOU / ABVETOS Intelligence System.

## What is an ADR?

An Architecture Decision Record (ADR) is a document that captures an important architectural decision made along with its context and consequences.

## ADR Format

Each ADR follows this structure:

- **Title**: ADR-XXX: Brief descriptive title
- **Status**: Propuesto | Aceptado | Superseded | Deprecated
- **Date**: When the decision was made
- **Deciders**: Who was involved in making the decision
- **Context**: The situation that led to this decision
- **Decision**: What was decided
- **Consequences**: Positive and negative outcomes of the decision
- **Alternatives**: Other options that were considered

## Current ADRs

| ADR | Title | Status | Date |
|-----|-------|--------|------|
| [ADR-014](./ADR-014-unified-biometric-engine.md) | Unified Biometric Intelligence Engine (FastAPI + Gemini + Looker) | Propuesto | 2025-01-04 |

## Creating a New ADR

1. Copy the template from an existing ADR
2. Number it sequentially (ADR-015, ADR-016, etc.)
3. Fill in all sections with relevant information
4. Submit for review by the core team
5. Update this README with the new ADR entry

## References

- [ADR GitHub Organization](https://adr.github.io/)
- [Documenting Architecture Decisions](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)
