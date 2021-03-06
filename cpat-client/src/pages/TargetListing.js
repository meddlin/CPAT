import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dialog, Table, Button, Heading } from 'evergreen-ui';
import { useHistory, withRouter } from 'react-router-dom';
import { targetActions } from '../state-management/target/actions';
import * as signalR from '@microsoft/signalr';
import { TargetRemove } from '../components/target-types/target/TargetRemove';

const TargetListing = (props) => {
    const [isShown, setIsShown] = useState(false);
    const [dialogObject, setDialogObject] = useState({});
    const [signalRConnection, setSignalRConnection] = useState({});
    const [subdTargets, setSubdTargets] = useState([]);

    const { dispatch, loading, targets } = props;
    let history = useHistory();

    useEffect(() => {
        dispatch(targetActions.getTargetPage());

        let connection = new signalR.HubConnectionBuilder().withUrl("https://localhost:5001/targetHub").build();
        connection
            .start()
                .then(a => {
                    console.log('connected?');
                    if (a) console.log(`a: ${a}`)
                    // if (connection.connectionId) {
                    //     connection.invoke("sendConnectionId", connection.connectionId)
                    // }
                })
                .catch(err => {
                    if (err) console.log(`err: ${err}`)
                })

        connection.on("Receive-TargetById", function(newTargetDoc) {
            setSubdTargets(subdTargets => [...subdTargets, newTargetDoc])
        });

        setSignalRConnection(connection);
    }, []);

    return (
        <div>
            <Heading size={700}>TargetListing</Heading>

            <Button
                appearance="minimal"
                intent="success"
                onClick={() => {
                    signalRConnection
                        .invoke("SubscribeById", "test")
                        .catch(function(err) {
                            return console.error(`Mongo Subd Error: ${err.toString()}`)
                        })
                }}>
                Subscribe
            </Button>

            <ul>
                {subdTargets && subdTargets.length > 0 ? subdTargets.map(t => {
                    return (
                            <li key={t.id}>
                                <div>id: {t.id}</div>
                                <div>{t && t.name ? t.name : ''}</div>
                                <div>{t && t.region ? t.region : ''}</div>
                                <div>{t && t.dateCreated ? t.dateCreated : ''}</div>
                                <div>{t && t.updatedAt ? t.updatedAt : ''}</div>
                            </li>
                    )
                }) : 'No sub data yet.'}
            </ul>

            {(loading === true) ? <h3>Loading...</h3> : 
                <div>
                    <Table>
                        <Table.Head>
                            <Table.TextHeaderCell>Name</Table.TextHeaderCell>
                            <Table.TextHeaderCell>Region</Table.TextHeaderCell>
                            <Table.TextHeaderCell>Collection Type</Table.TextHeaderCell>
                            <Table.TextHeaderCell>Date Created</Table.TextHeaderCell>
                            <Table.TextHeaderCell>Last Modified By</Table.TextHeaderCell>
                            <Table.TextHeaderCell></Table.TextHeaderCell>
                            <Table.TextHeaderCell></Table.TextHeaderCell>
                        </Table.Head>
                        <Table.Body>
                            {(targets && targets.length > 0) ? targets.map(d => (
                                <Table.Row key={d.id}>
                                    <Table.Cell onClick={() => history.push(`/target/detail/${d.id}`)}>
                                        <Button appearance="minimal" intent="none">{d.name}</Button>
                                    </Table.Cell>

                                    <Table.TextCell>{d.region}</Table.TextCell>
                                    <Table.TextCell>{d.collectionType}</Table.TextCell>
                                    <Table.TextCell>{d.dateCreated}</Table.TextCell>
                                    <Table.TextCell>{d.lastModifiedBy}</Table.TextCell>
                                    <Table.Cell onClick={() => history.push(`/target/update/${d.id}`)}>
                                        <Button appearance="minimal" intent="none">Update</Button>
                                    </Table.Cell>
                                    <Table.Cell onClick={() => {
                                        setDialogObject(d);
                                        setIsShown(true);
                                    }}>
                                        <Button appearance="minimal" intent="danger">Remove</Button>
                                    </Table.Cell>
                                </Table.Row>
                            )) : []}
                        </Table.Body>
                    </Table>

                    <Button 
                        appearance="minimal" 
                        intent="success"
                        onClick={() => history.push("/target/create")}>
                        Create New
                    </Button>

                    <Dialog
                        isShown={isShown}
                        title="Danger intent"
                        intent="danger"
                        onCloseComplete={() => setIsShown(false)}
                        confirmLabel="Delete">

                        <TargetRemove data={dialogObject} />
                    </Dialog>
                </div>
            }
        </div>
    );
};

function mapStateToProps(state) {
    return {
        targets: (state.target && Array.isArray(state.target.targets)) ? state.target.targets : [],
        loading: state.target ? state.target.loading : false
    };
}

const connectedTargetListing = connect(mapStateToProps)(TargetListing);
export { connectedTargetListing as TargetListing };