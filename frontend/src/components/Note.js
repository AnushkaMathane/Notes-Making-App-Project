import React from "react";

const Note = ({ note }) => {

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const date = new Date(dateString).toLocaleDateString(undefined, options);

    const timeOptions = { hour: "numeric", minute: "numeric", hour12: true };
    const time = new Date(dateString).toLocaleTimeString(
      undefined,
      timeOptions
    );

    return `${date} • ${time}`;
  };

  return (
    <div className="note">
      <p>{note.content}</p>

      <div className="note-footer">
        <span
          style={{
            fontSize: "12px",
            color: "#353535",
            fontWeight: "600",
          }}
        >
          {formatDate(note.createdAt)}
        </span>
      </div>
    </div>
  );
};

export default Note;
