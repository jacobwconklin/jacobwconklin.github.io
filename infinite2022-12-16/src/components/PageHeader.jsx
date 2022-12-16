// May have a total page header ( not fixed ) to supply tabs to other pages such as
// an imdb guessing the movie crossword or pokemon crossword, a leader board, etc. Could also
// have just typing speed game where the words are stright up given to you and you see how big of a crossword
// you can make in limited amount of time, maybe the old version of adding them would be good for this for 
// pure distance reachable. Since I have some ideas here: I should also have lives / hint buttons for the 
// crossword main game that can like reveal a letter or a whole word or fetch synonyms or something. 
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { clearWords } from '../actions/ClearWords';

// Along with links routing user, they may need to reset the redux store if one store is used across apps
const PageHeader = (props) => {

    const resetReduxStores = () => {
        // send off actions like clearWords through connection to redux
        props.dispatch(clearWords());
    }

    return (
        // Might be good if this is like a drop down accordian, so you don't see it constantly and accidentally
        // click it. 
        <div
            className="PageHeader" 
            style={{
                textAlign: 'center',
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '30px',
                background: 'silver',
                border: '3px solid gold',
                'borderLeftStyle': 'none',
                'borderBottomStyle': 'none',
                display: 'flex',
                justifyContent: 'center'
            }}
        >
            <NavLink to="/" onClick={resetReduxStores} style={{
                width:'140px',
                color:'black',
                textDecoration: 'none',
                fontSize: 'large',
                border: 'none',
                paddingRight: '15px',
                paddingLeft: '15px'
            }}>  CLASSIC </NavLink>
            <NavLink to="/speed" onClick={resetReduxStores} style={{
                width:'140px',
                color:'black',
                textDecoration: 'none',
                fontSize: 'large',
                border: 'none',
                paddingRight: '15px',
                paddingLeft: '15px'
            }}>  SPEED TYPER </NavLink>
            <NavLink to="/pokemon" onClick={resetReduxStores} style={{
                width:'140px',
                color:'black',
                textDecoration: 'none',
                fontSize: 'large',
                border: 'none',
                paddingRight: '15px',
                paddingLeft: '15px'
            }}>  POKEMON </NavLink>
            <NavLink to="/quickplay" onClick={resetReduxStores} style={{
                width:'140px',
                color:'black',
                textDecoration: 'none',
                fontSize: 'large',
                border: 'none',
                paddingRight: '15px',
                paddingLeft: '15px'
            }}>  QUICK PLAY </NavLink>
        </div>
    )
}

/*

const Header = () => (
    <div>
      <h1> Expensify </h1>
      <NavLink to="/" activeClassName="is-active" exact={true}>Dashboard</NavLink>
      <NavLink to="/create" activeClassName="is-active">Create Expense</NavLink>
      <NavLink to="/help" activeClassName="is-active">Help</NavLink>
      <br></br>
    </div>
  );

*/

export default connect()(PageHeader);