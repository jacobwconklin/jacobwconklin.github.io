// May have a total page header ( not fixed ) to supply tabs to other pages such as
// an imdb guessing the movie crossword or pokemon crossword, a leader board, etc. Could also
// have just typing speed game where the words are stright up given to you and you see how big of a crossword
// you can make in limited amount of time, maybe the old version of adding them would be good for this for 
// pure distance reachable. Since I have some ideas here: I should also have lives / hint buttons for the 
// crossword main game that can like reveal a letter or a whole word or fetch synonyms or something. 
import { NavLink } from "react-router-dom";

const PageHeader = () => {

    return (
        <div
            className="PageHeader" 
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '30px',
                background: 'silver',
                border: '3px solid gold',
                'borderTopStyle': 'none',
                'borderBottomStyle': 'none',
                display: 'flex',
                justifyContent: 'center'
            }}
        >
            <NavLink to="/" style={{
                color:'black',
                textDecoration: 'none',
                fontSize: 'large',
                border: 'none',
                paddingRight: '30px'
            }}>  CLASSIC </NavLink>
            <NavLink to="/speed" style={{
                color:'black',
                textDecoration: 'none',
                fontSize: 'large',
                border: 'none',
                paddingRight: '30px'
            }}>  SPEED TYPER </NavLink>
            <NavLink to="/pokemon" style={{
                color:'black',
                textDecoration: 'none',
                fontSize: 'large',
                border: 'none',
            }}>  POKEMON </NavLink>
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

export default PageHeader;