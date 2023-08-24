const Hinter = ({ pathient }) => {
    return (
        <div className="calendar__hinter">
            <p><span>Name: </span>{pathient.name}</p>
            <p><span>Phone: </span>{pathient.phone}</p>
        </div>
    )
}

export default Hinter