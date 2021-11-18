import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import { FormButton as CoreFormButton } from 'react-standalone-form'


/**
 * A button component to handle form actions, like submit or reset.
 */
const FormButton = ({
  onClick,
  component,
  reset,
  loading,
  loadingComponent,
  children,
  ...otherProps
}) =>
  <CoreFormButton
    component={component}
    onClick={e => onClick(e)}
    loading={loading}
    loadingComponent={loadingComponent}
    reset={reset}
    {...otherProps}
  >{children}</CoreFormButton>

FormButton.propTypes = {
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  reset: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

FormButton.defaultProps = {
  component: Button,
}

export default FormButton
