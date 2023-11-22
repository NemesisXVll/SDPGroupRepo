import "../grid.css";
import Card from "./Card";
import { useState, useEffect } from "react";
import CredentialService from "../utils/credentialService";

const credentialService = new CredentialService();

const Grid = () => {
  const [credentials, setCredentials] = useState<any>([]);
  let result;

  useEffect(() => {
    const fetchData = async () => {
      try {
        result = await credentialService.findCredentialsByUserId(1);
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
      key={index}
      id={item.credentialId.toString()}
      title={item.title}
      username={JSON.parse(item.data).userName}
      dateCreated={item.dateCreated}
      dateUpdated={item.dateUpdated}
    ></Card>
  ));

  return (
    <>
      <div className="sticky top-0 bg-neutral-100 z-10">
        <h3 className="text-xl font-medium p-1">Credentials (5)</h3>
      </div>
      <div className="cards p-2 gap-5 ml-4">
      {injectCard}
      </div>
    </>
  );
};

export default Grid;
