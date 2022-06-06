import { useEffect } from 'react'

function Redirect() {
    useEffect(() => {
        var hash = window.location.hash
        console.log(hash)

        window.location = window.location.origin
    }, [])
}

export default Redirect