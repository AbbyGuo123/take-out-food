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

const calculateHalfCut = (halfCutIdArray,cart)=>{
  let halfCut = 0.00;
  for(let cartItem of cart){
    for(let halfCutId of halfCutIdArray){
        if(halfCutId === cartItem.id){
          halfCut += (cartItem.count * cartItem.price)/2;
        }
    }
  }
  
  return halfCut;
}

const calculatefullCut = (cart)=>{
  let totalPrice = 0.00;
  for(let cartItem of cart){
    totalPrice+=cartItem.price*cartItem.count;
  }
  return parseInt(totalPrice/30)*6;
}

const calculatetotalPrice=(codeAndNumArray,items)=>{
  let totalPrice =0.00;
  for(let item of items){
    for(let codeAndNumObject of codeAndNumArray){
      if(item.id === codeAndNumObject.id){
        totalPrice += item.price*codeAndNumObject.count;
      }
    }
  }
  return totalPrice;
}

const generatePrintOrderList = (cart,halfCutIdArray,halfCut,fullCut,totalPrice)=>{
  let printOrderList ='============= 订餐明细 =============\n';
  for(let cartItem of cart){
     printOrderList += cartItem.name+' x '+cartItem.count+' = '+cartItem.price*cartItem.count+'元\n';
  }
  let cutExplain = '';
  if(halfCut<=fullCut){
    cutExplain += '满30减6元，省'+fullCut+'元'
    totalPrice -=fullCut;
  }
  else{
    cutExplain = '指定菜品半价(';
    for(let cartItem of cart){
      for(let halfCutId of halfCutIdArray){
        if(halfCutId===cartItem.id){
          cutExplain+=cartItem.name;
        }
      }
    }
    cutExplain +=')，省'+halfCut+'元\n';
    totalPrice -=halfCut;
  }
  printOrderList+='-----------------------------------\n'
  +'使用优惠:\n'+cutExplain+'-----------------------------------\n'
  +'总计：'+totalPrice+'元\n'+'===================================\n';


  let expected = `
============= 订餐明细 =============
黄焖鸡 x 4 = 18元
-----------------------------------
使用优惠:
指定菜品半价(黄焖鸡)，省36元
-----------------------------------
总计：36元
===================================`;
  return printOrderList;
}




module.exports = {bestCharge,generateCodeAndNumArrayByInput,generateHalfCutIdArray,generateOrderGoodsList,calculateHalfCut,calculatefullCut,calculatetotalPrice,generatePrintOrderList};
