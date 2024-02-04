// Grid.tsx
import "./grid.css";
import { useState, useEffect } from "react";
import Card from "./Card";
import CredentialService from "../../utils/credentialService";
import AddButton from "../Form/AddButton";

const credentialService = new CredentialService();
export interface CredentialData {
  credentialId: string;
  credentialTitle: string;
  credentialUsername: string;
  dateCreated: string;
  dateUpdated: string;
}
type GridProps = {
  onCardClick: (credentialData: CredentialData, updateClicked: boolean) => void;
  onAddClick: () => void;
  onFormSubmit: boolean;
};

const Grid = (props: GridProps) => {
  const [credentials, setCredentials] = useState<any>([]);

  const handleCardClick = (
    credentialData: CredentialData,
    updateClicked: boolean
  ) => {
    props.onCardClick(credentialData, updateClicked);
  };
  const handleDeleteClick = (credentialId: number) => {
    credentialService.deleteCredential(credentialId);
    setCredentials(
      credentials.filter(
        (credential: any) => credential.credentialId !== credentialId
      )
    );
  };
  const handleSearch = () => {
    const input = document.getElementById("searchInput");
    if (input) {
      input.addEventListener("keyup", (e) => {
        const inputElement = e.target as HTMLInputElement;
        const searchString = inputElement.value.toLowerCase();
        const filteredCredentials = credentials.filter((credential: any) => {
          return credential.title.toLowerCase().includes(searchString);
        });
        setCredentials(filteredCredentials);
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await credentialService.findCredentialsByUserId(1);
        setCredentials(result);
      } catch (error) {
        console.error("Error fetching credentials:", error);
      }
    };
    fetchData();

    return () => {
      window.ipcRenderer.removeAllListeners("findCredentialsByIdResponse");
    };
  }, [props.onFormSubmit]);

  const injectCard = credentials.map((item: any, index: any) => (
    <Card
      onClick={() => handleCardClick(item, false)}
      onUpdateClick={() => handleCardClick(item, true)}
      onDeleteClick={() => handleDeleteClick(item.credentialId)}
      key={index}
      index={index}
      id={item.credentialId.toString()}
      title={item.title}
      username={JSON.parse(item.data).userName}
      dateCreated={item.dateCreated.toString().slice(0, 10)}
      dateUpdated={item.dateUpdated.toString().slice(0, 10)}
    ></Card>
  ));

  return (
    <>
      <div className="sticky top-0 bg-neutral-100 z-10 flex items-center justify-start p-4 gap-3">
        <h3 className="text-xl font-medium p-1">
          Credentials ({credentials.length})
        </h3>
        <div>
          <div id="search-container" className="relative w-80">
            <input
              id="searchInput"
              type="text"
              placeholder="Search"
              className=" font-nunito ml-2 w-full h-8 p-4 text-xs rounded-xl border-2 transition-all duration-300 shadow-md focus:shadow-lg focus:outline-none focus:border-blue-600"
              onClick={handleSearch}
            />
          </div>
        </div>
        <AddButton onClick={props.onAddClick}></AddButton>
      </div>
      <div className="cards p-3 gap-5">{injectCard}</div>
    </>
  );
};

export default Grid;
