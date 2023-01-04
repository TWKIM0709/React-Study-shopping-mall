import { configureStore, createSlice } from "@reduxjs/toolkit";

let user = createSlice(
    {
        name:'user',
        initialState:'kglim',
        reducers:{
            changeName(state){
                console.log(state);
                return 'doyeon'
            }
        }
    }
);

export let {changeName} = user.actions;

let cheeses = createSlice(
    {
        name:'cheese',
        initialState:'CCCCCCChhhhhhheeeeeeeeeeeeeessssssseeeeee'
    }
);

let cart = createSlice(
    {
        name : 'cart',
        initialState:[
            {
                "id":0,
                "title" : "Akkawi Cheese",
                "imgsrc" : "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Akawi_Cheese.jpg/203px-Akawi_Cheese.jpg",
                  "content" : "Akkawi Cheese Info",
                "price" : 90000
            },
            {
                "id":1,
                "title" : "Anari Cheese",
                "imgsrc" : "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Anari_Limassol.jpg/203px-Anari_Limassol.jpg",
                  "content" : "Anari Cheese Info",
                "price" : 120000
            },
            {
                "id":2,
                "title" : "Halloumi Cheese",
                "imgsrc" : "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Grilled_Halloumi.jpg/203px-Grilled_Halloumi.jpg",
                  "content" : "Halloumi Cheese Info",
                "price" : 70000
            }
        ],
        reducers :{
            cartChange(state,action){ 
                state[action.payload[0]].price += action.payload[1];
            },
            addCart(state,action){
                console.log(action.payload);
                let cheese = action.payload;
                cheese.id = state.length + 1;
                cheese.price = 1;
                state.push(cheese);
            }
        }
    }
);
export let {cartChange ,addCart} = cart.actions;

// 상태변수 등록하기
export default configureStore({
    reducer : {
        user : user.reducer,
        cheeses:cheeses.reducer,
        cart:cart.reducer
    }
});

// createSlice( {  
//     name :  변수 이름,
//     initialState : 초기값
//  } )

// export default configureStore({
//     reducer : {
// 	상태변수 등록하는 부분
//     }
// })
