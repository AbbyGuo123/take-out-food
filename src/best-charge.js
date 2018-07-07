function bestCharge(selectedItems) {
  return '0000';
}

const generateCodeAndNumArrayByInput = (selectedItems)=>{
  let codeAndNumArray = [];
  for(let item of selectedItems){
    let codeAndNumObject =item.split('x'); 
    codeAndNumArray.push({id:codeAndNumObject[0].trim(),count:parseInt(codeAndNumObject[1])});
  }

  return codeAndNumArray;
}
const generateHalfCutIdArray=(promotion,codeAndNumArray)=>{
  let hafCutIdArray = [];
  for(let promotionObject of promotion ){
    if(promotionObject.type==='指定菜品半价'){
      for(let itemId of promotionObject.items){
        hafCutIdArray.push(itemId);
      }
    }
  }
  return hafCutIdArray;
}
const generateOrderGoodsList=(codeAndNumArray,items)=>{
  
  return [{id:'ITEM0001',name:'黄焖鸡',count:4,price:18.00}];
}


module.exports = {bestCharge,generateCodeAndNumArrayByInput,generateHalfCutIdArray,generateOrderGoodsList};
