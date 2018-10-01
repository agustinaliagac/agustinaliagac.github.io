import React from 'react'
import { FaGithub, FaLinkedin, FaStackOverflow, FaAngellist, FaMedium } from 'react-icons/fa';
import { rhythm } from '../utils/typography'

const rightMargin = 0.3
const iconColor = '#ababab';
const iconSize = 30;

export default () => (
    <div style={{ float: 'right' }}>
        <a target="_blank"  style={{ boxShadow: 'none', marginRight: rhythm(rightMargin) }} href="https://github.com/agustinaliagac">
            <FaGithub color={iconColor} size={iconSize} />
        </a>
        <a target="_blank"  style={{ boxShadow: 'none', marginRight: rhythm(rightMargin) }} href="https://www.linkedin.com/in/agustinaliaga/">
            <FaLinkedin color={iconColor} size={iconSize} />
        </a>
        <a target="_blank"  style={{ boxShadow: 'none', marginRight: rhythm(rightMargin) }} href="https://stackoverflow.com/users/3148273/agustin-aliaga">
            <FaStackOverflow color={iconColor} size={iconSize} />
        </a>
        <a target="_blank"  style={{ boxShadow: 'none', marginRight: rhythm(rightMargin) }} href="https://angel.co/agustin-aliaga">
            <FaAngellist color={iconColor} size={iconSize} />
        </a>
        <a target="_blank"  style={{ boxShadow: 'none' }} href="https://medium.com/@agustin.aliaga">
            <FaMedium color={iconColor} size={iconSize} />
        </a>
    </div>
);
