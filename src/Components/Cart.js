import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate, useParams } from "react-router-dom";
import { cartChange, changeName } from "../store";

function Cart(){

    // Redux를 사용하는 방법1 전체 가져오기
    let state = useSelector((state)=> state) //hook - store를 꺼내오는 역할

    let dispatch = useDispatch(); //useDispatch - 변경 함수들을 담고 있는 hook
    
    let {id} = useParams();
    let navigate = useNavigate();

    let cartindex = 0;

    return(
        <>
            <h1>{state.user}'s Cart</h1>
            <p><Button onClick={()=>{dispatch(changeName())}}>이름 변경하기</Button></p>
            <Table striped bordered hover variant="white">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state.cart.map((cart,index)=>
                            <tr key={index}>
                                <td>{cartindex++}</td>
                                <td>{cart.title}</td>
                                <td>{cart.price}</td>
                                <td><Button  onClick={()=>{dispatch(cartChange([index,1]))}}>+</Button><Button onClick={()=>{dispatch(cartChange([index,-1]))}}>-</Button></td>
                            </tr>)
                    }
                    <tr><Button className="btn btn-dark" onClick={()=>navigate('/')}>목록보기</Button></tr>
                </tbody>
                </Table>
        </>
    )
}
export default Cart;