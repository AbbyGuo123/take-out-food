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
  let cart = [];
  for(let item of items){
    for(let codeAndNumObject of codeAndNumArray){
      if(item.id === codeAndNumObject.id){
        const {id,name,price} = item;
        cart.push({id,name,count:codeAndNumObject.count,price});
      }
    }
  }
  return cart;
}


module.exports = {bestCharge,generateCodeAndNumArrayByInput,generateHalfCutIdArray,generateOrderGoodsList};
