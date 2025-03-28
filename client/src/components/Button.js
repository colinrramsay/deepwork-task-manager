const Button = ({color='steelblue', text, onClick}) => {
    
    return (
        <button className='btn' onClick={onClick} style={{backgroundColor: color}}>{text}</button>
    )
}

export default Button