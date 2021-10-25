import React from "react";
import { useQuery } from '@apollo/react-hooks';
import { Grid, Image } from 'semantic-ui-react'
import gql from 'graphql-tag';
import CharacterCard from '../components/CharacterCard'

function Home() {
    const { loading, data: { getCharacters: characters } } = useQuery(FETCH_CHARACTERS_QUERY);

    return (
        <Grid columns={3}>
            <Grid.Row>
                <h1>Recent Characters</h1>
            </Grid.Row>
        <Grid.Row>
            {loading ? (
                <h1>Loading posts..</h1>
            ) : (
                characters && characters.map(character => (
                    <Grid.Column key={character.id}>
                        <CharacterCard character={character} />
                    </Grid.Column>
                ))
            )}
        </Grid.Row>
        </Grid>
    )
}

const FETCH_CHARACTERS_QUERY = gql `
    {
        getCharacters{
            _id name createdAt username strength dexterity 
            constitution intelligence wisdom charisma level
            characterClass race
        }
    }
`

export default Home