import type { ColumnProps } from "../Board/Board.types";

function Column( {order}: ColumnProps) {
    return (
        <div>Column {order}</div>
    )
}

export default Column;
