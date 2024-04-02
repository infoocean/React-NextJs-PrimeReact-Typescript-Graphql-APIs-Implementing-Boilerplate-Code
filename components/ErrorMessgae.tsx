function ErrorFormMsg( message: string | undefined ) {
    return (
        <div className="bg-transparent text-red-500 mb-1 rounded relative" role="alert">
            <strong style={{fontSize:"12px"}}>{message}</strong>
        </div>
    )
}
export { ErrorFormMsg }