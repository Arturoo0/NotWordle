import React from 'react';
import { Table } from 'react-bootstrap';

const HistoryFeed = (props) => {
    const renderHistory = () => {
        if (!props.gameHistory) return null;
        const history = props.gameHistory.map((game) => {
            return (
                <tr>
                    <td>-</td>
                    <td>
                        {(game.isWinner) ? 'Won' : 'Loss'}
                    </td>
                    <td>-</td>
                </tr>   
            );            
        });
        return (
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Word</th>
                        <th>Win/Loss</th>
                        <th>Win Percentage</th>
                    </tr>
                </thead>
                <tbody>
                    {history}
                </tbody>
            </Table>
        );
    };

    return renderHistory();
};

export default HistoryFeed;