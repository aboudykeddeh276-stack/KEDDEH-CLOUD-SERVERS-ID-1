from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SUBSTRATE = ROOT / "mirror_lane_storage_substrate"
SPEC = SUBSTRATE / "MIRROR_LANE_COMPONENT_SPEC.json"
DEPENDENCIES = ROOT / "dependency-graph" / "kex-mirror-lane-dependencies.fragment.json"
INVENTORY = ROOT / "INVENTORY.md"
WORKLOAD = ROOT / "WORKLOAD_REGISTER.md"

REQUIRED_CONTROLS = {
    "CONTROL_INDEX.md",
    "MIRROR_LANE_COMPONENT_SPEC.json",
    "PROCESS_WORKFLOW_CONTROL.md",
    "FILING_EVIDENCE_STANDARD.md",
    "CROSS_REPO_AUTHORITY_CONTRACT.md",
    "AUTHORSHIP.md",
    "VERIFICATION_PROOF_CONVENTIONS.md",
}


def test_mirror_lane_component_spec_matches_runtime_and_owner():
    spec = json.loads(SPEC.read_text("utf-8"))
    assert spec["schema"] == "kex.braink.governance-component-spec.v1"
    assert spec["component_id"] == "KEX_MIRROR_LANE_STATE_TRANSFER_R1"
    assert spec["classification"] == "RUNTIME_STATE_TRANSFER_ACTUATOR"
    assert spec["repository"] == "aboudykeddeh276-stack/KEDDEH-CLOUD-SERVERS-ID-1"
    assert "software file/state replication" in spec["substrate_boundary"]
    assert "physical disk mirroring" in spec["invalid_claims"]
    assert "post-update mirror manifest digest equals source manifest digest" in spec["proof_conditions"]
    assert "kex.mirror-lane.transfer-receipt.v1" in spec["evidence"]["receipt_schemas"]


def test_required_control_documents_are_filed_beside_owner_component():
    observed = {p.name for p in SUBSTRATE.iterdir() if p.is_file()}
    assert REQUIRED_CONTROLS.issubset(observed)


def test_dependency_fragment_preserves_braINK_consumer_and_filesystem_authority():
    fragment = json.loads(DEPENDENCIES.read_text("utf-8"))
    assert fragment["fragment_id"] == "KEX_MIRROR_LANE_STATE_TRANSFER_R1"
    edges = fragment["declared_edges"]
    assert any(
        e["source"] == "repository://aboudykeddeh276-stack/BRAINK"
        and e["target"] == "runtime://kex/mirror-lane/state-transfer/r1"
        and e["relationship"] == "consumes"
        for e in edges
    )
    assert any(
        e["target"] == "runtime://host/filesystem-atomic-replace-fsync"
        and e["class"] == "RUNTIME_AUTHORITY_DEPENDENCY"
        for e in edges
    )


def test_inventory_registers_runtime_controls_and_tests_without_inflating_test_evidence():
    inventory = INVENTORY.read_text("utf-8")
    assert "KEX-SCRIPT-MIRROR-0001 | KEX Mirror Lane State Transfer Runtime R1" in inventory
    assert "KEX-DEF-MIRROR-0001 | Mirror Lane State Transfer Component Spec" in inventory
    assert "KEX-SCRIPT-MIRROR-0002 | Mirror Lane Qualification Tests" in inventory
    assert "execution evidence remains separately required for E4" in inventory


def test_workload_keeps_cross_repo_qualification_open_until_observed():
    workload = WORKLOAD.read_text("utf-8")
    assert "WL-0014 | Mirror lane durable state-transfer actuator | completed" in workload
    assert "WL-0015 | Mirror lane governance/control package | completed" in workload
    assert "WL-0016 | Mirror lane dependency declaration | completed" in workload
    assert "WL-0017 | BRAINK logical-computer cross-repository qualification | in_progress" in workload
    assert "Execution/qualification work remains `in_progress` or `blocked` until observed evidence exists." in workload
