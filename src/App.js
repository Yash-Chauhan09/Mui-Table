import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  container: {
    maxHeight: 520,
  },
});

function App() {
  const classes = useStyles();
  const [data,setdata] = useState([])
  const[loading,setLoading]=useState(true)
  const dataHead =['ID','Name','EMAIL','PHONE','WEBSITE','COMPANY','ADDRESS']
  useEffect(()=>{
     const fetchData= async ()=>{
       try {
        const res = await axios.get('https://jsonplaceholder.typicode.com/users')
        setdata(res.data)
        setLoading(false)
       //  console.log(res)
       } catch(error) {
        //  console.log(error)
       }
    }
   fetchData()
  },[])
  return (
    <div className="App">
     <div className="app__container">
      <h2>Mui Table With Jsonplaceholder Api</h2>
      {
        loading ? 
        <h3 style={{textAlign:'center',marginTop:'4rem'}}>Loading...</h3>:(
          <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
        <TableHead style={{backgroundColor:'#000'}}>
          <TableRow style={{color:'#fff'}}>
            {dataHead.map((data, index)=>{
              return <TableCell key={index}>{data}</TableCell>
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((data) => (
            <TableRow key={data.id}>
              <TableCell component="th" scope="data">
                {data.id}
              </TableCell>
              <TableCell >{data.name}</TableCell>
              <TableCell >{data.email}</TableCell>
              <TableCell >{data.phone}</TableCell>
              <TableCell >{data.website}</TableCell>
              <TableCell >{data.company.name},{data.company.bs}</TableCell>
              <TableCell >{data.address.city},{data.address.street},{data.address.zipcode}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Paper>
        )
      }
     </div>
    </div>
  );
}
export default App;
