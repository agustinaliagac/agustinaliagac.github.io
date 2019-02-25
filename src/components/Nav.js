import React from 'react'
import _ from 'lodash'
import { Link } from 'gatsby'

import { rhythm } from '../utils/typography'
import routes from '../utils/routes'

const showProjects = process.env.NODE_ENV === 'development';


export default ({ children }) => {
    const finalRoutes = showProjects ? routes : _.pick(routes, [
        'root',
        'aboutMe',
    ]);

    return (
        <div style={{ margin: rhythm(1 / 2) }}>
            { _.map(finalRoutes, r => (
                <h3
                    key={r.path}
                    style={{
                        marginLeft: rhythm(1 / 2),
                        display: 'inline',
                    }}
                    ><Link style={{ boxShadow: 'none' }} to={r.path}> { r.title } </Link>
                </h3>
            )) }
            { children }
        </div>
    );
}
