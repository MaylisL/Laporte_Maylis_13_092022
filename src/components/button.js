import   './button.css'

function Button({title, className, onClick}) {
  const handleClick = (e) => {
    e.preventDefault()
    // call onClick from parent component
    onClick()
  }
    return <button className={className} onClick={handleClick}>{title}</button>
  }


export  default  Button;