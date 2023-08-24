import { useState } from 'react'

const Popup = ({ open, closePopup, picketDay, reserveDay }) => {
    if (!open)
        return null

    const getStringDate = date => {
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        return `${year}-${month < 10 ? 0 : ""}${month}-${day < 10 ? 0 : ''}${day}`
    }

    const handleSubmit = e => {
        e.preventDefault()
        const form = e.target

        if (!formValidate(form)) {
            return false
        }
        reserveDay(
            picketDay,
            e.target.elements["name"].value,
            e.target.elements["phone"].value
        )
        form.reset()
        closePopup()
    }
    
    const handleClick = e => {
        if (e.target.classList.contains("popup__container")) {
            closePopup()
        }
    }

    const formValidate = (form) => {
        let errors = 0;

        if (form.elements["name"].value.trim() === "")
            errors++
        if (form.elements["phone"].value.trim() === "" || form.elements["phone"].value.length < 15)
            errors++

        if (errors) {
            console.log('Fill required fields')
            return false
        } 
        return true
    }

    const handleKeyPress = (e) => {
        const length = e.target.value.length;
        if (e.charCode < 48 || e.charCode > 57 || length > 14) {
            e.preventDefault();
            return;
        }
        switch (length) {
            case 0: 
                e.target.value = "8 " ;
                break;
            case 5:
            case 9:
            case 12:
                e.target.value += " ";
                break;
            default:
                break;
        }
    }

    const handleInput = e => {e.target.value.length === 2 && (e.target.value = "")}

    return (
        <div className="popup">
            <div className="popup__container" onClick={handleClick}>
                <div className="popup__body">
                    <form action="#" method="POST" className="popup__form form" onSubmit={handleSubmit}>
                        <input name="name" type="name" className="form__input" placeholder="Input your name" />
                        <input onKeyPress={handleKeyPress} onInput={handleInput} name="phone" type="tel" className="form__input" placeholder="Input your phone" />
                        <input name="date" type="date" className='form__input' value={getStringDate(new Date(picketDay))} disabled />
                        <button type="submit" className="form__submit">Записаться</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Popup