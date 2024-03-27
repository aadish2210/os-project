import React from 'react'
import {Button, Input} from "@nextui-org/react"
const Bankers = () => {
  const [resource , setResource] = React.useState();
  const [id, setId] = React.useState('');
  const [allocated, setAllocated] = React.useState([]);
  let temp = [];
  for(let i=0 ; i<resource ; i++){
    temp.push(i+1);
  }
  return (
    <div className='flex flex-col justify-center items-center'>
        <h1 className='text-4xl text-white font-semibold mt-3'>Banker's Algorithm</h1>
        <div className='flex items-center justify-center m-5 gap-5'>
        <Input value={resource}  onValueChange={setResource} label="Enter Number Of Resources" className='font-semibold w-56'></Input>
        </div>
        <Input value={id} onValueChange={setId} label="Enter process ID" className='font-semibold w-4/12' defaultValue='null'></Input>
        {id!='' ? <><h1 className='text-white text-xl mt-5'>Allocated</h1>
        <div className='flex gap-5 m-5 mb-0 justify-center flex-wrap'>
        {temp.map((item,index) => (<Input key={index} className='font-semibold h-12 w-32' label={item} ></Input>))}
        </div></> : null}
        {id!='' ? <><h1 className='text-white text-xl mt-5'>Needed</h1>
        <div className='flex gap-5 m-5 justify-center flex-wrap'>
        {temp.map((item,index) => (<Input key={index} className='font-semibold h-12 w-32' label={item}></Input>))}
        </div><Button variant='ghost' color='primary'>Save</Button></>: null}

    </div>
  )
}

export default Bankers