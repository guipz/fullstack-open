import PropTypes from 'prop-types'

const propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
}

const Notification = ({ text, type }) => {
  Notification.propTypes = propTypes
  return <div className={type}>{text}</div>
}

export default Notification