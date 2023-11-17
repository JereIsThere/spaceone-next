import React from 'react'
import PropTypes from 'prop-types'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/nextauth'

const Webshop = async () => {
    const session = await getServerSession(authOptions)
    const user = session?.user
    

    return (
        <div>This is the webshop-page!</div>
    )
}

Webshop.propTypes = {}

export default Webshop