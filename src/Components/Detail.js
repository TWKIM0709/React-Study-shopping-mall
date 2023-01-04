import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from 'react-redux';
import { addCart } from "../store";

let Box = styled.div`
    padding : 20px;
    color : gray;
`; //Box styled end
let BtnStyle = styled.button`
    margin-left : 5px;
    margin-right : 5px;
`;// BtnStyle styled end
let BtnChild = styled(BtnStyle)`
    background : ${props => props.bg};
    color : ${props => props.bg == 'white' ? 'black' : props.color};
`;//BtnChild styled end

function Detail({cheese}){

    let dispatch = useDispatch();
    let {id} = useParams();
    let navigate = useNavigate();
    let findCheese = cheese.find((item)=> item.id == id);
    let [count,setCount] = useState(0);

    useEffect((event)=>{
        // useEffect에 기재한 코드는 컴포넌트의 생성/업데이트/소멸에 관련된 것들을 실행한다??
        // 소멸은 useEffect(function , [파라미터]) 파라미터를 추가해야 처리 가능하다
        console.log('react');
    },[count])

    //useEffect(()=>{}) 재랜더링 될 때마다 코드 실행
    //useEffect(()=>{},[])  mount 될 때 한번만 실행
    //useEffect(()=>{},[상태변수]) 상태변수가 작동될 때만 실행
    //useEffect(()=>{},return)  소멸될 때 실행됨

    return(
            <Container id="cheeseMain">
                <Row>
                    <Col>
                        {/* <Box>{findCheese.title}</Box> */}
                        {/* <Button onClick={()=>setCount(count+1)}>{count}</Button>
                        <h1>{findCheese.title}</h1> */}
                    </Col>
                </Row>
                <Row>
                    <Col className='cheeseImage'>
                        <Row>
                            <Col lg={6}>
                                <p><img src={findCheese.imgsrc} alt={findCheese.title} /></p>
                            </Col>
                            <Col lg={6}>
                                {/* <h4>{findCheese.title}</h4> */}
                                <p>{findCheese.content}</p>
                                <p>{findCheese.price}</p>
                                <BtnStyle className="btn btn-primary" onClick={()=>navigate('/cart/'+findCheese.id)}>주문하기</BtnStyle>
                                <BtnStyle className="btn btn-primary" onClick={()=>{
                                    dispatch(addCart(findCheese));
                                    navigate('/cart')
                                    }}>장바구니추가</BtnStyle>
                                <BtnChild bg="orange" className="btn btn-danger" onClick={()=>navigate(-1)}>뒤로가기</BtnChild>
                                <BtnStyle className="btn btn-dark" onClick={()=>navigate('/')}>목록보기</BtnStyle>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <TabComponent/>
                </Row>
            </Container>
    )
}
export default Detail;

function TabComponent(){
    return (
        <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            className="mb-3"
            >
            <Tab eventKey="home" title="Home">
            </Tab>
            <Tab eventKey="profile" title="Profile">
            </Tab>
            <Tab eventKey="contact" title="Contact" disabled>
            </Tab>
        </Tabs>
    )
}