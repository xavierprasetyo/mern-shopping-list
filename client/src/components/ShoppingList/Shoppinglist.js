import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import styles from "./styles/main.module.css";
import fade from "./styles/fade.module.css";
import { connect } from "react-redux";
import { getItems, deleteItems } from "../../actions/itemActions";
import PropTypes from "prop-types";

class Shoppinglist extends Component {
  static protoTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuth: PropTypes.bool,
  };

  componentDidMount() {
    this.props.getItems();
  }

  onDeleteClick = (id) => {
    this.props.deleteItems(id);
  };

  render() {
    const { items } = this.props.item;
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="shopping-list">
            {items.map(({ _id, name }) => (
              <CSSTransition key={_id} timeout={500} classNames={fade}>
                <ListGroupItem>
                  {this.props.isAuth ? (
                    <Button
                      className={styles.removeBtn}
                      color="danger"
                      size="sm"
                      onClick={this.onDeleteClick.bind(this, _id)}
                    >
                      &times;
                    </Button>
                  ) : null}
                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  item: state.item,
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { getItems, deleteItems })(
  Shoppinglist
);
