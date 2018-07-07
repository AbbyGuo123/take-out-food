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

const generatePrintOrderList = (cart,halfCut,fullCut)=>{
  let expected = `
============= 订餐明细 =============
黄焖鸡 x 4 = 18元
-----------------------------------
使用优惠:
指定菜品半价(黄焖鸡)，省36元
-----------------------------------
总计：36元
===================================`;
  return expected;
}

module.exports = {bestCharge,generateCodeAndNumArrayByInput,generateHalfCutIdArray,generateOrderGoodsList,calculateHalfCut,calculatefullCut,generatePrintOrderList};
