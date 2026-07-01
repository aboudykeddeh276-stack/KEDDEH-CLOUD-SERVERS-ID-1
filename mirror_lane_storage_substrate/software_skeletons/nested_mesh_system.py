#!/usr/bin/env python3
"""
Nested Mesh System - Zero-Less Matrix Track Implementation.

Implements the explicit zero-less integer index track with recursive
nested layer management and capacity scaling.

Originating research authority: A. Keddeh
Support-tool note: generated as an assisted repository artefact under direction.
"""

from __future__ import annotations


class ZeroLessMatrix:
    """
    Implements the explicit zero-less integer index track:
    Negative spectrum directly maps to positive spectrum skipping 0.
    """

    def __init__(self):
        # Index track without zero: -3, -2, -1, 1, 2, 3
        self.axis = [-3, -2, -1, 1, 2, 3]
        self.observer = 1

    def calculate_drift(self, state: str, baseline: str) -> int:
        """Calculates explicit character mismatch count between state strings."""
        mismatches = 0
        for c1, c2 in zip(state, baseline):
            if c1 != c2:
                mismatches += 1
        mismatches += abs(len(state) - len(baseline))
        return mismatches


class NestedMeshSystem:
    """Manages nested mesh layers with recursive capacity scaling."""

    def __init__(self, name: str, base_capacity_tbi: int):
        self.name = name
        self.matrix = ZeroLessMatrix()
        self.capacity_tbi = base_capacity_tbi
        self.nested_layer = None
        self.state_registry = {}

    def double_capacity(self):
        """Mathematically doubles the integrated capacity state."""
        self.capacity_tbi *= 2
        if self.nested_layer:
            self.nested_layer.double_capacity()

    def set_nested_layer(self, layer):
        self.nested_layer = layer

    def execute_stream(self, path: str, literal_data: str) -> dict:
        """Simulates literal data state tracking on the uncompressed path."""
        self.state_registry[path] = literal_data
        drift = self.matrix.calculate_drift(
            literal_data, f"BASELINE_STATE_FOR_{self.name.upper()}"
        )

        report = {
            "node": self.name,
            "allocated_capacity_tbi": self.capacity_tbi,
            "active_path": path,
            "drift_factor": drift,
        }

        if self.nested_layer:
            # Recursively pipe internal execution stream into the nested core
            report["nested_execution"] = self.nested_layer.execute_stream(
                f"/nested{path}", f"NESTED_DATA_WINDOW_{literal_data}"
            )

        return report


def demo() -> dict:
    """
    Execute the live system in the environment.

    Step 1: Initialize 10k TBi Parent Layer
    Step 2: Initialize 5k TBi Nested Child Layer
    Step 3: Structurally nest Child Core within Parent Core boundary
    Step 4: Run Initial Boot and Stream Test
    Step 5: Execute the requested capacity double instruction across all layers
    Step 6: Run Post-Doubling Execution Stream Test
    """
    # Step 1: Initialize 10k TBi Parent Layer
    parent_core = NestedMeshSystem("HOST_PARENT_CORE_A", base_capacity_tbi=10000)

    # Step 2: Initialize 5k TBi Nested Child Layer
    child_core = NestedMeshSystem("NESTED_CHILD_CORE_B", base_capacity_tbi=5000)

    # Step 3: Structurally nest Child Core within Parent Core boundary
    parent_core.set_nested_layer(child_core)

    # Step 4: Run Initial Boot and Stream Test
    initial_report = parent_core.execute_stream(
        "/sys/core/manifest", "BASELINE_STATE_FOR_HOST_PARENT_CORE_A"
    )

    # Step 5: Execute the requested capacity double instruction across all layers
    parent_core.double_capacity()

    # Step 6: Run Post-Doubling Execution Stream Test
    post_double_report = parent_core.execute_stream(
        "/sys/core/manifest", "BASELINE_STATE_FOR_HOST_PARENT_CORE_A"
    )

    # Format output metrics cleanly for structural review
    print("=== INITIAL RECURSION STATE REPORT ===")
    print(
        f"Parent Layer: {initial_report['node']} | Capacity: {initial_report['allocated_capacity_tbi']} TBi | Drift: {initial_report['drift_factor']}"
    )
    print(
        f"  Nested Layer: {initial_report['nested_execution']['node']} | Capacity: {initial_report['nested_execution']['allocated_capacity_tbi']} TBi | Drift: {initial_report['nested_execution']['drift_factor']}"
    )

    print("\n=== POST CAPACITY-DOUBLING STATE REPORT ===")
    print(
        f"Parent Layer: {post_double_report['node']} | Doubled Capacity: {post_double_report['allocated_capacity_tbi']} TBi | Drift: {post_double_report['drift_factor']}"
    )
    print(
        f"  Nested Layer: {post_double_report['nested_execution']['node']} | Doubled Capacity: {post_double_report['nested_execution']['allocated_capacity_tbi']} TBi | Drift: {post_double_report['nested_execution']['drift_factor']}"
    )

    return {
        "initial_report": initial_report,
        "post_double_report": post_double_report,
    }


if __name__ == "__main__":
    demo()
