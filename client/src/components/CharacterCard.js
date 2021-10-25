import React from "react";
import { Card, Icon, Label, Image, Grid, Segment } from 'semantic-ui-react'

function CharacterCard({ character: { _id, name, createdAt,
    username, strength, dexterity,
    constitution, intelligence, wisdom,
    charisma, race, characterClass, level }}){
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
          Class : {characterClass} <br/>
          Race : {race} <br/>
          Level : {level}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Grid >
        <Grid.Row>
            <Grid.Column style={{ paddingRight: 150}}>
                <Label>Strength:</Label>
                <Label>{strength}</Label>
            </Grid.Column>
            <Grid.Column>
                <Label>Wisdom:</Label>
                <Label>{wisdom}</Label>
            </Grid.Column>
        </Grid.Row>

        <Grid.Row>
            <Grid.Column style={{ paddingRight: 150}}>
                <Label>Dexterity:</Label>
                <Label>{dexterity}</Label>
            </Grid.Column>
            <Grid.Column>
                <Label>Constitution:</Label>
                <Label>{constitution}</Label>
            </Grid.Column>
        </Grid.Row>

        <Grid.Row>
            <Grid.Column style={{ paddingRight: 150}}>
                <Label>Intelligence:</Label>
                <Label>{intelligence}</Label>
            </Grid.Column>
            <Grid.Column>
                <Label>Charisma:</Label>
                <Label>{charisma}</Label>
            </Grid.Column>
        </Grid.Row>
        </Grid>
      </Card.Content>
    </Card>
    )
} 

export default CharacterCard