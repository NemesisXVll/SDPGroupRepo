import '../grid.css'
import Card from './Card'

const Grid = ()=> {

  return (
    <>
      <div className="sticky top-0 bg-white z-10">
        <h3 className="text-xl font-medium p-1">Credentials (5)</h3>
      </div>
      <div className="cards p-2 gap-3 ml-4">
        <Card></Card>
        <Card></Card>

        <Card></Card>
        <Card></Card>
        <Card></Card>
      </div>
    </>
  );
};

export default Grid;
