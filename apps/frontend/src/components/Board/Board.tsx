import Column from '../Column/Column'

function Board() {
    return (
        <div className="flex flex-row">
            <div className="basis-64">
                <Column order={1}></Column>
            </div>
            <div className="basis-64">
                <Column order={2}></Column>
            </div>
            <div className="basis-128">
                <Column order={3}></Column>
            </div>
        </div>
    )
}

export default Board;