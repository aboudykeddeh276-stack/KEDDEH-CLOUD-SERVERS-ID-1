import { describe, it, expect } from "vitest";
import { validateControlRow } from "./validators";

describe("validateControlRow", () => {
  it("rejects non-kex address", () => {
    const row = { ADDRESS: "http://folder/metadata", TARGET: "/runtime", ENTRY_POINT: "metadata", ACTION: "set_metadata" };
    const result = validateControlRow(row);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("ADDRESS must start with kex://");
  });

  it("rejects unknown action", () => {
    const row = { ADDRESS: "kex://folder/metadata", TARGET: "/runtime", ENTRY_POINT: "metadata", ACTION: "unknown_action" };
    const result = validateControlRow(row);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Invalid ACTION: unknown_action");
  });

  it("rejects unknown entry point", () => {
    const row = { ADDRESS: "kex://folder/metadata", TARGET: "/runtime", ENTRY_POINT: "unknown_entry", ACTION: "set_metadata" };
    const result = validateControlRow(row);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Invalid ENTRY_POINT: unknown_entry");
  });

  it("validates correct control row", () => {
    const row = { ADDRESS: "kex://folder/GCurve3D", TARGET: "/runtime/GCurve3D", ENTRY_POINT: "metadata", ACTION: "set_metadata" };
    const result = validateControlRow(row);
    expect(result.valid).toBe(true);
    expect(result.errors.length).toBe(0);
  });
});
