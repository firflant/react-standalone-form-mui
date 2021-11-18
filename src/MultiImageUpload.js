import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import withStyles from '@material-ui/core/styles/withStyles'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import DeleteIcon from '@material-ui/icons/Delete'
import classNames from 'classnames'
import withFormControl from './FormControl'


const MultiImageUpload = ({
  name,
  value,
  required,
  setValue,
  spacing,
  columns,
  uploadLabel,
}) => {
  const classes = useStyles()
  return (
    <Grid container spacing={spacing}>
      {value &&
        value.map((item, index) =>
          <Grid item sm={12 / columns} key={index}>
            <Grid
              container
              alignItems='center'
              justify='center'
              className={classes.wrapper}
            >
              <img
                src={item.data || item}
                className={classes.image}
                alt={`Uploaded file ${index}`}
              />
              <IconButton
                className={classes.delete}
                onClick={() => setValue(
                  name,
                  value.filter((subItem, subIndex) => subIndex !== index),
                  required
                )}
              >
                <DeleteIcon fontSize='small' />
              </IconButton>
            </Grid>
          </Grid>
        )
      }
      <Grid item sm={12 / columns}>
        <input
          accept='image/*'
          className={classes.input}
          id={name}
          multiple
          type='file'
          onChange={e => {
            let oldValue = value || []
            Object.values(e.target.files).forEach(async value => {
              const fileReader = new FileReader()
              const { name: fileName, type: fileType } = value
              const dataFile = value
              await fileReader.readAsDataURL(value)
              fileReader.onload = () => {
                const data = fileReader.result
                setValue(
                  name,
                  [...oldValue, {
                    fileName,
                    type: fileType.split('/')[0],
                    data,
                    dataFile,
                  }],
                  required
                )
                oldValue = [...oldValue, {
                  fileName,
                  type: fileType.split('/')[0],
                  data,
                  dataFile,
                }]
              }
            })
          }}
        />
        <label htmlFor={name} className={classNames(classes.wrapper, classes.label)}>
          <CloudUploadIcon />
          <Typography variant='caption' color='inherit'>{uploadLabel}</Typography>
        </label>
      </Grid>
    </Grid>
  )
}

MultiImageUpload.defaultProps = {
  spacing: 2,
  columns: 2,
  smHeight: '20vw',
  mdHeight: '12vw',
  uploadLabel: 'Upload',
}

export default withStyles(theme => ({
  wrapper: {
    backgroundColor: theme.palette.grey[100],
    padding: theme.spacing(2),
    height: '33vw',
    position: 'relative',
    [theme.breakpoints.up('sm')]: {
      height: props => props.smHeight,
    },
    [theme.breakpoints.up('md')]: {
      height: props => props.mdHeight,
      maxHeight: theme.spacing(30),
    },
  },
  image: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
  input: {
    display: 'none',
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.grey[500],
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  delete: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
}))(withFormControl(MultiImageUpload))
