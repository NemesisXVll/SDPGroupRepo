import { useState } from 'react'

// import '../App.css'
import '../test.css'
// import GridCard from './Test'
import { Dir } from 'original-fs'
import Card from './Card'
// main.ts

const Grid = ()=> {

  return (


      <div className="cards grid auto-cols-200px w-full">
        {/* <div className="card card1"> */}
        <Card></Card>
        <Card></Card>

        <Card></Card>
        <Card></Card>
        <Card></Card>

        {/* </div> */}

      </div>
     
  );
};

export default Grid;
