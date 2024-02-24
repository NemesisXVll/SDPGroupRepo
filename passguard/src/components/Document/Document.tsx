import { useState } from "react";
import Navbar from "../Navbar";
import "../CredentialSection/grid.css";
import { useLocation } from "react-router-dom";
import { IoDocument } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { Button, FileInput, Label } from 'flowbite-react';
import { Checkbox, Modal, TextInput } from 'flowbite-react';
import AddButton from "../Form/Button";
import DocumentModal from "./DocumentModal";

function Document() {
  const location = useLocation();

  const [openModal, setOpenModal] = useState(false);
  const [expanded, setExpanded] = useState(location.state?.expanded);

  function handleOnInputChange(event: any): void {
    event.preventDefault();
    const document = event.target.files[0];
    console.log(document);
    event.target.value = "";
  }


  function handleAddDocument(event: any): void {
    setOpenModal(true);
  }

  return (
    <>
      <div className="app-container h-screen">

        <div className="navbar">
          <Navbar
            isExpanded={expanded}
            handleExpand={(expanded) => setExpanded(expanded)}
          />
        </div>

        <div className="flex flex-col border-b-2">

          <div className="p-2 m-3">

            <div className="flex">
              <Label value="Documents" className="flex p-1 text-xl font-medium mb-2" color="dark" />
              <IoDocument className="mt-2 h-5" />
            </div>

            {openModal ? <DocumentModal closeModal={() => setOpenModal(false)} modalVal={openModal}></DocumentModal> : ""}

            <Button onClick={handleAddDocument} className="ml-1 w-fit hover:bg-gray-900 bg-gray-800 rounded-r-md rounded-l-md pr-1">
              <FaPlus className="mr-1" />
              Add Document</Button>

  

          </div>
        </div>
      </div>
    </>
  );
}

export default Document;
