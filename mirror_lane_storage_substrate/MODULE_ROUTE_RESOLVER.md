# Module Route Resolver

## Purpose

Resolve a KEX phrase into a readable location.

## Inputs

- family key
- server name
- lane name
- cell name
- route name
- pair name
- trace phrase

## Process

The resolver checks the registry, workbook bridge, Markdown lane, and pair lane.

## Output

- matched entry
- matched lane
- matched cell
- paired entry
- state

## Rule

A route resolves by relation between named states.
