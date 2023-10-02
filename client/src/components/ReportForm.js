import React, { useState, useRef, useEffect } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

import MessageModal from "./MessageModal";
import { useAuthContext } from '../hooks/UseAuthContext'

import {
  HighlightArea,
  highlightPlugin,
  MessageIcon,
} from '@react-pdf-viewer/highlight';
import {
  Button,
  Position,
  PrimaryButton,
  Tooltip
} from "@react-pdf-viewer/core";

const ReportForm = ({ sendDescToParent }) => {
  const { user } = useAuthContext();
  const userID = user.userID;
  const [pdfFile, setPdfFile] = useState(null);
  const [url, setUrl] = useState("");
  const uploadedAt = useState(Date());
  const [validated, setValidated] = useState(false);

  // pdf viewer
  const fileType = ["application/pdf"];
  const newplugin = defaultLayoutPlugin();
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const [modalMessage, setModalMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // pdf highlight and add notes
  const [message, setMessage] = React.useState("")
  const [notes, setNotes] = React.useState([])
  const notesContainerRef = React.useRef(null)
  let noteId = notes ? notes.length : 0
  const noteEles = new Map()
  const [currentDoc, setCurrentDoc] = React.useState(null)

  // writing annotation file
  const [ desc, setDesc ] = useState("")

  // useEffect(() => {
  //   console.log('desc', desc)
  // }, [desc])

  const saveDesc = (selectedText) => {
    // console.log('saveDesc', selectedText)
    setDesc(selectedText)
    sendDescToParent(selectedText)
  }

  const handleDocumentLoad = (e) => {
    setCurrentDoc(e.doc)
    if (currentDoc && currentDoc !== e.doc) {
      // User opens new document
      setNotes([])
    }
  }

  const renderHighlightTarget = props => (
    <div
      style={{
        background: "#eee",
        display: "flex",
        position: "absolute",
        left: `${props.selectionRegion.left}%`,
        top: `${props.selectionRegion.top + props.selectionRegion.height}%`,
        transform: "translate(0, 8px)",
        zIndex: 1
      }}
    >
      <Tooltip
        position={Position.TopCenter}
        target={
          <Button onClick={props.toggle}>
            <MessageIcon />
          </Button>
        }
        content={() => <div style={{ width: "100px" }}>Add a note</div>}
        offset={{ left: 0, top: -8 }}
      />
      <Tooltip 
        position={Position.TopRight}
        target={
          <Button onClick={() => saveDesc(props.selectedText)}>Select</Button>
        }
        content={() => <div style={{ width: "100px" }}>Add to annotation</div>}
        offset={{ left: 0, top: -8 }}
      />
    </div>
  )

  const renderHighlightContent = props => {
    const addNote = () => {
      if (message !== "") {
        const note = {
          id: ++noteId,
          content: message,
          highlightAreas: props.highlightAreas,
          quote: props.selectedText
        }
        setNotes(notes.concat([note]))
        setDesc(props.selectedText)
        props.cancel()
      }
    }

    return (
      <div
        style={{
          background: "#fff",
          border: "1px solid rgba(0, 0, 0, .3)",
          borderRadius: "2px",
          padding: "8px",
          position: "absolute",
          left: `${props.selectionRegion.left}%`,
          top: `${props.selectionRegion.top + props.selectionRegion.height}%`,
          zIndex: 1
        }}
      >
        <div>
          <textarea
            rows={3}
            style={{
              border: "1px solid rgba(0, 0, 0, .3)"
            }}
            onChange={e => setMessage(e.target.value)}
          ></textarea>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "8px"
          }}
        >
          <div style={{ marginRight: "8px" }}>
            <PrimaryButton onClick={addNote}>Add</PrimaryButton>
          </div>
          <Button onClick={props.cancel}>Cancel</Button>
        </div>
      </div>
    )
  }

  const jumpToNote = note => {
    if (notes) {
      activateTab(3)
      const notesContainer = notesContainerRef.current
      if (noteEles.has(note.id) && notesContainer) {
        notesContainer.scrollTop = noteEles
          .get(note.id)
          .getBoundingClientRect().top
      }
    }
  }

  const renderHighlights = props => (
    <div>
      {notes.map(note => (
        <React.Fragment key={note.id}>
          {note.highlightAreas
            .filter(area => area.pageIndex === props.pageIndex)
            .map((area, idx) => (
              <div
                key={idx}
                style={Object.assign(
                  {},
                  {
                    background: "yellow",
                    opacity: 0.4
                  },
                  props.getCssProperties(area, props.rotation)
                )}
                onClick={() => jumpToNote(note)}
              />
            ))}
        </React.Fragment>
      ))}
    </div>
  )
  
  const highlightPluginInstance = highlightPlugin({
    renderHighlightTarget,
    renderHighlightContent,
    renderHighlights,
  });
  
  const { jumpToHighlightArea } = highlightPluginInstance

  useEffect(() => {
    return () => {
      noteEles.clear()
    }
  }, [])

  const sidebarNotes = (
    <div
      ref={notesContainerRef}
      style={{
        overflow: "auto",
        width: "100%"
      }}
    >
      {notes.length === 0 && (
        <div style={{ textAlign: "center" }}>There is no note</div>
      )}
      {notes.map(note => {
        return (
          <div
            key={note.id}
            style={{
              borderBottom: "1px solid rgba(0, 0, 0, .3)",
              cursor: "pointer",
              padding: "8px"
            }}
            onClick={() => jumpToHighlightArea(note.highlightAreas[0])}
            ref={ref => {
              noteEles.set(note.id, ref)
            }}
          >
            <blockquote
              style={{
                borderLeft: "2px solid rgba(0, 0, 0, 0.2)",
                fontSize: ".75rem",
                lineHeight: 1.5,
                margin: "0 0 8px 0",
                paddingLeft: "8px",
                textAlign: "justify"
              }}
            >
              {note.quote}
            </blockquote>
            {note.content}
          </div>
        )
      })}
    </div>
  )

  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: defaultTabs =>
      defaultTabs.concat({
        content: sidebarNotes,
        icon: <MessageIcon />,
        title: "Notes"
      })
  })
  
  const { activateTab } = defaultLayoutPluginInstance

  const handleChange = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let selectedFilename = selectedFile.name;
        setUrl(selectedFilename);
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPdfFile(e.target.result);
        };
      } else {
        setError("Not a valid PDF file");
      }
    }
  };

  const handleFileUpload = async () => {
    const files = fileInputRef.current.files;
    if (files.length > 0) {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
      try {
        const responseGD = await fetch("http://localhost:5005/upload", {
          method: "POST",
          body: formData,
        });

        const data = await responseGD.json();
        console.log("upload file: ", data.files);
      } catch (error) {
        console.log("error");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const report = { url, uploadedAt, userID, validated };

    const response = await fetch("/api/reports", {
      method: "POST",
      body: JSON.stringify(report),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setModalMessage("Upload failed");
    }

    if (response.ok) {
      // reset the error
      setError(null);

      //reset the form
      setPdfFile("");
      setModalMessage("Upload successfully");
      console.log("new report added: ", json);
      // dispatch({ type: 'CREATE_REPORT ', payload: json })
    }
    setIsModalOpen(true);
  };

  return (
    <div>
      <form className="create" onSubmit={handleSubmit}>
        <h3>Upload a PDF file</h3>
        <label>Choose a PDF file</label>
        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={handleChange}
          pattern="*.pdf"
          required
        />
        <button onClick={handleFileUpload}>Upload</button>
        {error && <div className="error">{error}</div>}
      </form>
      <MessageModal
        isOpen={isModalOpen}
        message={modalMessage}
        onRequestClose={() => setIsModalOpen(false)}
      />
      <h2>View PDF</h2>
      <div className="viewer">
        {pdfFile && (
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <Viewer fileUrl={pdfFile} plugins={[newplugin, highlightPluginInstance]} onDocumentLoad={handleDocumentLoad}></Viewer>
          </Worker>
        )}
        {!pdfFile && <>No PDF</>}
      </div>
    </div>
  );
};

export default ReportForm;
