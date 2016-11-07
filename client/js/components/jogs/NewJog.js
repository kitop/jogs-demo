import React from "react";
import styles from "./new_jog.scss";

class NewJog extends React.Component {
  submitJog(e) {
    e.preventDefault();
    // TODO format values
    this.props.onSubmitJog({
      date: this.refs.date.value,
      distance: this.refs.distance.value,
      duration: this.refs.duration.value,
    })
  }

  render() {
    return(
      <div className={styles.root}>
        <h2>Track a jog</h2>
        <form onSubmit={this.submitJog.bind(this)}>
          <div className={ styles.fieldContainer }>
            <div className={ styles.field }>
              <label>Date</label>
              <input ref="date" type="date" />
            </div>
            <div className={ styles.field }>
              <label>Distance (in km)</label>
              <input ref="distance" type="number" min="0.1" step="0.01" />
            </div>
            <div className={ styles.field }>
              <label>Duration ([HH:]MM:SS)</label>
              <input ref="duration" type="text" placeholder="e.g. 30:00 (= 30 minutes)"/>
            </div>
          </div>
          <div className={ styles.submit }>
            <span className={styles.error}>{ this.props.error }</span>
            <button type="submit">Save Jog</button>
          </div>
        </form>
      </div>
    )
  }
}

export default NewJog;
