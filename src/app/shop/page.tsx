import React from 'react'
import PropTypes from 'prop-types'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/nextauth'
import { SITE, UnauthorizedPage, checkAuthForView } from '../auth/checkAuthForAction'

const Webshop = async () => {
    const session = await getServerSession(authOptions)
    const canView = checkAuthForView(session?.user, SITE.SHOP)
    
    if(!canView)
        return <UnauthorizedPage user={session?.user}/>

    return (
        <div>This is the webshop-page!</div>
    )
}

Webshop.propTypes = {}

export default Webshop