import { useEffect, useState } from 'react'

// import '../App.css'
import '../test.css'
// import GridCard from './Test'
import { Dir } from 'original-fs'
import Card from './Card'
import CredentialService from '../utils/credentialService';
// main.ts

const credentialService = new CredentialService();

const Grid = ()=> {
  const [credentials, setCredentials] = useState<any>([]);
  let result;

  useEffect(() => {
    const fetchData = async () => {
      try {
        result = await credentialService.findCredentialsById(1);
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
      <div className="sticky top-0 bg-white z-10">
        <h3 className="text-xl font-medium p-1">Credentials (5)</h3>
      </div>
      <div className="flex flex-wrap gap-4 p-4 overflow-auto">
      {injectCard}
      </div>
    </>
  );
};

export default Grid;
