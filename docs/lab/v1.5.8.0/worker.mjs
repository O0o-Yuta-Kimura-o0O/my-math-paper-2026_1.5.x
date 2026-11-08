/** Finite work runs off the UI thread and is terminated by the caller after 5s. */
import {runCalculus,runSeries,runGeometry} from './core.mjs';
import {verifyCertificate} from './checker.mjs';
import {encodeTyped} from './encoding.mjs';
self.onmessage=({data})=>{
 try{
  if(data?.task==='encode'){self.postMessage({encoded:encodeTyped(data.type,data.value,{maxCharacters:16000})});return;}
  if(data?.task==='verify'){self.postMessage({checked:verifyCertificate(data.certificate)});return;}
  const functions={calculus:runCalculus,series:runSeries,geometry:runGeometry};
  if(!Object.hasOwn(functions,data?.task))throw new Error('Unknown worker task.');
  const result=functions[data.task](data.inputs),checked=verifyCertificate(result.certificate);
  if(!checked.ok)throw new Error(checked.error);
  self.postMessage({result,checked});
 }catch(error){self.postMessage({error:error.message});}
};
