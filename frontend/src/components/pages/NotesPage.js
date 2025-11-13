import React, { useState, useEffect } from "react";
import NoteGroup from "../NoteGroup";
import Note from "../Note";
import CreateGroupModal from "../CreateGroupModal";
import NoteInput from "../NoteInput";
import styled from "styled-components";
import axios from "axios";
import FallbackPage from "./FallbackPage";

axios.defaults.baseURL = "https://note-making-app-api.vercel.app/";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 8px;
  position: absolute;
  bottom: 40px;
  right: 20px;
`;

const SidebarHeader = styled.div`
  padding: 0px 20px 0px 20px;
  text-align: center;
  font-weight: 600;
  font-size: 24px;
`;

const SideContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
`;

const NoteHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 16px;
  font-weight: 600;
  font-size: 24px;
  background: #001f8b;
  color: white;
  margin-bottom: 16px;
  justify-content: flex-start; /* search removed */
`;

const NotesPage = () => {
  const [groups, setGroups] = useState([]);
  const [notes, setNotes] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchGroups();
  }, []);

  useEffect(() => {
    if (selectedGroup) {
      fetchNotes(selectedGroup._id);
    } else {
      setNotes([]);
      setFilteredNotes([]);
    }
  }, [selectedGroup]);

  const fetchGroups = async () => {
    try {
      const response = await axios.get("/api/groups");
      setGroups(response.data || []);
      setFilteredGroups(response.data || []);
    } catch (err) {
      console.error("fetchGroups error:", err);
    }
  };

  const fetchNotes = async (groupId) => {
    try {
      const response = await axios.get(`/api/notes/${groupId}`);
      setNotes(response.data || []);
      setFilteredNotes(response.data || []);
    } catch (err) {
      console.error("fetchNotes error:", err);
    }
  };

  return (
    <div
      className={
        selectedGroup
          ? "notes-page group-selected"
          : "notes-page no-group-selected"
      }
    >
      {/* LEFT SIDEBAR */}
      <div className="sidebar">
        <SidebarHeader>Pocket Notes</SidebarHeader>

        <SideContent>
          {filteredGroups.map((group) => (
            <NoteGroup
              key={group._id}
              group={group}
              selectedGroup={selectedGroup}
              onSelect={() => setSelectedGroup(group)}
            />
          ))}
        </SideContent>

        <ButtonContainer>
          <button className="add-group-btn" onClick={() => setShowModal(true)}>
            +
          </button>
        </ButtonContainer>
      </div>

      {/* RIGHT MAIN CONTENT */}
      <div className="main-content">
        {selectedGroup ? (
          <>
            <NoteHeader>
              <span>{selectedGroup.name}</span>
            </NoteHeader>

            <div className="notes-list">
              {filteredNotes.map((note) => (
                <Note
                  key={note._id}
                  note={note}
                  fetchNotes={() => fetchNotes(selectedGroup._id)}
                />
              ))}
            </div>

            <NoteInput
              groupId={selectedGroup._id}
              fetchNotes={() => fetchNotes(selectedGroup._id)}
            />
          </>
        ) : (
          <FallbackPage />
        )}
      </div>

      {showModal && (
        <CreateGroupModal
          onClose={() => setShowModal(false)}
          fetchGroups={fetchGroups}
        />
      )}
    </div>
  );
};

export default NotesPage;
