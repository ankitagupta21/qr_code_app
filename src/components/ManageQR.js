import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import QRCode from "qrcode.react";
import "./ManageQR.css";
import PhoneInput from "react-phone-input-2";

function ManageQR() {
  const location = useLocation();
  const history = useNavigate();
  const [qrCodes, setQRCodes] = useState([]);
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [editedPhoneNumber, setEditedPhoneNumber] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const addQRCode = () => {
    if (newPhoneNumber.trim() === "") {
      alert("Please enter a valid phone number.");
      return;
    }

    const newQRCode = {
      phoneNumber: newPhoneNumber.trim(),
      isActive: true,
    };

    // Generate a QR code and add it to the list
    setQRCodes([...qrCodes, newQRCode]);

    // Clear the input field
    setNewPhoneNumber("");
  };

  // Function to edit an existing QR code
  const editQRCode = (index) => {
    const qrCodeToEdit = qrCodes[index];
    setEditedPhoneNumber(qrCodeToEdit.phoneNumber);
    setEditingIndex(index);
  };

  // Function to save the edited QR code
  const saveEditedQRCode = () => {
    if (editingIndex !== null) {
      const updatedQRCodes = [...qrCodes];
      updatedQRCodes[editingIndex].phoneNumber = editedPhoneNumber.trim();
      setQRCodes(updatedQRCodes);
      setEditingIndex(null);
    }
  };

  // Function to close the edit modal
  const cancelEdit = () => {
    setEditingIndex(null);
    setEditedPhoneNumber("");
  };

  // Function to deactivate or activate a QR code
  const toggleActivation = (index) => {
    const updatedQRCode = { ...qrCodes[index] };
    updatedQRCode.isActive = !updatedQRCode.isActive;
    const updatedQRCodes = [...qrCodes];
    updatedQRCodes[index] = updatedQRCode;
    setQRCodes(updatedQRCodes);
  };

  return (
    <div className="container">
      <h2 className="heading1">Manage QR</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addQRCode();
        }}
        className="form"
      >
        <label className="form-label">
          Mobile Number:
          <PhoneInput
            country={"in"}
            className="form-input"
            value={newPhoneNumber}
            onChange={setNewPhoneNumber}
          />
        </label>

        <button type="submit">Add QR Code</button>
      </form>

      <ul style={{ width: "80%" }}>
        {qrCodes.map((qrCode, index) => (
          <li key={index} className="list">
            <div>
              Phone Number: {qrCode.phoneNumber} |{" "}
              {qrCode.isActive ? "Active" : "Inactive"} |{" "}
              <button onClick={() => editQRCode(index)}>Edit</button>{" "}
              <button onClick={() => toggleActivation(index)}>
                {qrCode.isActive ? "Deactivate" : "Activate"}
              </button>
            </div>
            {qrCode.isActive && <QRCode value={`tel:${qrCode.phoneNumber}`} />}

            <button
              onClick={() =>
                history("/call", { state: { id: qrCode.phoneNumber } })
              }
            >
              Scan
            </button>
          </li>
        ))}
      </ul>
      {editingIndex !== null && (
        <div className="modal">
          <h3 className="heading2">Edit QR Code</h3>
          <label className="form-label">
            New Phone Number:
            <PhoneInput
              country={"in"}
              className="form-input"
              value={editedPhoneNumber}
              onChange={setEditedPhoneNumber}
            />
          </label>
          <button onClick={saveEditedQRCode}>Save</button>
          <button onClick={cancelEdit}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default ManageQR;
