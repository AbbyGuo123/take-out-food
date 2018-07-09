const{loadPromotions} = require('../spec/promotions');
const{loadAllItems} = require('../src/items');


function bestCharge(selectedItems) {
  let promotion = loadPromotions();
  let items = loadAllItems();

  let codeAndNumArray = generateCodeAndNumArrayByInput(selectedItems);
  let halfCutIdArray =generateHalfCutIdArray(promotion); 
  let cart = generateOrderGoodsList(codeAndNumArray,items);
  let halfCut = calculateHalfCut(halfCutIdArray,cart);
  let fullCut = parseInt(calculatetotalPrice(cart)/30)*6;
  let totalPrice = calculatetotalPrice(cart);
  let printOrderList = generatePrintOrderList (cart,halfCutIdArray,halfCut,fullCut,totalPrice);
  return printOrderList;
}

const generateCodeAndNumArrayByInput = (selectedItems)=>{
  let codeAndNumArray = [];
  // let codeAndNumArray = selectedItems.filter(item=>{item.split('x')[0],item.split('x')[1]});
  selectedItems.filter(item=>
    {
      let codeAndNumObject =item.split('x'); 
      codeAndNumArray.push({id:codeAndNumObject[0].trim(),count:parseInt(codeAndNumObject[1])});
    }
  )
  return codeAndNumArray;
}
const generateHalfCutIdArray=(promotion)=>{
  let hafCutIdArray = [];
  // hafCutIdArray = promotion.filter(promotionObject=>{if(promotionObject.type==='指定菜品半价') return promotionObject.items});
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

const calculatetotalPrice=(cart)=>{
  let totalPrice =0.00;
  cart.map(cartItem=>{totalPrice+=cartItem.price*cartItem.count;});
  return totalPrice;
}

const generatePrintOrderList = (cart,halfCutIdArray,halfCut,fullCut,totalPrice)=>{
  let printOrderList ='============= 订餐明细 =============\n';
  cart.map(cartItem=>{printOrderList += `${cartItem.name} x ${cartItem.count} = ${cartItem.price*cartItem.count}元\n`;})
  let cutExplain = '';
  if(halfCut<=fullCut){
    cutExplain += `满30减6元，省${fullCut}元\n`
    totalPrice -=fullCut;
  }
  else{
    cutExplain = '指定菜品半价(';

    let itemsName = halfCutIdArray.map(halfCutId=>
      {
        const item = cart.find(cartItem=>halfCutId===cartItem.id);
        if(item!==undefined)return item.name;
      }
    );

    cutExplain +=itemsName.join('，');
    // console.log("+++++"+itemsName);
    // cart.map(cartItem=>{halfCutIdArray.map(halfCutId=>{halfCutId===cartItem.id && (cutExplain+=cartItem.name+'，')})})
    // cutExplain = cutExplain.substring(0,cutExplain.length-1);
    cutExplain +=')，省'+halfCut+'元\n';
    totalPrice -=halfCut;
  }if(halfCut!==0&&fullCut!==0){
    printOrderList+=`-----------------------------------
使用优惠:\n${cutExplain}`;
  }
  printOrderList+=`-----------------------------------
总计：${totalPrice}元\n===================================`;
  return printOrderList;
}




module.exports = {bestCharge,generateCodeAndNumArrayByInput,generateHalfCutIdArray,generateOrderGoodsList,calculateHalfCut,calculatetotalPrice,generatePrintOrderList};
