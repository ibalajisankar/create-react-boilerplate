import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Checkbox } from 'antd';
import { toggleTodo } from '../store/actions'


const Presentation= ({ item }) => {
  return (
    <div className="item-wrap">
    <div className="description">
      {item.text}
    </div>
    <div className="status">
      {item.completed.toString()}
      </div>
      </div>
  )
}
  
class TodoItem extends Component {
  render() {
    const { item } = this.props;
      return (
        <div className="todo-item"> 
         <Checkbox className="cb" checked={item.completed} onChange={this.props.onToggle}>
              {item.completed ? 'Done' : 'Not Done' }
            </Checkbox>
          <Presentation item={item}/>
          <div className="action">
 
          </div>
            </div>
        );
    }
}



const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onToggle: () => dispatch(toggleTodo(ownProps.item.id))
  }
}
export default connect(
  '',
// mapStateToProps,
mapDispatchToProps)(TodoItem);