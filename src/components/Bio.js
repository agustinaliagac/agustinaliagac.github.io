import React from 'react'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import profilePic from './profile-pic.jpeg'
import { rhythm } from '../utils/typography'

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: rhythm(0),
        }}
      >
        <img
          src={profilePic}
          alt={`Agustín Aliaga`}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
            borderRadius: '50%'
          }}
        />
        <p>
          <strong>Agustín Aliaga</strong>
          <br/>
          Software Developer
        </p>
      </div>
    )
  }
}

export default Bio
