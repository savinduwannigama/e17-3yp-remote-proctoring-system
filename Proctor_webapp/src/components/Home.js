import React from 'react'
import Papa from "papaparse";
import { readRemoteFile } from 'react-papaparse';
import csvJSON from './csvtojson';
/*function Home() {
    return (
        <div>
            
        </div>
    )
}

export default Home*/


export default function Home() {
    
  return (
    <div className="home">
      <input
        type="file"
        accept=".csv,.xlsx,.xls"
        onChange={(e) => {
          const files = e.target.files;
          console.log(files);
          
          if (files) {
            console.log(files[0]);
            const results = Papa.readString(files[0], {
                header:true
            })
            Papa.parse(files[0], {
              complete: function(results) {
                console.log("Finished:", results);
              }}
            )
            
          }
          
        }}
      />

      
    </div>
  );
}
