import { Figure, FigureNames } from "./Figure";
import { Colors } from "../Colors";
import { Cell } from "../Cell";
import blackLogo from '../../assets/black-king.png'
import whiteLogo from '../../assets/white-king.png'

export class King extends Figure {

    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.KING;
     
    }
    canMove(target: Cell,isUnderCheck: boolean): boolean {
        if (!super.canMove(target)) 
           return false ;
    const dx = Math.abs(this.cell.x - target.x);
    const dy = Math.abs(this.cell.y - target.y);

    if ((dx === 1 || dy === 1) && (dx <= 1 && dy <= 1)) {
        if (!isUnderCheck) {
            return true;
        }
    }

    const isCorner = (target.x === 0 || target.x === 7) && (target.y === 0 || target.y === 7);
    const isEdge = (target.x === 0 || target.x === 7) || (target.y === 0 || target.y === 7);

    if (isCorner) {
        return dx <= 1 && dy <= 1;
    } else if (isEdge) {
        return dx <= 1 && dy <= 1 && (dx + dy) <= 2;
    } else {
        return dx <= 1 && dy <= 1 && (dx + dy) <= 3;
    }
}

    
        }
    
    