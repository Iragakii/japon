import React from 'react'

const ButtonNextSlide = ({ onClick, label = 'Next', disabled = false }) => {
  return (
    <button
      className={`next-slide-btn ${disabled ? 'disabled' : ''} group ` }
      onClick={onClick}
      aria-label={label}
      aria-disabled={disabled}
      disabled={disabled}
      
    >
      <div className='group-hover:scale-125 transiton duration-100 font-bold'>{label}</div>
    </button>
  )
}

export default ButtonNextSlide