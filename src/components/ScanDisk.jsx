import React from 'react'
import {Input , Button,Code} from "@nextui-org/react";
const ScanDisk = () => {
    const [diskSize , setDiskSize] = React.useState(0);
    const [seekSequence , setSeekSequence] = React.useState([]);
    const [seekValue , setSeekValue] = React.useState(0)
    const handleClick = () => {
        setSeekSequence([...seekSequence,seekValue])
    }
    const handleReset = () => {
        setSeekSequence([]);
        setSeekValue(0);
        setDiskSize(0);
    }
  return (
    <div>
    <div className='flex flex-col justify-center items-center gap-5'>
        <h1 className='text-3xl text-white font-semibold mb-10'>Scan Disk Scheduling Algorithm</h1>
        <Input
        label="Disk Size"
        value={diskSize}
        onValueChange={setDiskSize}
        className="w-6/12 font-bold"
        />
        <div className='flex justify-between w-6/12 items-center gap-5'>
        <Input
        label="Enter Seek Value"
        value={seekValue}
        onValueChange={setSeekValue}
        className="font-bold"
        />
        <Button color="primary" variant="ghost" onClick={handleClick}>
        Add Value
        </Button>  
        </div>
        <div className='flex justify-evenly gap-5 w-6/12'>
        <Button variant='ghost' color='primary' onClick={handleReset}>Reset</Button>
        <Button variant='ghost' color="primary">Generate</Button>
        </div>
    </div>
    <h1 className='text-white text-xl font-semibold pt-10 pb-0 mb-0'>Request Sequence</h1>
    <div className='flex justify-center text-2xl mt-3 gap-2'>
            {seekSequence.length===0 ? <Code color='danger'>EMPTY</Code> : seekSequence.map((item,index) => (<Code key={index} color="primary">{item}</Code>))}
        </div>
    </div>
    
    
  )
}

export default ScanDisk