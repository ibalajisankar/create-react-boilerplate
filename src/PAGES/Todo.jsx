import { connect } from 'react-redux'
import React, {Component} from 'react';
import { setVisibilityFilter, addTodo } from '../store/actions';
import TodoItem from './TodoItem'
import { List, Button } from 'antd';

class Todo extends Component {
  state = {
    text:'Time to add new todo'
  }

    render() {
        return (
          <div className="todo App">
            
              <List
              bordered
              dataSource={this.props.todos}
              renderItem={item => (<List.Item>
                <TodoItem item={item}/>
              </List.Item>)}
              />
            <Button onClick={() => this.props.addTodo(this.state.text)}>
              Add to do
            </Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
  return {
    todos:state.todos
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter))
    },
    addTodo: (x) => {
      dispatch(addTodo(x))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Todo);
