import React from 'react'
import { Card, ProfileDisplay } from '../../../components'
import { PageTitle } from '../../../components/commons'

const ProfileUtilisateur = () => {
    return (

        <Card>
            <PageTitle title={"Details de l'administrateur"} hideExporte={true} linked={true} link={"/administrateurs"} buttonText={"Voir la liste"} />

            <ProfileDisplay />
        </Card>

    )
}

export default ProfileUtilisateur