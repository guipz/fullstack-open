import PropTypes from 'prop-types'

const propTypes = {
  user: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired
}

const UserInfo = ({ user, onLogout }) => {
  UserInfo.propTypes = propTypes
  return <p>{user.username} logged in<button onClick={onLogout}>Logout</button></p>
}

export default UserInfo