import { destroyItemAsync} from './itemSlice'

function ButtonGroup(props:any) {

  function handleClick(e:any) {
    const payload = {
      item: {
        item_id: props.item_id
      }
    }
    props.dispatch(destroyItemAsync(payload));
  }
  return <div className="btn-group float-end">
      <button 
        className="btn btn-warning"
        onClick={() => props.toggleEditForm()}>Edit</button>
      <button 
      className="btn btn-danger" 
      onClick={(e) => handleClick(e)}>Delete</button>
  </div>;
}

export default ButtonGroup;