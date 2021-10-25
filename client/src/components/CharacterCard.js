import React from "react";
import { Card, Icon, Label, Image, Grid, Segment } from 'semantic-ui-react'

function CharacterCard({ character: { _id, name, createdAt,
    username, strength, dexterity,
    constitution, intelligence, wisdom,
    charisma }}){
    return(
    <Card>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/molly.png'
        />
        <Card.Header>{name}</Card.Header>
        <Card.Meta>{username}</Card.Meta>
        <Card.Description>
          Molly wants to add you to the group <strong>musicians</strong>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Grid columns='equal'>
        <Grid.Row>
            <Grid.Column>
                <Label>Strength:</Label>
                <Label>{strength}</Label>
            </Grid.Column>
            <Grid.Column>
                <Label>2</Label>
            </Grid.Column>
            </Grid.Row>
        </Grid>
      </Card.Content>
    </Card>
    )
} 

export default CharacterCard