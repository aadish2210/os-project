import React, { useState } from 'react';
import { Input, Button } from '@nextui-org/react';
import BasicTable from './BasicTable';

const MRU = () => {
    const [frames, setFrames] = useState('');
    const [series, setSeries] = useState('');
    const [result, setResult] = useState([]);
    const [totalHits, setTotalHits] = useState(0);
    const [totalMisses, setTotalMisses] = useState(0);
    const [seqLen, setseqLen] = useState(0); 
    const [frameLogs, setFrameLogs] = useState([]);
    

    const handleFramesChange = (e) => {
        setFrames(e.target.value);
    };

    const handleSeriesChange = (e) => {
        setSeries(e.target.value);
    };

    const handleSubmit = () => {
        // Parse frames and series to integers
        const frameCount = parseInt(frames);
        const sequence = series.split(',').map(Number);
        const framelength = sequence;

        const generateProcessIds = (series) => {
            const processIdMap = new Map();
            const processIds = [];
        
            series.forEach((num) => {
                if (!processIdMap.has(num)) {
                    processIdMap.set(num, processIdMap.size + 1);
                    processIds.push(`P${processIdMap.size}`);
                }
            });
        
            return processIds;
        };

        
        // Call MRU algorithm
        const { MRUResult, hits, misses, seqLen, frameLogs } = simulateMRU(frameCount, sequence, framelength);

        // Update state with MRU result, total hits, and total misses
        setResult(MRUResult);
        setTotalHits(hits);
        setTotalMisses(misses);
        setseqLen(seqLen);
        setFrameLogs(frameLogs);
        
        

        
        console.log("seqLen:", seqLen);
        console.log("frameLogs:", frameLogs);
    };

    const simulateMRU = (framelength, sequence) => {
        let i, j;
        let hits = 0;
        let misses = 0;
        let result = [];
        let frame = [];
        let pageReferences = Array.from({ length: framelength }, () => []);

        let seqLen = sequence.length;
        let HM = [];
        let countFrame = 0;
        let lastEntered = 0;
        
        console.log(seqLen);
        
        for (i = 0; i < framelength; i++) {
            frame[i] = -1;
        }
        
        for (i = 0; i < seqLen; i++) {
            HM[i] = 0;
        }
        
        // Function to push array with MRU logic
        function PushFrame(frame, x) {
            for(j=0;j<framelength;j++){
                    if(countFrame < framelength){
                        frame[countFrame] = x;  
                        lastEntered = x;
                        countFrame++;
                        break;
                    }
                    else{
                        let a = 0;
                         while(frame[a]!=lastEntered){
                            a++;
                         }
                         frame[a] = x;
                         lastEntered = x;
                         break;
                    }
                }
        }
        
         // Function to update page references for each frame
       
        function HitMiss(seqLen, frame, framelength, HM, sequence) {
            for (i = 0; i < seqLen; i++) {
                let found = false;
                for (j = 0; j < framelength; j++) {
                    if (frame[j] == sequence[i]) {
                        HM[i] = 1;
                        found = true;
                        console.log(frame.join(" "));
                        lastEntered = sequence[i];
                        break;
                    }
                }
                if (!found) {
                    PushFrame(frame, sequence[i]); // Update the frame with MRU logic
                    console.log(frame.join(" "));
                    HM[i] = 0;
                }
                frameLogs.push([...frame]);
                
            }

           
        }
        
        HitMiss(seqLen, frame, framelength, HM, sequence);
        
        for (i = 0; i < HM.length; i++) {
            if (HM[i] === 1) {
                console.log("Hit");
                hits++;
                result.push('Hit');
            } else {
                console.log("Miss");
                // Find the index of the most recently used frame
                let mruIndex = frame.reduce((acc, val, idx) => (val > frame[acc] ? idx : acc), 0);
                frame[mruIndex] = sequence[i];
                misses++;
                result.push('Miss');
            }
        }

    return { MRUResult: result, hits, misses, seqLen, frameLogs};
        
    };



    return (
        <>
        <div className='text-white'>
            <h1 className='text-white text-3xl font-semibold'>MRU</h1>
            <h2 className='text-white text-xl'>(Most Recently Used Page Replacement)</h2>
            <div className='flex justify-center mt-10 items-center gap-5'>
                <Input label="Enter number of frames" className='w-4/12' value={frames} onChange={handleFramesChange} />
                <Input label="Enter the series" className='w-4/12' value={series} onChange={handleSeriesChange} />
                <Button variant='ghost' color='primary' onClick={handleSubmit}>Submit</Button>
            </div>
            <div className="mt-5">
                <h2>Result:</h2>
                {result.map((item, index) => (
                    <p key={index}>{item}</p>
                ))}
            </div>
            <div className="mt-5">
                <h2>Total Hits: {totalHits}</h2>
                <h2>Total Misses: {totalMisses}</h2>
            </div>
           
        </div>
        <div className="mt-5"></div>
        <BasicTable frames={frames} seqLen={seqLen} frameLogs={frameLogs} series={series}/>
        </>
    );
};

export default MRU;
