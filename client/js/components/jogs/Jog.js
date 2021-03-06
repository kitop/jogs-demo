import React from "react";
import isEmpty from "lodash/isEmpty";
import * as formatters from "../../utils/formatters";
import validateJog from "../../utils/validate_jog";
import styles from "./jog_item.scss";

class Jog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      errors: {}
    }
    this.toggleEdit = this.toggleEdit.bind(this);
    this.onSave = this.onSave.bind(this);
    this.removeJog = this.removeJog.bind(this);
  }

  toggleEdit() {
    this.setState({ editing: !this.state.editing })
  }

  removeJog() {
    this.props.onDeleteJog(this.props.jog.id)
  }

  onSave(e) {
    e.preventDefault();

    let params = {
      date: this.refs.date.value,
      distance: this.editedDistance(),
      duration: this.editedDuration(),
    }

    let errors = validateJog(params)
    if(isEmpty(errors)) {
      this.props.onEditJog(this.props.jog.id, params)
      this.setState({ errors: {}, editing: false })
    } else {
      this.setState({ errors: errors })
    }
  }

  editedDistance() {
    let parsed = parseFloat(this.refs.distance.value) || 0
    return parsed * 1000;
  }

  editedDuration() {
    let durationString = this.refs.duration.value;

    if(durationString.match(/:/)) {
      let [seconds, minutes, hours] = durationString.split(":").reverse();
      [seconds, minutes, hours] = [seconds, minutes, hours].map(n => parseInt(n, 10) || 0);
      return seconds + minutes * 60 + hours * 60 * 60;
    } else {
      return parseInt(durationString, 10) || 0;
    }
  }

  validate(params) {
    let errors = {}
    if(isEmpty(params.date)) {
      errors["date"] = "Please enter a valid date"
    } else if(!( params.date.match(/\d{4}-\d{2}-\d{2}/) || params.date.match(/\d{2}\/\d{2}\/\d{4}/) )) {
      errors["date"] = "Please enter a valid date (YYYY-MM-DD or DD/MM/YYYY)"
    }
    if(params.distance <= 0) {
      errors["distance"] = "Please enter a valid distance (bigger than 0)"
    }

    return errors;
  }


  errorsFor(attribute) {
    return (
      <div className={ styles.error }>
        { this.state.errors && this.state.errors[attribute] }
      </div>
    )
  }

  renderViewMode() {
    let jog = this.props.jog;
    return (
      <div className={ styles.root }>
        <div className={ styles.main }>
          <div className={ styles.date }>
            { formatters.formatDate(jog.date) }
          </div>
          <div className={ styles.distance }>
            { formatters.formatDistance(jog.distance) }
          </div>
          <div className={ styles.duration }>
            <span className="fa fa-clock-o"></span> { formatters.formatDuration(jog.duration) }
          </div>
          <div className={ styles.average_speed }>
            { formatters.formatSpeed(jog.average_speed) }
          </div>
        </div>
        <div className={ styles.actions }>
          <a onClick={this.toggleEdit} className={styles.action}>Edit</a>
          <a onClick={this.removeJog} className={styles.action}>Delete</a>
        </div>
      </div>
    )
  }

  renderEditMode() {
    let jog = this.props.jog;
    return (
      <div className={styles.root}>
        <form onSubmit={ this.onSave }>
          <div className={styles.main}>
            <div className={ styles.edit_field }>
              <label>Date</label>
              <input ref="date" type="date" defaultValue={jog.date}/>
              { this.errorsFor("date") }
            </div>
            <div className={ styles.edit_field }>
              <label>Distance (in km)</label>
              <input ref="distance" type="number" min="0.1" step="0.01" defaultValue={formatters.formatDistance(jog.distance, false) }/>
              { this.errorsFor("distance") }
            </div>
            <div className={ styles.edit_field }>
              <label>Duration ([HH:]MM:SS)</label>
              <input ref="duration" type="text" placeholder="e.g. 30:00 (= 30 minutes)" defaultValue={formatters.formatDuration(jog.duration)} />
              { this.errorsFor("duration") }
            </div>
          </div>
          <div className={styles.actions}>
            <button type="submit" className={styles.action}>Save</button>
            <a onClick={this.toggleEdit} className={styles.action}>Cancel</a>
          </div>
        </form>
      </div>
    )
  }

  render() {
    return this.state.editing ? this.renderEditMode() : this.renderViewMode()
  }
}

export default Jog;
