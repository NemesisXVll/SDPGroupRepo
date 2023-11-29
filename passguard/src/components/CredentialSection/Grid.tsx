// Grid.tsx
import "./grid.css";
import { useState, useEffect } from "react";
import Card from "./Card";
import CredentialService from "../../utils/credentialService";

const credentialService = new CredentialService();

type GridProps = {
  onCardClick: (credentialId: string) => void;
};

const Grid = (props: GridProps) => {
  const [credentials, setCredentials] = useState<any>([]);

  const handleCardClick = (credentialId: string) => {
    props.onCardClick(credentialId);
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
  }, [credentials]);

  const injectCard = credentials.map((item: any, index: any) => (
    <Card
      onClick={() => handleCardClick(item.credentialId)}
      key={index}
      id={item.credentialId.toString()}
      title={item.title}
      username={JSON.parse(item.data).userName}
      dateCreated={item.dateCreated.toString().slice(0, 10)}
      dateUpdated={item.dateUpdated.toString().slice(0, 10)}
    ></Card>
  ));

  return (
    <>
      <div className="sticky top-0 bg-neutral-100 z-10">
        <h3 className="text-xl font-medium p-1">Credentials (0)</h3>
      </div>
      <div className="cards p-2 gap-5 ml-4">{injectCard}</div>
    </>
  );
};

export default Grid;
