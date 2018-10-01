import React from 'react'
import { Link } from 'gatsby'
import _ from 'lodash'
import { IconContext } from "react-icons";

import Nav from '../components/Nav'
import { rhythm, scale } from '../utils/typography'
import routes from '../utils/routes'
import Social from './Social';

class Template extends React.Component {
  render() {
    const { location, children } = this.props
    let header

    const route = _.find(_.values(routes), item => item.path === location.pathname);

    if (route) {
      header = (
        <h1
          style={{
            ...scale(1.5),
            marginBottom: rhythm(1.5),
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: 'inherit',
            }}
            to={'/'}
          >
            { route.title }
          </Link>
        </h1>
      )
    } else {
      header = (
        <h3
          style={{
            fontFamily: 'Montserrat, sans-serif',
            marginTop: 0,
            marginBottom: rhythm(-1),
          }}
        >
          <Link
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: 'inherit',
            }}
            to={'/'}
          >
            Agustín Aliaga
          </Link>
        </h3>
      )
    }
    return (
      <IconContext.Provider value={{ color: 'inherit' }}>
        <Nav>
          <Social />
        </Nav>
        <div
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            maxWidth: rhythm(24),
            padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
          }}
        >
          {header}
          {children}
        </div>
      </IconContext.Provider>
    )
  }
}

export default Template
