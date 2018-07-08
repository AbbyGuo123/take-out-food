const{bestCharge,generateCodeAndNumArrayByInput,generateHalfCutIdArray,generateOrderGoodsList,
  calculateHalfCut,calculatefullCut,calculatetotalPrice,generatePrintOrderList} = require('../src/best-charge');
const{loadPromotions} = require('../spec/promotions');
const{loadAllItems} = require('../src/items');

describe('UnitTest generateCodeAndNum', function () {

  it('generate CodeAndNumArray by input ', function() {
    let inputs = ["ITEM0001 x 4"];
    let summary = generateCodeAndNumArrayByInput(inputs);
    let codeAndNumArrayCheck = JSON.stringify([{id:'ITEM0001',count:4}]);
    expect(JSON.stringify(summary)).toBe(codeAndNumArrayCheck);
  });
});

describe('UnitTest generate halfCutIdArray', function () {

  it('generate halfCutIdArray by promotion and codeAndNum ', function() {

    let codeAndNumArray = [{id:'ITEM0001',count:4}];
    let promotion = loadPromotions();
    let summary = generateHalfCutIdArray(promotion,codeAndNumArray);
    let halfCutIdArray = JSON.stringify(['ITEM0001','ITEM0022']);
    expect(JSON.stringify(summary)).toBe(halfCutIdArray);
  });
});

describe('UnitTest generateOrderGoodsList', function () {

  it('generate orderGoodsList by codeAndNumArray and items ', function() {

    let codeAndNumArray = [{id:'ITEM0001',count:4}];
    let items = loadAllItems();
    let summary = generateOrderGoodsList(codeAndNumArray,items);
    let cart = JSON.stringify([{id:'ITEM0001',name:'黄焖鸡',count:4,price:18.00}]);
    expect(JSON.stringify(summary)).toBe(cart);
  });
});

describe('UnitTest calculateHalfCut', function () {

  it('calculate halfCut by halfCutIdArray and cart ', function() {

    let halfCutIdArray =['ITEM0001','ITEM0022'];
    let cart = [{id:'ITEM0001',name:'黄焖鸡',count:4,price:18.00}];
    let summary = calculateHalfCut(halfCutIdArray,cart);
    let halfCut = JSON.stringify(36.00);
    expect(JSON.stringify(summary)).toBe(halfCut);
  });
});

describe('UnitTest calculatefullCut', function () {

  it('calculate fullCut by cart ', function() {

    let cart = [{id:'ITEM0001',name:'黄焖鸡',count:4,price:18.00}];
    let summary = calculatefullCut(cart);
    let fullCut = JSON.stringify(12.00);
    expect(JSON.stringify(summary)).toBe(fullCut);
  });
});

describe('UnitTest calculatetotalPrice', function () {

  it('calculate totalPrice by codeAndNumArray and items ', function() {

    let codeAndNumArray = [{id:'ITEM0001',count:4}];
    let items = loadAllItems();
    let summary = calculatetotalPrice(codeAndNumArray,items);
    let totalPrice =72.00;
    expect(summary).toBe(totalPrice);
  });
});


describe('UnitTest generatePrintOrderList', function () {

  it('calculate generatePrintOrderList by cart ,halfCut,fullCut ', function() {

    let cart = [{id:'ITEM0001',name:'黄焖鸡',count:4,price:18.00}];
    let halfCut = 36;
    let fullCut = 12;
    let halfCutIdArray =['ITEM0001','ITEM0022'];
    let totalPrice=72;
    let summary = generatePrintOrderList(cart,halfCutIdArray,halfCut,fullCut,totalPrice).trim();
    let expected = `============= 订餐明细 =============
黄焖鸡 x 4 = 72元
-----------------------------------
使用优惠:
指定菜品半价(黄焖鸡)，省36元
-----------------------------------
总计：36元
===================================`.trim();
    expect(summary).toEqual(expected);
  });
});

// describe('Take out food', function () {

//   it('should generate best charge when best is 指定菜品半价', function() {
//     let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
//     let summary = bestCharge(inputs).trim();
//     let expected = `
// ============= 订餐明细 =============
// 黄焖鸡 x 1 = 18元
// 肉夹馍 x 2 = 12元
// 凉皮 x 1 = 8元
// -----------------------------------
// 使用优惠:
// 指定菜品半价(黄焖鸡，凉皮)，省13元
// -----------------------------------
// 总计：25元
// ===================================`.trim()
//     expect(summary).toEqual(expected)
//   });

// //   it('should generate best charge when best is 满30减6元', function() {
// //     let inputs = ["ITEM0013 x 4", "ITEM0022 x 1"];
// //     let summary = bestCharge(inputs).trim();
// //     let expected = `
// // ============= 订餐明细 =============
// // 肉夹馍 x 4 = 24元
// // 凉皮 x 1 = 8元
// // -----------------------------------
// // 使用优惠:
// // 满30减6元，省6元
// // -----------------------------------
// // 总计：26元
// // ===================================`.trim()
// //     expect(summary).toEqual(expected)
// //   });

// //   it('should generate best charge when no promotion can be used', function() {
// //     let inputs = ["ITEM0013 x 4"];
// //     let summary = bestCharge(inputs).trim();
// //     let expected = `
// // ============= 订餐明细 =============
// // 肉夹馍 x 4 = 24元
// // -----------------------------------
// // 总计：24元
// // ===================================`.trim()
// //     expect(summary).toEqual(expected)
// //   });

// });
