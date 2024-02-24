import { FileInput, Label, Modal, Select, TextInput } from "flowbite-react";
import AddButton from "../Form/Button";
import { useState } from "react";

type DocumentModalProps = {
    modalVal: boolean;
    closeModal: () => void;
};

function DocumentModal(props: DocumentModalProps) {

    const [openModal] = useState(props.modalVal);
    const [formData, setFormData] = useState({
        type: "",
        file: "",
        fileName: "",
        fileCategory: "",
    });

    function onCloseModal() {
        props.closeModal();
    }

    function handleAddDocument(event: any): void {
        event.preventDefault();
        formData.type = formData.file?.split(".").pop() || '';
        console.log(formData);

        props.closeModal();
    }

    function handleOnInputChange(event: any): void {
        if (event.target.id === "file") {
            const selectedFile = event.target.files?.[0].path;
            setFormData({ ...formData, [event.target.id]: selectedFile });
        }
        else {
            setFormData({ ...formData, [event.target.id]: event.target.value });
            console.log(formData);
        }
    }

    return (
        <>
            <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl font-nunito font-bold text-gray-900 dark:text-white text-center">Add Document</h3>

                        <form>

                            <div className="mb-1 block">
                                <Label htmlFor="file" value="Upload File" className="" />
                            </div>
                            <FileInput id="file" className="font-nunito" onChange={handleOnInputChange} />

                            <div className="mt-2 block">
                                <Label htmlFor="fileName" value="File Name" className="" />
                                <TextInput id="fileName" className="w-full" onChange={handleOnInputChange} />
                            </div>

                            <div className="mt-2 block">
                                <Label htmlFor="fileCategory" value="Category" />
                            </div>
                            <Select id="fileCategory" required onChange={handleOnInputChange}>
                                <option>Driver License</option>
                                <option>Passport/ID</option>
                                <option>Bank Card</option>
                                <option>Insurance</option>
                                <option>Contract</option>
                                <option>Medical</option>
                                <option>Legal</option>
                                <option>Receipt</option>
                                <option>Other</option>
                            </Select>

                            <div className="w-full mt-6">
                                <AddButton onClick={handleAddDocument} type="button" value="Save">Add</AddButton>
                            </div>

                        </form>



                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default DocumentModal;



