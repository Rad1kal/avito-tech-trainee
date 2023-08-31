export function ErrorBlock () {
    return(
    <div>
        <img style={{display: 'block',margin: '20vh auto'}} src={process.env.PUBLIC_URL + '/img/error.gif'} alt="Error" />
    </div>
    )
}

export function LoadingBlock () {
    return(
    <div>
       <img style={{display: 'block',margin: '50vh auto'}} src={process.env.PUBLIC_URL + '/img/spinner.gif'} alt="Spinner" />
    </div>
    )
}