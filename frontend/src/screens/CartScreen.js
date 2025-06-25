import React from "react";
import { Link, useHistory } from "react-router-dom";  // trocar useNavigate por useHistory
import { Row, Col, Image, ListGroup, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { removeFromCart } from "../redux/slices/cartSlice";

const BACKEND_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

function CartScreen() {
  const dispatch = useDispatch();
  const history = useHistory();  // aqui

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");  // usar history.push no lugar de navigate
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Carrinho de compras</h1>
        {cartItems.length === 0 ? (
          <Message variant="info">
            Seu carrinho está vazio. <Link to="/">Voltar</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={`${BACKEND_URL}${item.image}`}
                      alt={item.name}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>Qtd: {item.qty}</Col>
                  <Col md={2}>R$ {item.price}</Col>
                  <Col md={1}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}{" "}
                itens)
              </h2>
              <strong>
                R${" "}
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </strong>
            </ListGroup.Item>

            <ListGroup.Item>
              <Button
                type="button"
                className="w-100"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Fazer o check-out
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}

export default CartScreen;
