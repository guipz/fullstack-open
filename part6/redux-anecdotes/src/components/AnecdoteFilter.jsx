import { useDispatch, useSelector } from "react-redux";
import { change } from "../reducers/anecdoteFilterReducer";

const AnecdoteFilter = () => {
  const filter = useSelector((state) => state.anecdoteFilter)
  const dispatch = useDispatch()
  
  const changeFilter = (e) => {
    dispatch(change(e.target.value))
  }

  return <input placeholder='Search anecdote' onChange={changeFilter} value={filter} />
}


export default AnecdoteFilter