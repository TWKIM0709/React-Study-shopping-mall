import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Col, Row } from 'react-bootstrap';
import React, { lazy, Suspense, useState } from 'react';
import { Link, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';

import Event from './Components/Event';
import './App.css';
import './css/main.css';
import data from './data';
import { useEffect } from 'react';

//Context API 실습
let context = React.createContext();

//import Detail from './Components/Detail';
const Detail = lazy(()=>import('./Components/Detail'));
// import Cart from './Components/Cart';
const Cart = lazy(()=>import('./Components/Cart'));

function App() {


  useEffect(()=>{
    // LocalStorage
    let obj = {name:'안녕'}
    localStorage.setItem('data',JSON.stringify(obj))
    let outObj = localStorage.getItem('data')
    console.log(outObj);
    outObj = JSON.parse(outObj);
    console.log(obj);
  },[])

  //

  let [cheese,setCheese]= useState(data);

  //Context API 실습용 데이터
  let [stock] = useState([7,13,20]);

  let res =   useQuery('values',()=>{
    axios.get('https://raw.githubusercontent.com/TWKIM0709/DataBaseGit/main/data.json')
    .then((res)=>{
      console.log('res')
      console.log(res)
      console.log('res.data')
      console.log(res.data);
      return res.data;
    })
});

  return (
    <div className="App">
        {/* NavBar */}
        <NavArea/>
        {/* 점보트론 */}
        <MainTitle/>
        {/* Content */}
        {/* <CardContent cheese={cheese}/> */}
        {/* 라우터를 이용한 페이지 스왑? */}
        
        <Suspense fallback={<div>로딩중입니다.</div>}>
          <Routes>
              <Route path='/' element={<CardContent cheese={cheese} setCheese={setCheese}/>}/>
              <Route path='/detail/:id' element={
                  <Detail cheese={cheese}/>
              }/>
              <Route path='/cart' element={<Cart/>}/>
              <Route path='/about' element={<About/>}>
                  <Route path='emp' element={<div>너는 우리 직원이야</div>}/>
                  <Route path='location' element={<div>혜화역 4번 출구</div>}/>
              </Route>
              <Route path='/event' element={<Event/>}>
                  <Route path='one' element={<div>첫 주문은 1+1입니다.</div>}/>
                  <Route path='two' element={<div>포인트 1,0000점을 드립니다.</div>}/>
              </Route>
              {/* 에러페이지 만들기 */}
              <Route path='*' element={<h1>없는 페이지 입니다.</h1>}/>
          </Routes>
        </Suspense>
    </div>
  );
} //end App

export default App;

function CardContent({cheese,setCheese}){
    let navigator = useNavigate();
  return <Container id="cheeseMain">
    <Row>
        {
            cheese.map((data,index)=>
                <Col lg={4} md={4} sm={6} xs={6} className='cheeseImage' key={index}>
                    <img src={data.imgsrc} alt={data.title} onClick={()=>{navigator(`/detail/${data.id}`);}}/>
                    <h4>{data.title}</h4>
                    <p>{data.content}</p>
                    <p>{data.price}</p>
                    <p><button className='btn btn-primary'>주문하기</button></p>
                </Col>
                )
        }
    </Row>
    <Row><Col>
            <button className='btn btn-primary' onClick={()=>{
                axios.get('https://raw.githubusercontent.com/TWKIM0709/DataBaseGit/main/data.json')
                .then((result)=>{ 
                    console.log(result.data);   
                    // console.log([...result.data]);
                    console.log([...cheese])
                    let newCheese = [...cheese, ...result.data]
                    console.log([...newCheese]);
                    setCheese(newCheese);
                })
                .catch(()=>{console.log('data fail')})
            }}>더보기</button> 
            {/* <button onClick={()=>{
                axios.post('URL',{name:'yuna'})
                .then()
                .catch()
            }}>요청시 데이터 보내기</button> */}
            {/* <button onClick={()=>{
                Promise.all([axios.get('url1'),axios.get('url2')]).then(1).then(2).catch();
            }}>여러 주소에 동시에 요청하기</button> */}
            {/* <button onClick={()=>{
                fetch('url').then(res=>console.log(res.data));
            }}>fetch()로 요청하기</button> */}
            </Col></Row>
  </Container>
} //end CardContent

function NavArea(){
  return <Navbar bg="light" expand="lg">
  <Container>
    <Navbar.Brand href="/">KOSAShop</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/cart">Cart</Nav.Link>
        <Link to='/event'>Link-Event</Link>
        <NavDropdown title="About" id="basic-nav-dropdown">
          <NavDropdown.Item href="/about/emp">Emp</NavDropdown.Item>
          <NavDropdown.Item href="/about/location">Location</NavDropdown.Item>
          {/* <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">
            Separated link
          </NavDropdown.Item> */}
        </NavDropdown>
        <NavDropdown title="Event" id="basic-nav-dropdown">
          <NavDropdown.Item href="/event/one">One</NavDropdown.Item>
          <NavDropdown.Item href="/event/two">Two</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
        <Nav className='ms-auto'>
          
          반갑습니다
        </Nav>
  </Container>
</Navbar>
}// end NavArea
function MainTitle(){
  return <div className="jumbotron">
                <img src='https://han.gl/nrZOd' alt='Cheese' className='titleImage'/>
                  <h1 className="display-4">Cheese</h1>
                  <p className="lead">The nutritional value of cheese varies widely. Cottage cheese may consist of 4% fat and 11% protein while some whey cheeses are 15% fat and 11% protein, and triple-crème cheeses are 36% fat and 7% protein.</p>
                  <hr className="my-4"/>
                  <p>A cheeseboard (or cheese course) may be served at the end of a meal before or following dessert, or replacing the last course. </p>
                  <a className="btn btn-primary btn-lg" href="#cheeseMain" role="button">More Cheese</a>
                </div>
} //end MainTitle

function About(){
    return(
        <>
            <h1>About Page</h1>
            <Outlet></Outlet>
        </>
    )
} //end About