import {useEffect, useState} from 'react'

export default function GameRound(props) {
    let gameRound = props.gameData;
    const [playerNumber, setPlayerNumber] = useState(props.currentPlayer);
    const [currentBid, setCurrentBid] = useState();
    const [winner, setWinner] = useState();
    const [bids, setBids] = useState([]);

    useEffect(() => { if(bids.length === props.numberOfPlayers) { determineWinner() }}, [bids]);

    function determineWinner(){
        let distance = gameRound.price;
        let winner = 0;
        let foundValidBid = false;
        bids.forEach( ( bid, index ) => { 
            if( bid < gameRound.price && (gameRound.price - bid < distance)){
                distance = gameRound.price - bid;
                foundValidBid = true;
                winner = index + 1;
            }
        });
        if(foundValidBid){
            setWinner( "player" + winner + " is the winner!");
        } else {
            setWinner( "no winner - everyone over bid!");
        }
    }

    function handleSubmit(event){
        event.preventDefault();
        let newBidList = [...bids, currentBid];
        setBids( newBidList );
        setPlayerNumber(bids.length + 2);
        document.querySelector('#bidInput').value = "";
    }

    function dispatchBid(event){
       setCurrentBid( event.target.value);
    }

    const centerStyle = {
        textAlign: 'center'
    }

    const bidItemContainer = {
        verticalAlign: 'top',
        display: 'inline-block',
        textAlign: 'center',
        float: 'left',
        width: '400px',
        height: '400px'
    }

    const imageContainer = {
        width: '400px'
    }

    const playerBidContainer = {
        paddingLeft: '450px',
        height: '400px',
    }
    const verticalCenter = {
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: '400px',
            height: '400px'
    }

    return(
        <div>
                <h1 style={centerStyle}><label>Who's Playing: player{playerNumber}</label></h1><br />
                <div style={bidItemContainer}>
                    <img style={imageContainer} src={gameRound.image }/><br />
                    <label>{gameRound.itemName}</label><br />
                </div>
                <div style={playerBidContainer}>
                    <div style={verticalCenter}>
                        <p>Your Bid: </p><br />
                        <label>$<input type='text' id='bidInput' onChange={dispatchBid}/>
                        <button onClick={handleSubmit}>Submit</button></label><br />
                    </div>
                </div>
            { winner && <label>{winner}</label>}
        </div>
    );
}