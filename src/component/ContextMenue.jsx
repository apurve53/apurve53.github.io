import "../UI/contextMemue.css";
const ContextMemue = ({
    positionx, positiony, isToggled, buttons, editButtonFunction
}) => {
    return (
        <menu
            style={{
                top: positiony + 2 + 'px',
                left: positionx + 2 + 'px'
            }}
            className={`context-menu ${isToggled ? 'active' : ''}`}
        >
            {buttons.map((button, index) => {
                function handleClick(e) {
                    e.stopPropagation();
                    editButtonFunction(e);
                }
                return <button onClick={handleClick} key={index} className="context-menu-button"><span>{button.text}</span><span className="icon">{button.icon}</span></button>
            })}
        </menu>
    )
}
export default ContextMemue;