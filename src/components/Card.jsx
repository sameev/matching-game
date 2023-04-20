const Card = ({ image, selected, onClick }) => {

  return (
    <div className="card">
      <div className={selected ? 'selected' : undefined}>
        <img
          alt=""
          className="card-back"
          src={'/assets/fireship.png'}
          onClick={onClick}
        />
      </div>
    </div>
  )
}

export default Card;