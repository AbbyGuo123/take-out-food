function bestCharge(selectedItems) {
  return '0000';
}

const generateCodeAndNumArrayByInput = (selectedItems)=>{
  let codeAndNum = [];
  for(let item of selectedItems){
    let codeAndNumObject =item.split('x'); 
    codeAndNum.push({id:codeAndNumObject[0].trim(),count:parseInt(codeAndNumObject[1])});
  }

  return codeAndNum;
}
const generateHalfCutIdArray=(promotion,codeAndNumArray)=>{
  return ['ITEM0001'];
}


module.exports = {bestCharge,generateCodeAndNumArrayByInput,generateHalfCutIdArray};
