import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, getOrderDetails } from "../redux/slices/orderSlice";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import { fetchUserDetails } from "../redux/slices/userSlice";


const BACKEND_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';


function PlaceOrderScreen({ history }) {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order);
  const { orderDetails, loading, error } = order;
  const cart = useSelector((state) => state.cart);
  
  const itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = Number((0.082 * itemsPrice).toFixed(2));
  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);

  if (!cart.paymentMethod) {
    history.push("/payment");
  }

 
   
  const data = {
    orderItems: cart.cartItems,
    shippingAddress: cart.shippingAddress,
    paymentMethod: cart.paymentMethod,
    itemsPrice: itemsPrice.toFixed(2).toString(),
    shippingPrice: shippingPrice.toFixed(2).toString(),
    taxPrice: taxPrice.toFixed(2).toString(),
    totalPrice: totalPrice.toString(),
  };
  
  
 
  const placeOrder = () => {
    dispatch(createOrder(data))
      .then(() => {
        setTimeout(() => {
          console.log(orderDetails)
          history.push(`/orderDetail`);
        }, 1000); 
      })
      .catch((error) => {
        
      });
  };
  
  
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Envio</h2>
              <p>
                <strong>Endereco de envio: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Pagamentos</h2>
              <p>
                <strong>Metodo de pagamentos: </strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Produtos Pedidos</h2>
              {cart.cartItems.length === 0 ? (
                <Message variant="info">Seu carrinho está vazio</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={`${BACKEND_URL}${item.image}`} alt={item.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} X R$ {item.price} = R$
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Soma dos pedidos</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Produtos:</Col>
                  <Col>R${itemsPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Frete:</Col>
                  <Col>R${shippingPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Impostos:</Col>
                  <Col>R${taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>R${totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="w-100"
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrder}
                >
                  Faça a encomenda
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default PlaceOrderScreen;