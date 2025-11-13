import React, { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";

const NoteGroup = ({ group, onSelect, handleSelectGroup }) => {
  return (
    <div
      className="note-group"
      onClick={onSelect}
      style={{
        backgroundColor:
          handleSelectGroup === group ? "rgba(47, 47, 47, 0.17)" : "white",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <div
          style={{ backgroundColor: group.color }}
          className="group-initials"
        >
          {group.name.slice(0, 2).toUpperCase()}
        </div>
        <div className="group-name">{group.name}</div>
      </div>
    </div>
  );
};

export default NoteGroup;
