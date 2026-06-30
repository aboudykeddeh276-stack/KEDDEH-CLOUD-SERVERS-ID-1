const ALLOWED_ENTRY_POINTS = new Set([
  "path",
  "metadata",
  "hidden_file",
  "event",
  "link_mount",
  "permission",
  "timestamp"
]);

const ALLOWED_ACTIONS = new Set([
  "set_metadata",
  "write_hidden_file",
  "touch_event",
  "create_link",
  "mount",
  "rename",
  "set_permission"
]);

export function validateControlRow(row: Record<string, string>) {
  const errors: string[] = [];

  if (!row.ADDRESS?.startsWith("kex://")) errors.push("ADDRESS must start with kex://");
  if (!row.TARGET) errors.push("TARGET is required");
  if (!ALLOWED_ENTRY_POINTS.has(row.ENTRY_POINT)) errors.push(`Invalid ENTRY_POINT: ${row.ENTRY_POINT}`);
  if (!ALLOWED_ACTIONS.has(row.ACTION)) errors.push(`Invalid ACTION: ${row.ACTION}`);

  return {
    valid: errors.length === 0,
    errors
  };
}
