import React, { useEffect } from 'react'
import { Card, DisplayClientBody } from '../../../components'
import { PageTabs, PageTitle } from '../../../components/commons'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../../../libs'

const DisplayClient = () => {
    const { id } = useParams()
    const dispatch = useDispatch();
    const { host, user } = useSelector(state => state?.user)


    useEffect(() => {
        dispatch(getUser({ id, hostID: host?._id }))
    }, [dispatch, id, host])

    return (
        <div className='display-client'>
            <Card>
                <PageTitle title={"Details du client"} hideBtns={true} linked={false} hideExporte={true} link={""} />
                <PageTabs />

                <DisplayClientBody id={id} user={user} />
            </Card>
        </div>
    )
}

export default DisplayClient