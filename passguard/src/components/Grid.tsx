import { useState } from 'react'

// import '../App.css'
import '../test.css'
// import GridCard from './Test'
import { Dir } from 'original-fs'
import Card from './Card'
// main.ts

const Grid = ()=> {

  return (
    <>
      <div className="">
        <h3 className="text-xl font-medium p-1">Credentials (5)</h3>
      </div>
      <div className="flex flex-wrap gap-4 p-4">
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
