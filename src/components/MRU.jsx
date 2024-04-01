import React from 'react'
import { Input, Button } from '@nextui-org/react';
const MRU = () => {
    const [frames,setFrames] = React.useState(0);
  return (
    <div>
        <h1 className='text-white text-3xl font-semibold'>MRU</h1>
        <h2 className='text-white text-xl'>(Most Recently Used Page Replacement)</h2>
        <div className='flex justify-center mt-10 items-center gap-5'>
            <Input label="Enter number of frames" className='w-4/12' />
            <Button variant='ghost' color='primary' label='Submit' onClicl/>
        </div>

    </div>
  )
}

export default MRU;